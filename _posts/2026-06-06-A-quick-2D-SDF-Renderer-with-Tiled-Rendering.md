---
title: A Quick 2D SDF Renderer with Tiled Rendering | Alloy module in Hammered
date: 2026-06-06 14:10:00 +0200
categories: [Engine 🔧, Graphics 🎨]
math: true
mermaid: true
image: /assets/media/alloy/cover.gif
pin: true
---

I was just finishing up my third year of University and I was on the lookout for a light project. I wanted to learn something interesting that entailed some graphics programming with SDL GPU. Inspired by this very interesting [^talk] about using SDF functions applied to UI rendering for the Decima editor, I decided that a quick excursion into the realm of rendering using math functions was appropriate to finish the year on a different note. I also indulged in an optimization most often used in lighting: tiled rendering.[^tiled]

I am assuming the reader knows C++ and OpenGL, but has limited understanding of modern graphics APIs like Vulkan, DX12 etc. SDL GPU is a thin abstraction over modern graphics APIs that I am going to use in this article. The code I use will not compile and it is kept short for ease of understanding.

## Source Code
TODO link to hammered examples here:

## Rendering an SDF

Prompt tip to follow gpu examples here to initialize the SDL GPU renderer device.

SDFs or Signed DIstance Functions are the basis for ray marching and Inigo Quilez blog has all the information you need to properly understand the topic.[^sdf] Concisely, there is a function that gets called for each pixel on the screen and it returns a distance from the edge. According to a convention, positive numbers will be outside the shape, negative inside. If the distance is 0, then we are exactly on the edge of the shape. As an example, below is a rectangle drawn like that. Red means it is outside, light blue inside and right on the edge is a darker blue.

<video controls src="/assets/media/alloy/sdf_rect_v2.mp4" title="Title"></video>

The first step is to prepare our vertex data. This is a 2D rendering project, so while this may come as a surprise I am going to render a triangle that covers the whole screen. SDL GPU has a pretty verbose pattern, nothing that compares with rendering a triangle in Vulkan. To upload the big triangle we need a `SDL_GPUBuffer`. This is used to define the size and usage, in our case a triangle has 3 vertexes and it is used in a vertex shader. A transfer buffer is what you put your CPU data in, while it is in a mapped state. Afterwards, you unmap it, which means you cannot modify it anymore from the CPU and it is ready to be sent to the GPU. To upload things a copy pass is needed, then one can finally combine all of this together and submit it.

```cpp
//pointers from SDL need to be saved somewhere:
SDL_GPUGraphicsPipeline* pipeline;
SDL_GPUBuffer* vertex_buffer;
//humble 3D point for the triangle
struct Vertex {
    float x, y, z;
};

// There is quite some code before you can make a pipeline

  pipeline = SDL_CreateGPUGraphicsPipeline(gpu_device->gpu_device, &pipeline_create_info);


// Release shaders

// Create the vertex buffer
SDL_GPUBufferCreateInfo buffer_create_info{.usage = SDL_GPU_BUFFERUSAGE_VERTEX,
                                            .size = sizeof(Vertex) * 3};
vertex_buffer = SDL_CreateGPUBuffer(gpu_device->gpu_device, &buffer_create_info);

// To get data into the vertex buffer, we have to use a transfer buffer. This is the real between CPU and GPU.
SDL_GPUTransferBufferCreateInfo buffer_info{.usage = SDL_GPU_TRANSFERBUFFERUSAGE_UPLOAD,
                                            .size = sizeof(Vertex) * 3};
auto* transfer_buffer = SDL_CreateGPUTransferBuffer(gpu_device->gpu_device, &buffer_info);

Vertex* transfer_data = static_cast<Vertex*>(
    SDL_MapGPUTransferBuffer(gpu_device->gpu_device, transfer_buffer, false));

// our triangle will cover the whole screen like this
transfer_data[0] = Vertex{-1, 1, 0}; //upper left
transfer_data[1] = Vertex{-1, -3, 0}; //outside screen left
transfer_data[2] = Vertex{3, 1, 0}; //outside screen right

SDL_UnmapGPUTransferBuffer(gpu_device->gpu_device, transfer_buffer);

// Upload the transfer data to the vertex buffer
SDL_GPUCommandBuffer* upload_cmd_buf = SDL_AcquireGPUCommandBuffer(gpu_device->gpu_device);

// A copy pass is what we need in case we have to upload data from CPU to GPU.
SDL_GPUCopyPass* copyPass = SDL_BeginGPUCopyPass(upload_cmd_buf);

SDL_GPUTransferBufferLocation buffer_location{.transfer_buffer = transfer_buffer,
                                              .offset = 0};
//matches the GPU Buffer made earlier
SDL_GPUBufferRegion buffer_region{
    .buffer = vertex_buffer, .offset = 0, .size = sizeof(Vertex) * 3};
SDL_UploadToGPUBuffer(copyPass, &buffer_location, &buffer_region, false);

// end copy pass, submit and release transfer buffer
```

## Basic Shaders

All will be written in `hlsl`, keep in mind that SDL has a library for translating between shading languages, so you pick whatever your heart demands.[^shader_cross]

The terribly complicated vertex shader and the more interesting fragment shader:

```hlsl
//vertex
struct Input
{
    float3 Position : TEXCOORD0;
};

struct Output
{
    float4 Position : SV_Position;
};

Output main(Input input)
{
    Output output;
    output.Position = float4(input.Position, 1.0f);
    return output;
}

//fragment
//uniform buffer for the moving effect

float sdBox( float2 p, float2 b)
{
    float2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
float sdCircle( float2 p, float b )
{
    return length(p)-b;
   
}
float4 main(float4 screenSpace : SV_Position ) : SV_Target
{
    //TODO Make this more readbale and consistent with coding naming conventions and formatting
    float2 rect_pos = float2(.2,.5);
    float d= sdBox(uv,rect)-0.2;
    d = min(d,sdCircle(uv - circlePos2,.5));

    //choose a color if it is negative, positive or too close to 0
    float3 col = //...

    return float4(col, 1);

}

```

I went ahead and used the minimum between two different shapes in the fragment shader. This creates a very interesting effect that you get when you use SDF for rendering. You can composite shapes together in this way or substract them. There are a lot more fancier functions for this that you can find here.[^sdf_min]

Here is one experiment I have done with `min` and `max` distances.

<video controls src="/assets/media/alloy/sdf_shapes.mp4" title="Title"></video>

## A Command Buffer for all UI Shapes

The easiest method that can be applied is to create a buffer for each shape needed. The way this will be uploaded to the GPU is identical to the vertex shader, except for the different flags. I chose to support a limited, but iconic repertoire of shapes:

```cpp
struct alignas(16) UICommand {
    UICommand(Circle circle, uColor32 color);
    UICommand(Rect rect, uColor32 color);
    UICommand(Line line, uColor32 color);
    // shape specific
    union {
        Rect rect;
        Line line;
        Circle circle;
    };

    // 16 bytes as floats
    // In order from the first variables can be interpreted:
    // First 3 are position and radius of circle
    // All make up a rect
    // First 2 make point A and last 2 point B for the line.
    // common to all shapes

    // 4 bytes
    uColor32 color{colors::u8::WHITE};
    // 4 bytes
    f32 shadow_strength = 0.50f;
    ShapeType type = ShapeType::Circle;
    // 4 bytes
    // another 4 bytes that can be used for various effects
};
```

SDL_GPU requires that all float3 be aligned as 16 bytes if the buffered used has the `STORAGE` flag in case you were wondering why the bytes are so carefully counted. The union is the old school way of representing the shape themselves. There are exactly 4 floating point numbers to represent a rectangle. A union will make it so you can still reference each one properly: `ui_command.circle`. An enum is used to know which is which and acts as a guardrail. If the ui command is circle and the union is treated as a rectangle there will be garbage data outside of the values of the circle.

I used a vector of `UICommand` to create a dynamic scene. 

```cpp

// Manipulate shapes this frame, add remove, whatever manipulation to the `ui_command` buffer
auto* ptr = static_cast<UICommand*>(SDL_MapGPUTransferBuffer(
  gpu_device->gpu_device, ui_render.transfer_buffer, true));

//have a count for how many elements there are to draw

//copy the new data for the ui commands into the transfer buffer
SDL_memcpy(ptr, commands.data(), count * sizeof(UICommand));

SDL_UnmapGPUTransferBuffer(gpu_device->gpu_device, ui_render.transfer_buffer);

// Upload data
SDL_GPUCopyPass* copyPass = SDL_BeginGPUCopyPass(cmdbuf);
const SDL_GPUTransferBufferLocation src{
  .transfer_buffer = ui_render.transfer_buffer,
  .offset = 0,
};

const SDL_GPUBufferRegion dst{
  .buffer = ui_render.storage_buffer,
  .offset = 0,
  .size = count * sizeof(UICommand),
};

SDL_UploadToGPUBuffer(copyPass, &src, &dst, true);
SDL_EndGPUCopyPass(copyPass);

```

Then the fragment shader becomes:

```hlsl

//use a uniform buffer to store a few variables, I use it for the count of the shapes here


// The data layout matches the one from CPU
struct UICommand
{
    float4 data; // packed shape data
    uint color; // packed rgba8
    float shadow_strength; 
    uint type;
    uint temp;
};

StructuredBuffer<UICommand> commands : register(t0, space2);

//inside main
for (uint i = 0u; i < count; ++i)
    {
        UICommand cmd = commands[i];

        float d = 1e9;
        if (cmd.type == 0u)
        { // Circle
            float2 center = cmd.data.xy;
            float radius = cmd.data.z;
            d = sdCircle(pixel - center, radius);
        }
        else if (cmd.type == 1u)
        { // Line
            float2 a = cmd.data.xy;
            float2 b = cmd.data.zw;
            d = sdLine(pixel, a, b, 2.0);
        }
        else if (cmd.type == 2u)
        { // Rect
            float2 rect_pos = cmd.data.xy;
            float2 rect_size = cmd.data.zw;
            float2 center = rect_pos + 0.5 * rect_size;
            float2 half_size = 0.5 * rect_size;
            d = sdBox(pixel - center, half_size);
        }
    
        // Unpack the RGBA8 color.
        uint c = cmd.color;
        float4 col = float4(
            ((c >> 0) & 0xFF) / 255.0,
            ((c >> 8) & 0xFF) / 255.0,
            ((c >> 16) & 0xFF) / 255.0,
            ((c >> 24) & 0xFF) / 255.0
        );
        
        

        color = lerp(color, col, clamp(1.0 - d, 0.0, 1.0)*col.a);
        

}

```

Now, each shape is called for each pixel with the right data. It is important to note that the alpha of each shape is stored in the GPU registers. This is a win over transparency in another UI approaches. For instance, one could draw UI elements with quads, but transparency with require a framebuffer.

<video controls src="../assets/media/alloy/sdf_shapes_buff.mp4" title="Title"></video>

## Tiled Rendering

I


## References

Thanks for reading my article. If you have any feedback or questions, please feel free to email me.


[^sdl]: SDL3 GPU documentation: <https://wiki.libsdl.org/SDL3/CategoryGPU>

[^gpu_examples]: SDL GPU examples repo: <https://github.com/TheSpydog/SDL_gpu_examples>

[^talk]: Guerrilla talk on SDF-based UI rendering for the Decima editor: <https://www.youtube.com/watch?v=U_MnhTuT_l8>

[^sdf]: Inigo Quilez's 2D distance functions: <https://iquilezles.org/articles/distfunctions2d/>

[^shader_cross]: SDL shadercross: <https://github.com/libsdl-org/SDL_shadercross>

[^tiled]: Tiled Rendering article: <https://www.aortiz.me/2018/12/21/CG.html#tiled-shading--forward>

[^sdf_min]: Mixing SDFs together: <https://iquilezles.org/articles/smin/>