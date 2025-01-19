---
title: Creating a basic Grand Strategy Renderer inspired by Europa Universalis 4
date: 2025-01-08 14:10:00 +0200
categories: [Learning 📚, Log 📖, Raytracing 🌐]
tags: [blog 📝, programming 💻, c++, 🔀procedural Generation , 🎓university, 🎨graphics , 🔺OpenGL, 🌍grand strategy]
math: true
img_path: /assets/assets-2025-01-08/
---


### Introduction
*Explain what the audience can expect out of this article. Explain what you are going to explain.*

## This is where I need to establish the relevance of grand strategy games!

Grand Strategy games (GTG) are a niche genre that appeal only to a smaller portion of the strategy audience. Their complex simulations of the world make it a hard genre to get into as well as a difficult one to develop for. The complex systems that guide diplomacy, economy and even history are being utilized for more than just entertainment. The area of research around these games revolves around "Serious Games" for history, economy and medieval diplomacy. Here are a few research papers discussing those topics:
- [Grand Strategy Games As A Pedagogical Tool For Introductory Economics: A Student's Perspective](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4986923#paper-references-widget)
- [Simulating medieval connections Grand strategy games and social network analysis](https://jhnr.net/articles/81/files/660bbe5c7c0b0.pdf)
- [Grand Strategy Games and Economies](https://www.diva-portal.org/smash/get/diva2:1686298/FULLTEXT01.pdf)
- [Digitising Diplomacy: Grand Strategy Video Games as an Introductory Tool for Learning Diplomacy and International Relations](https://www.academia.edu/75509526/Digitising_Diplomacy_Grand_Strategy_Video_Games_as_an_Introductory_Tool_for_Learning_Diplomacy_and_International_Relations)


## Current state of tools for grand strategy

Most resources on the internet are providing information on how to create GTG games in an already established engine such as Unity, Godot or Unreal Engine. In this article, my aim is to make the rendering aspect of this genre easier to approach, thereby contributing towards the development of engines and tools that make the creation of GTGs more accessible for game developers.

## This is what I will present in my article

In this article I will explain how one can tackle the **rendering** challenges involved when creating a typical Grand strategy game from Paradox Interactive such as Europa Universalis 4 (EU4).


By the end of the article you are going to have a procedural landmass, water and two map modes that you can switch between.

### Showcase what we are going to do
// video
I am going to use C++ and OpenGL for showcasing the concepts, using other languages and graphics API should be possible for all that we will discuss. It is expected that the reader knows some OpenGL.


### Body

*This can be thought of as the story of the project. What are did you set out to create? What did you actually get done? What features does it have?*

#### Outline
1. Generating procedural mesh
2. Texturing terrain
3. Simple water rendering
4. Province borders
5. Adding another map mode


## Introducing a heightmap

![heightmap_texture_of_the_world]({{ page.img_path }}heightmap.bmp)

This texture can be used to extract the height data from a single channel in order to create a 3D mesh. We can create this mesh by populating the OpenGL buffers:
```cpp

mesh->SetAttribute(Mesh::Attribute::Position, meshVertices);
mesh->SetIndices(meshIndices);
mesh->SetAttribute(Mesh::Attribute::Texture, meshUVs);
//vertex normals
mesh->SetAttribute(Mesh::Attribute::Normal, meshNormals);

```
A procedural mesh for terrain can be thought of as a plane, which needs to have at least the same number of vertices as the resolution of the heightmap. We will then read the data of the heightmap texture and add it to the y axis. There are numerous tutorials that will provide code and explanations on how to achieve this.
- [OGLDEV](https://youtu.be/xoqESu9iOUE?si=HWXc-EfHuPOQWhgq)
- [LearnOpenGL](https://learnopengl.com/Guest-Articles/2021/Tessellation/Height-map)


![wireframe]({{ page.img_path }}3D_wireframe.png)

## Possible mesh optimizations

In EU4 the heightmap is `5632x2048`, that is 11,536,896 in vertices and 23,047,808 triangles. This is too much geometry to render and most of it will not even be visible. If you do not mind creating a low resolution mesh and downscaling or resizing the image to something smaller, you can skip this optimization step.

### GeoMipMapping | CPU optimization
#### Description
This approach lowers the data sent to the GPU by dividing the mesh into patches. These patches are then simplified by generating lower resolution versions and changing each patch
LOD based on the camera distance.

#### Downsides

- All the LODs need to be precomputed at the beginning of the application which can take some time depending on the resolution.
- The terrain needs to be a certain resolution in order to be evenly divided into patches, so our `5632x2048` becomes an odd resolution like `5633x2049`. You might need to experiment with this.

#### Summary

1. Divide terrain into a fixed size for patches
2. Generate LOD versions of these patches
3. Create a separate LOD for the sides of a patch to prevent cracks
4. Map each LOD to a patch based on the camera distance at runtime

Implementation [OGLDEV](https://youtu.be/08dApu_vS4c?si=g1to5Or1cZcz84BN)
https://www.flipcode.com/archives/article_geomipmaps.pdf

### Tesselation Shaders | GPU optimizations

Tessellation shaders are used to subdivide geometry by adding two passes between vertex and fragment shaders, control and evaluation tesselation shaders.

#### Downsides

- In practice it is harder to implement than something like GeoMipMapping

#### Summary

1. Precompute vertex position (without the y component) and UVs on the CPU
2. In the tessellation control shader the subdivision levels will be set for each patch, based on the camera distance
3. In the tessellation evaluation shader height is sampled from the provided map, uvs and vertex positions are interpolated.
4. The normals can be calculated in the fragment shader based on the heightmap values

I would recommend first using the CPU optimization and then, going for tesselation shaders. In my experience, adding CPU based optimization already improved performance by 4 times compared to the naive way of generating the procedural mesh.

## Texturing

The easiest way I found to texture the whole terrain is based on the height. That means we need to provide some extra information for each vertex to the fragment shader. We define a number of layers; sand, grass, mountain and snow. A layer will have the following properties:
```cpp
//each vertex should pass its height to the fragment shader
in float height;
// used for selecting the correct layer properties
uniform vec2 min_max_height;

//layer properties
uniform vec3 base_colors[MAX_LAYERS]; 
//interpolate between color and texture, [0, 1]
uniform float base_color_stength[MAX_LAYERS]; 
//define where this layer starts and where the previous one ends, [0, 1]
uniform float base_heights[MAX_LAYERS]; 
//linear blend between this and the previous layer, [0, 1]
uniform float base_blends[MAX_LAYERS]; 
//will scale the uv coordinates of the texture
uniform float base_scale[MAX_LAYERS]; 
```

We can get the minimum and maximum when we are creating the buffers on the CPU, like so:

```cpp
  m_minMaxHeight = glm::vec2{FLT_MAX, -1.0f};
  for (uint32_t z = 0; z < height; ++z)
  {
      for (uint32_t x = 0; x < width; ++x)
      {
          auto h = heightValues[index];
          glm::f32 heightMinMax = static_cast<float>(h) / 255.0f;

          {
              // min height
              m_minMaxHeight.x = std::min(m_minMaxHeight.x, heightMinMax);

              m_minMaxHeight.y = std::max(m_minMaxHeight.y, heightMinMax);
          }

          //set vertex position
          //set uv
      }
  }
    
```
To map each layer, we need to get a percentage for the vertex height using the inverse lerp function. This percentage will define the draw strength using the blend, you can see how this looks below:

![noBlend]({{ page.img_path }}noBlend.png)
_No Blending_
![Blend]({{ page.img_path }}blend.png)
_With Blending_

Shader code for getting the draw strength:

```cpp

float inverse_lerp(float a, float b, float value){
   return clamp((value-a)/(b-a),0.0,1.0);
}

void texture_terrain(out vec4 color, out vec3 normal)

  //[0, 1]
  float hPercent = inverse_lerp(min_max_height.x, min_max_height.y, height);

    for (int i = 0; i < MAX_LAYERS; i++){
        //get how much of this layer we should draw [0, 1]
        //EPISILON = a very small float to prevent divison by 0
        float drawStrength = inverse_lerp(-base_blends[i]/2 - EPSILON, base_blends[i]/2, hPercent - base_heights[i]);
        //early return
        if (drawStrength < EPSILON)
        {
            continue;
        }
        //color and texture albedo

        //normals

        //using draw strength for final color and normal
         
        }
```

Computing the color is easy
```cpp
   //get our color
  vec3 baseCol = base_colors[i] * base_color_stength[i];

  //sample texture albedo
  
  //sample texture normal

  
  
  //final color
  color = color * (1.0 - drawStrength) + vec4((baseCol + textureColor.rgb) * drawStrength, 1.0);

  //final normal
  normal = normalize(mix(normal, textureNormal, drawStrength));

```
#### How Grand Strategy games look & article outline?

Show some relevant eu4 snippets with:
- Terrain mesh and texturing with bombing triplanar, extra work for Height based blending and splatting
- Optimization techniques for the mesh:
  - Tesselation shaders
  - Geo mipmapping
  - Frustum Culling
- simple and easy water to add
- using a color map for texturing
- map modes
  - how one might implement this using multiple shaders instead of only one
  -
  - Gradient with compute shaders for the borders


### Conclusion
*Summarize what the article has been about, future ideas for the project. Problems that you encountered that were not discussed in the body.*

Basic starting point for rendering that could serve a Grand Strategy engine.

Future ideas:

- Pipeline for generating procedural grand strategy worlds
- Rivers and lakes
- Foliage and cities
- Infrastructure for creating cities based on provinces
- Spline based borders as well as text

