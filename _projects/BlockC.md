---
layout: project
title: "University Project | Raytracing on the CPU"
description: "CPU based Raytracer on Voxels in C++"
image: /assets/portfolio/wall-preview.png
categories: [💻C++, Raytracing 🌟 ,🎓University, Graphics 🎨, Voxels 🔳]
main_category: University Projects
date: 2024-04-02
---
## 🛠️ Technologies Used:
- **C++**: Developed core game logic and the raytracing algorithm.
- **GLFW**: Managed graphics rendering, window handling, and input events to streamline the interface.

## 🎓 About the Block

This project was part of my university curriculum, where the goal was to implement a raytracing engine in 8 weeks using the provided [template](https://github.com/jbikker/voxpopuli), focusing on voxel-based rendering. I designed and developed the core raytracing algorithm, which runs entirely on the CPU, allowing it to simulate realistic lighting effects like shadows, reflections, and refractions. 

The project served as my introduction into graphics programming.

## ⚙️ Key Highlights:

- **Voxel-Based Raytracing**: Built a raytracer that renders voxel structures, allowing for dynamic scenes constructed from 3D grids of cubic elements. This technique provides a unique aesthetic, mimicking "voxel art" while requiring efficient spatial calculations.

- **Beer’s Law for Light Absorption**: Implemented Beer’s Law to simulate light absorption in semi-transparent objects like smoke or glass.

- **Area Lighting for Realistic Shadows**: Created area lights that cast realistic, soft-edged shadows based on the light source’s size and distance.

- **Optimization Techniques**: Optimized the raytracing algorithm with:
  - **Multithreading**: Leveraged multithreading to distribute ray calculations across multiple CPU cores, significantly improving render times by parallelizing workloads.
  - **SIMD (Single Instruction, Multiple Data)**: Applied SIMD instructions to process multiple rays simultaneously, increasing efficiency by handling data in parallel within each core.

## 📚 Project Articles

Throughout the project, I documented my learning and development process in a series of articles. These posts dive deeper into the various aspects of building a CPU-based raytracer and cover aspects of this project in detail:

1. **[Learning-Raytracing-in-8-weeks | Area Lights | Part 1](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-1/)** – An introduction to the project, focusing on area lights and realistic shadow casting.
2. **[Learning-Raytracing-in-8-weeks | Glass made out of voxels | Part 2](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-2/)** – Techniques for simulating glass effects in a voxel-based raytracer.
3. **[Learning-Raytracing-in-8-weeks | Transforming voxel volumes | Part 3](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-3/)** – A discussion on implementing transformations within voxel volumes.
4. **[Learning-Raytracing-in-8-weeks | Simple Smoke with Beer’s Law | Part 4](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-4/)** – An exploration of Beer’s Law to simulate light absorption for semi-transparent objects like smoke.

Each article offers insights into specific raytracing challenges and solutions, providing readers with a detailed look at both the technical aspects and learning outcomes of the project.

## 🎥 Watch the Showcase

<iframe width="100%" height="400" src="https://www.youtube.com/embed/Ldiha_dJDD8" title="An Unrealistic Spaceship Simulator Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 🎮 Play on itch.io

<iframe frameborder="0" src="https://itch.io/embed/2621651" width="552" height="167"><a href="https://tycro-dev.itch.io/raytracing-block-c">Block C Raytracing | The Wall Crawler by Tycro Games</a></iframe>

## 📂 Source Code & Template

The game is based on a template I received during the block, which you can find [here on GitHub](https://github.com/Tycro-Games/Raytracer-VoxPopuli).
