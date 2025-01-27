---
layout: project
title: "Raytracing on the CPU"
description: "CPU based Raytracer for voxels in C++"
image: /assets/assets-2024-03-02/render.png
categories: [C++, 🌟Raytracing  ,🎓University, 🎨Graphics , 🔳Voxels ]
main_category: University Projects
date: 2024-04-02
---

## 🎓 About the Block

This project was part of my university curriculum, where the goal was to implement a raytracing engine in 8 weeks using the provided [template](https://github.com/jbikker/voxpopuli), focusing on voxel-based rendering. I designed and developed the core raytracing algorithm, which runs entirely on the CPU, allowing it to simulate lighting effects like shadows, reflections, and refractions.

The project served as my introduction into graphics programming.

## 📂 Source Code & Template

The game is based on a template I received during the block, which you can find [here on GitHub](https://github.com/Tycro-Games/Raytracer-VoxPopuli).

## 🛠️ Technologies Used

- **C++**: Developed core game logic and the raytracing algorithm.
- **GLFW**: Managed graphics rendering, window handling, and input events to streamline the interface.
- **ImGui**: Used to create an user interface for real-time control over raytracing parameters like light intensity and reflection settings.

## ⚙️ Key Highlights

---

### **Voxel-Based Raytracing**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Built a raytracer that renders voxel structures, allowing for dynamic scenes constructed from 3D grids.
  </div>
  <img src="/assets/assets-2024-03-24/Rotations.gif" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Voxel Volume Transform" />
</div>

---

### **Beer’s Law for Light Absorption**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Implemented Beer’s Law to simulate light absorption in semi-transparent objects like smoke or glass.
  </div>
  <img src="/assets/assets-2024-04-08/finCloud.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Smoke cloud" />
</div>

---

### **Area Lighting for Soft Shadows**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Created area lights that cast realistic shadows based on the light source’s size and distance.
  </div>
  <img src="/assets/assets-2024-02-24/RaytracerSoftShadows.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Soft Shadows" />
</div>

---

- **Optimization Techniques**: Optimized the raytracing algorithm with:
  - **Multithreading**: Using multithreading to distribute ray calculations across multiple CPU cores.
  - **SIMD (Single Instruction, Multiple Data)**: Applied SIMD instructions to process multiple rays simultaneously, increasing speed.

## 📚 Project Articles

Throughout the project, I documented my learning and development process in a series of articles. These posts dive deeper into the various aspects of building a CPU-based raytracer and cover aspects of this project in detail:

1. **[Learning-Raytracing-in-8-weeks | Area Lights | Part 1](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-1/)**
-n introduction to the project, focusing on area lights and realistic shadow casting.
2. **[Learning-Raytracing-in-8-weeks | Glass made out of voxels | Part 2](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-2/)**
Techniques for simulating glass effects in a voxel-based raytracer.
3. **[Learning-Raytracing-in-8-weeks | Transforming voxel volumes | Part 3](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-3/)**
A discussion on implementing transformations within voxel volumes.
4. **[Learning-Raytracing-in-8-weeks | Simple Smoke with Beer’s Law | Part 4](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-4/)**
An exploration of Beer’s Law to simulate light absorption for semi-transparent objects like smoke.

<!-- ## 🎥 Watch the Showcase

<iframe width="100%" height="400" src="https://www.youtube.com/embed/LdihD8" title="An Unrealistic Spaceship Simulator Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

## 🎮 Play on itch.io

<iframe frameborder="0" src="https://itch.io/embed/2621651" width="552" height="167"><a href="https://tycro-dev.itch.io/raytracing-block-c">Block C Raytracing | The Wall Crawler by Tycro Games</a></iframe>

![alt text](../assets/portfolio/logo.png)