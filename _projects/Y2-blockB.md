---
layout: project
title: Grand Strategy Renderer
description: A custom terrain/map renderer inspired by Europa Universalis IV, featuring procedural terrain generation, height-based texturing, and province map visualization. 
image: assets/assets-2025-01-08/showcase.gif
main_category: University Projects
date: 2025-01-27

# Metadata tags
features: "Compute Shaders & Terrain Rendering"
engine: "C++ & OpenGL"
team_size: "Solo"
platform: "PC"
duration: "8 weeks"
priority_graphics: 2
priority_engine: 6
---

## 🛠️ Skills and Technologies

- **Custom Educational Engine**: Developed using the Bee engine, a proprietary tool used at Breda University of Applied Sciences for the CMGT programming track.
- **Europa Universalis IV Assets**: Utilized EU4's map assets, including the heightmap and textures, to create a terrain rendering system inspired by the game's visual style. Assets can be found [here](https://eu4.paradoxwikis.com/Map_modding).
- **Procedural Terrain Mesh**: Optimized terrain rendering with GeoMipMapping on the CPU.
- **Height based texturing**: Implemented a configurable layer system using a color map for terrain texturing.
- **Compute Shaders**: Using compute shaders in OpenGL, a Distance Field texture is generated for the political map mode.

## 📚 Project Article (with code!)

As part of the project, we also had to create an article where we share the knowledge we gained over the span of our research and development process.

**[Basic Texturing for Grand Strategy Games Using Europa Universalis IV Files](https://tycro-games.github.io/posts/Basic-Texturing-for-Grand-Strategy-Games-Using-Europa-Universalis-IV-Files/)**

## 📂 Source Code

Unfortunately, due to NDA restrictions, I am unable to share the full codebase.

## ⚙️ My Contributions

![Political map mode combined with terrain texturing](/assets/portfolio/2BlockB/week7.png)
*Political map mode combined with height-based terrain texturing*

### Procedural Terrain Optimization

To optimize terrain rendering, the mesh is divided into patches, each with multiple levels of detail (LOD). The appropriate LOD is dynamically selected based on the camera's distance.

![GeoMipMapping demonstration](/assets/portfolio/2BlockB/geo.gif)
*Dynamic level of detail (LOD) system using GeoMipMapping*

### Height-Based Texturing

Terrain textures are applied by height using diffuse and normal maps, with a color map for tinting.

![Height-based terrain texturing with color map](/assets/assets-2025-01-08/color_map.png)
*Color map used for height-based terrain texture blending*

### Water Rendering

Simple water rendering using an HDR and two scrolling normal maps.

![Water rendering with scrolling normal maps](/assets/portfolio/2BlockB/water.gif)
*Animated water surface using dual scrolling normal maps*

### Political Map Visualization

Compute shaders are utilized to generate the Political Map mode in two passes:

**First Pass**: Province borders are identified and saved to an edge detection texture.

![Edge detection texture showing province borders](/assets/assets-2025-01-08/blac_lines.png)
*Edge detection pass identifying province boundaries*

**Second Pass**: A distance field texture is generated to create a gradient effect around the province borders.

![Distance field texture for gradient effects](/assets/assets-2025-01-08/DistanceField.png)
*Distance field computation for smooth border gradients*

**Effect Visualization:**

![Gradient effect visualization](/assets/portfolio/2BlockB/gradient_no_filter.png)
*Gradient effect with nearest neighbor filter for visualization clarity*