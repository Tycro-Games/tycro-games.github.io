---
layout: project
toc: true
title: Plugin for Godot | Grand Strategy Map Editor
description: A Godot 4.5 GDExtension that provides editor tools for interacting with Europa Universalis provinces and country data as well as a shader pipeline that renders a map with smooth borders.
image: assets/media/gs_map/demo_final.gif

main_category: Personal Projects
date: 2025-11-07

engine: "C++"
team_size: "Solo"  
platform: "PC"  
duration: "Sep. - Nov. 2025"
priority_graphics: 1
priority_engine: 2
priority_highlights: 1
---

## 📂 Source Code

Can be found on GitHub [here](https://github.com/OneBogdan01/gs-map-editor).

---

## Overview

Grand strategy games like Europa Universalis IV use intricate political maps with thousands of irregular provinces and smooth borders that change as countries expand. I built a Godot C++ plugin to explore these systems and provide a starting point for game development/modding, focusing on creating smooth borders.

My primary goal was learning how to extend Godot with C++ (coming from simpler custom engines), while explore rendering techniques, editor tool integration, and Godot's extension architecture

**Key Achievement:** Implemented smooth border rendering using a texture indirection pipeline with HQX upscaling, adapted from Intel's Imperator: Rome rendering paper.

### 📚 [Article I wrote focusing on the rendering aspect (with code!)](https://tycro-games.github.io/posts/Grand-Strategy-Editor-using-Gdextension-in-Godot-with-C++/)

---

## Project Goals

Create a Godot plugin that could:

- Parse Europa Universalis IV's files to create a country and province database
- Render political maps with aesthetic borders that change in real-time
- Provide editor tools for modifying province ownership and country color
- Export back to EU4's file format

---
### Rendering

I believe that the **[article](https://tycro-games.github.io/posts/Grand-Strategy-Editor-using-Gdextension-in-Godot-with-C++/)** explains in a logical way how I arrived at the answer which I considered good enough visually. If you have any doubts please consult the paper, or the article. 

This is the core logic behind rendering fragment shader that renders political countries with no borders:
```glsl
shader_type canvas_item;

// texture with province IDs
uniform sampler2D lookup_map : filter_nearest;
// small texture with each provinces color, resolution is small (i.e. 256x256)
uniform sampler2D color_map : source_color, filter_nearest;

vec4 get_color(const in vec2 uv) {
    // UV in range [0-1]
    vec4 lookup = texture(lookup_map, uv);
    vec2 province_uv = lookup.rg;
    //get color from color map
    return texture(color_map, province_uv);
}

void fragment() {
    vec2 uv = UV;
    vec4 color = get_color(uv);
    
    COLOR = color;
}
```

This can also be visualized as:

![Diagram showing the complete rendering pipeline from province map to final rendered output](/assets/assets-2025-10-27/diagram.jpg)
*Complete overview of the rendering pipeline from province map to final output*

The output using EU4's files:

![Political map showing European countries colored by ownership without border rendering](/assets/assets-2025-10-27/Screenshot 2025-09-24 133323.png)
*Basic political map outputting province colors without borders*

### Borders

Rendering borders is very much like learning grand strategy games for the first time. There is no easy solution that provides a particularly great answer. So I would like to go over the ones that I considered to do, although I have not pursued me to finality.


#### Simple AA and edge detection

The first implementation is to try making smooth borders by using edge detection and adding some AA, it looks somehow promising, but not perfect either:

![alt text](../assets/media/gs_map/early_edges.gif)

_Video with basic edges with AA applied_

![alt text](<../assets/media/gs_map/Screenshot 2025-09-30 102505.png>)

_Screenshot of the political map with basic edge detection_

#### Upscaling using HQX

The main problem is that the effect is constrained by the texture resolution. It seemed logical to try to use an upscaler [shader][9]. Fortunately, this shader is used by Thomas Holtvedt's [project](https://github.com/Thomas-Holtvedt/opengs). HQX is a popular shader which is also used in other grand strategy map projects.
The border can be smoothed out, at the cost of having any color values as the border itself.

**No** HQX applied:
![alt text](../assets/media/gs_map/edges.png)
_Political map with no borders_

HQX applied:

![alt text](../assets/media/gs_map/HQX.png)
_HQX shader applied to the political map_

Combining simple edge detected borders with the upscaler shader was creating too many artifacts, especially when the color was using partial alpha values:

![alt text](<../assets/media/gs_map/Screenshot 2025-10-02 104218.png>)
_Artifacts due to the alpha of the simple borders_

#### Generating meshes?

This is a technique used in EU4! In fact, there are profiling results showing that rendering the border meshes takes most of the rendering, which you can find [here](https://www.hlsl.co.uk/blog/2018/7/18/what-can-we-learn-from-gpu-frame-captures-europa-universalis-4). This makes the technique quite complicated, requiring triangulation in order to achieve arbitrary shapes based on the province map. In addition, the fact that EU4 takes 90% from its render time for the borders according to the previous article makes it less appealing to pursue.

![alt text](../assets/media/gs_map/eu4_borders.png)

_Mesh Generated borders based on the neighboring countries from EU4_

### SVG approach

I found a repo generating SVG maps based on the EU4 game data and textures as [oikoumene](https://github.com/primislas/eu4-svg-map). They only use vector based approaches to create borders between countries or provinces which is impressive in itself. It is an educated guess that EU4 uses a similar technique with multiple passes over the `province map` to create curves around the provinces and smooth them out in subsequent passes. My personal opinion is that they create a layered approach to their borders, so they might use a combination of techniques. 

This technique is ideal and their results speak for themselves.They are scalable and provide near identical results as the borders from the game in terms of shapes. The downside is the time needed to be invested in order to only generate the most basic province borders and the complexity that comes with that.

![alt text](../assets/media/gs_map/banner.png)
_Screenshot from Oikoumene samples_


#### Distance Field Texture and HQX

![alt text](../assets/media/gs_map/final.png)
_Final technique used to render borders_

The solution I settled with is a compromise with image based. The better solution would have been to use mesh generation or vector based solutions for making borders. This breaks if the map is very zoomed in, however, it looks good from most distances. The steps for this effect are the following:

- Generate Distance Field from Color + Lookup maps.
- Sample the distance field to create the gradient
- Have an edge threshold, that when reached represents the border between countries (fill with border color)
- Use the HQX upscaled on the previous output to create smooth edges
Adding province borders is trivial, as these will never change over the course of the game.

Here are a few screenshots with this effect on more exotic shapes:

![alt text](<../assets/media/gs_map/Screenshot 2025-10-07 105332.png>)

_Screenshot of the outlines for exotic shapes_
![alt text](<../assets/media/gs_map/Screenshot 2025-10-07 105438.png>)
_Screenshot of the outlines for exotic shapes_

![alt text](<../assets/media/gs_map/Screenshot 2025-10-07 105558.png>)
_Screenshot of the outlines

### Editor Functionality

In this project I also learned how to extend the editor in Godot. Below you can see how the user can change owenership of provinces, or their country color through the editor I made. The changes are saved in the file format that Europa Universalis 4 uses.

<video controls src="/assets/media/gs_map/export import.mp4" title="Title"></video>

*Demonstration of province ownership editing and export/import functionality*

<video controls src="/assets/media/gs_map/change_color.mp4" title="Title"></video>
*Changing the color of France in the editor, then running the game*


As a fun section, these are some of my attemths to implement the "basic" political rendering:
![alt text](<./assets/media/gs_map/Screenshot 2025-09-23 143842.png>) ![alt text](<./assets/media/gs_map/Screenshot 2025-09-23 144805.png>) ![alt text](<./assets/media/gs_map/Screenshot 2025-09-24 113424.png>)
## References

### Godot & Compute Shaders

- [Godot Official Compute Shaders Documentation][1]
- [Compute Shader Textures Tutorial by NekoToArts][2]
- [Shader Storage Buffer Objects (SSBOs) Guide][3]
- [Godot Viewport as Texture Documentation][4]

### Map Rendering & Border Techniques

- [Intel Paper: Optimized Gradient Border Rendering in Imperator: Rome][5]
- [Simulating the EU4 Map in the Browser with WebGL][6]
- [Valve Paper: Improved Alpha-Tested Magnification (Distance Fields)][7]
- [Inigo Quilez: Introduction to Signed Distance Fields (Video)][8]
- [HQX Upscaling Filter (Shadertoy)][9]
- [Sobel Edge Detection Filter (Shadertoy)][10]
- [Unreal Engine Forum: Paradox Grand Strategy Game Borders Discussion][11]
- [Ben Golus: The Quest for Very Wide Outlines (Jump Flood Algorithm)][12]

### Alternative Border Approaches (Vector & Mesh-Based)

- [Anatomy of a Grand Strategy Game: Mesh Generation Devlog][13]
- [GameDev Stack Exchange: Rendering Province Borders in Unity][14]

[1]: https://docs.godotengine.org/en/stable/tutorials/shaders/compute_shaders.html
[2]: https://nekotoarts.github.io/blog/Compute-Shader-Textures
[3]: https://ktstephano.github.io/rendering/opengl/ssbos
[4]: https://docs.godotengine.org/en/stable/tutorials/shaders/using_viewport_as_texture.html
[5]: https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf
[6]: https://nickb.dev/blog/simulating-the-eu4-map-in-the-browser-with-webgl/
[7]: https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf
[8]: https://www.youtube.com/watch?v=1b5hIMqz_wM
[9]: https://www.shadertoy.com/view/tsdcRM
[10]: https://www.shadertoy.com/view/4ss3Dr
[11]: https://forums.unrealengine.com/t/borders-like-paradox-grand-strategy-game/763968
[12]: https://bgolus.medium.com/the-quest-for-very-wide-outlines-ba82ed442cd9
[13]: https://medium.com/@squashfold/anatomy-of-a-grand-strategy-game-devlog-1-3962ba395ae4
[14]: https://gamedev.stackexchange.com/questions/183354/in-unity-how-can-i-render-borders-of-provinces-from-a-colored-province-map-in-a
