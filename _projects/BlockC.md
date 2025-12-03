---
layout: project
title: "Raytracing on the CPU"
description: "A CPU-based voxel raytracer implemented in C++, featuring realistic lighting effects such as shadows, reflections, refractions, and light absorption using Beer's Law."
image: /assets/assets-2024-03-02/render.png
main_category: University Projects
date: 2024-04-02

# Metadata tags
# features: "Voxel Raytracing"
engine: "C++"
team_size: "Solo"
platform: "PC"
duration: "8 weeks"
priority_graphics: 5
priority_engine: 999
---

## 🎓 About the Project

This project was part of my university curriculum, where the goal was to implement a raytracing engine in 8 weeks using the provided [template](https://github.com/jbikker/voxpopuli), focusing on voxel-based rendering. I designed and developed the core raytracing algorithm, which runs entirely on the CPU, allowing it to simulate lighting effects like shadows, reflections, and refractions.

The project served as my introduction into graphics programming.

## 🎮 Play on itch.io

<iframe frameborder="0" src="https://itch.io/embed/2621651" width="552" height="167"><a href="https://tycro-dev.itch.io/raytracing-block-c">Block C Raytracing | The Wall Crawler by Tycro Games</a></iframe>

## 📂 Source Code & Template

The game is based on a template I received during the block, which you can find [here on GitHub](https://github.com/Tycro-Games/Raytracer-VoxPopuli).

## 📚 Project Articles (with code!)

Throughout the project, I documented my learning and development process in a series of articles. These posts dive into the various aspects of building a CPU-based raytracer and cover aspects of this project:

1. **[Learning-Raytracing-in-8-weeks | Area Lights | Part 1](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-1/)**  
An introduction to the project, focusing on area lights and realistic shadow casting.

2. **[Learning-Raytracing-in-8-weeks | Glass made out of voxels | Part 2](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-2/)**  
Techniques for simulating glass effects in a voxel-based raytracer.

3. **[Learning-Raytracing-in-8-weeks | Transforming voxel volumes | Part 3](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-3/)**  
A discussion on implementing transformations within voxel volumes.

4. **[Learning-Raytracing-in-8-weeks | Simple Smoke with Beer's Law | Part 4](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-4/)**  
An exploration of Beer's Law to simulate light absorption for semi-transparent objects like smoke.

## 🛠️ Technologies Used

- **C++**: Developed core game logic and the raytracing algorithm.
- **GLFW**: Managed graphics rendering, window handling, and input events to streamline the interface.
- **ImGui**: Used to create an user interface for real-time control over raytracing parameters like light intensity and reflection settings.

## ⚙️ My Contributions

### Voxel-Based Raytracing

Built a raytracer that renders voxel structures, allowing for dynamic scenes constructed from 3D grids.

![Voxel volume transformation demonstration](/assets/assets-2024-03-24/Rotations.gif)
*Real-time voxel volume rotation and transformation*

### Beer's Law for Light Absorption

Implemented Beer's Law to simulate light absorption in semi-transparent objects like smoke or glass.

![Light absorption simulation using Beer's Law](/assets/assets-2024-04-08/finCloud.png)
*Smoke cloud rendered with volumetric light absorption*

### Area Lighting for Soft Shadows

Created area lights that cast realistic shadows based on the light source's size and distance.

![Soft shadow rendering with area lights](/assets/assets-2024-02-24/RaytracerSoftShadows.png)
*Soft shadows created by area light sources*

### Optimization Techniques

Optimized the raytracing algorithm with:

- **Multithreading**: Using multithreading to distribute ray calculations across multiple CPU cores.
- **SIMD (Single Instruction, Multiple Data)**: Applied SIMD instructions to process multiple rays simultaneously.

