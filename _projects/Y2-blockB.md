---
layout: project
title: Grand Strategy Renderer
description: A basic renderer inspired by Europa Universalis IV
image: assets/assets-2025-01-08/showcase.gif
categories: [C++, 🎓University, 🎨Graphics ]

main_category: University Projects
date: 2025-01-27
---



## 🛠️ Skills and Technologies

- **Custom Educational Engine**: I worked with the Bee engine, used internally at Breda University of Applied Sciences  for the CMGT track.
- **Europa Universalis IV Files**: Utilized EU4 assets, including heightmaps and textures. You can find the assets [here](https://eu4.paradoxwikis.com/Map_modding).
- **Procedural Terrain Mesh**: Optimized terrain rendering with GeoMipMapping on the CPU.
- **Height based texturing**: Implemented a configurable layer system using a color map for terrain texturing.
- **Compute Shaders**: Using compute shaders in OpenGL, a Distance Field texture is generated for the political map mode.

## ⚙️ Key Highlights

![alt text](/assets/portfolio/2BlockB/week7.png)
_Political Map mode combined with the terrain texturing_

---

### Procedural Terrain Optimization

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.2em; display: flex; align-items: center;">
  To optimize terrain rendering, the mesh is divided into patches, each with multiple levels of detail (LOD). The appropriate LOD is dynamically selected based on the camera's distance.

  </div>
  <img src="/assets/portfolio/2BlockB/geo.gif" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="GeoMipMap" />
</div>

---

### Height-Based Texturing

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.2em; display: flex; align-items: center;">
    The terrain textures are applied based on height. Using pairs of textures (diffuse + normal) and a color map.
  </div>
  <img src="/assets/assets-2025-01-08/color_map.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Height Map Texturing" />
</div>

---

### Water Rendering

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
  Simple water rendering using an HDR and two scrolling normal maps.
  </div>
  <img src="/assets/portfolio/2BlockB/water.gif" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Soft Shadows" />
</div>

---

### Political Map Visualization

<div style="display: flex; flex-direction: column; gap: 20px;">

  <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
    <div style="flex: 1; font-size: 1.2em; display: flex; align-items: center;">
      Compute shaders are utilized to generate the Political Map mode in two passes:
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
    <div style="flex: 1; font-size: 1em;">
      - <b>First Pass</b>: Province borders are identified and saved to an edge detection texture.
    </div>
    <img src="/assets/assets-2025-01-08/blac_lines.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Province Borders Texture" />
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
    <div style="flex: 1; font-size: 1em;">
      - <b>Second Pass</b>: A distance field texture is generated to create a gradient effect around the province borders.
    </div>
    <img src="/assets/assets-2025-01-08/DistanceField.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Distance Field Texture" />
  </div>

  <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
    <div style="font-size: 1.2em; font-weight: bold;">
      Gradient Effect Visualization:
    </div>
    <div>
    </div>
    <img src="/assets/portfolio/2BlockB/gradient_no_filter.png" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" alt="Gradient Effect with Nearest Filter" />
  </div>

</div>
*Filter set to nearest neighbor so the effect is easier to see*

---



## 📚 Project Article

As part of the project, we also had to create an article where we share the knowledge we gained over the span of our research and development process.

**[Basic Texturing for Grand Strategy Games Using Europa Universalis IV Files](https://tycro-games.github.io/posts/Basic-Texturing-for-Grand-Strategy-Games-Using-Europa-Universalis-IV-Files/)**

## 📂 Source Code

Unfortunately, due to NDA restrictions, I am unable to share the codebase.

![alt text](/assets/portfolio/logo.png)
