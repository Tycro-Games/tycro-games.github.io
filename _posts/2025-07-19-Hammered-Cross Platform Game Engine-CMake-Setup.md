---
title: Hammered Engine | Cmake, OpenGL and Vulkan setup
date: 2025-07-19 14:10:00 +0200
categories: [Tutorials 📚, Engine 🔧, Series]
tags: [🎨graphics , 🔺OpenGL, 🌋 Vulkan, 🔧Engine]
math: true
img_path: /assets/assets-2025-07-19/
image: 
---

## Intro

At the end of my second year at university, I had the opportunity to work with custom game technologies. I contributed to cross-platform engines (each took 8 weeks) that ran on [Nintendo](https://tycro-games.github.io/projects/Y2-blockC/) and [PS5](https://tycro-games.github.io/projects/Y2-BlockD/). Over another 8 weeks, I built a [grand strategy renderer](https://tycro-games.github.io/projects/Y2-blockB/) inspired by one of my favorite games, *Europa Universalis IV*.

The experience was educational and practical; however, I often felt constrained by the strict deadlines. I had to compromise to finish on time, just as each project was starting to come together. This is why I decided to start my most ambitious solo project yet: **Hammered**, an engine using OpenGL and Vulkan for simulation games, where I can experiment with graphics, tools and gameplay systems at my own pace, building each addition on top of the last.

The project is available on github, specifically the branch used when this articles was made can be found [here](https://github.com/OneBogdan01/hammered-engine/tree/Cmake-opengl-vulkan-set-up).

## Demo

At this point in my development journey I am still trying to figure out a lot of unknowns. For the time being, I want to build a vulkan renderer and use OpenGL as a visual check. If it looks the same with both backend. I also had a long curiosity to experiment with performance on Vulkan and modern OpenGL. I never compared OpenGL with AZDO and Vulkan [^grc][^glAZDO][^GDC talk] which is something that I am excited to explore (and profile!).

<video controls src="/assets/assets-2025-07-19/2025-07-19 18-00-20.mp4" title="Title"></video>

*In the next updates, I will save the current state of the engine on close, automatically loading the state when switching between backends*

This is the breakdown, of what I have done so far:

- using Cmake[^make] I can generate two .exes that use OpenGL and Vulkan, "_gl" and "_vk" as name endings
- shaders are compiled in the generation step from .glsl to .spv into Vulkan and OpenGL specific binaries, as detailed in the Red Book, chapter two[^glb].
- running one of them, initializes the selected graphical backend with the following setup: a triangle is rendered, along with an imgui menu that allows changing the compute shader applied to the background
- an ImGui menu is also present to allow changing from one backend to another, closing the current instance and running the other executable


This setup was made using vulkan guide[^vkg], then adapted to OpenGL in order to have the same visual output. I would like to explain how I set-up Cmake for my project and the common "device" interface. I will not go into the graphics implementation yet, since I do not have a good grasp of how I want to build that API yet.


## Cmake

### Building the "engine"

### Building the "game"

### Shaders

> This should ideally be moved to a script that is ran every time by the engine on start-up, in order to allow hot reloading of the shaders.
{: .prompt-tip }

## Device, implementation specific at compile time

Mention how pimpl or polymorphism takes a toll on the performance at runtime.

## References

### OpenGL and Vulkan

[^glb]: [Red Book](https://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0134495497)
[^grc]: [3D Graphics Rendering Cookbook: A comprehensive guide to exploring rendering algorithms in modern OpenGL and Vulkan](https://www.amazon.com/Graphics-Rendering-Cookbook-comprehensive-algorithms/dp/1838986197)
[^glAZDO]: [Indirect Rendering OGLDEV](https://www.youtube.com/watch?v=oETErEkFICE)
[^GDC talk]: [GDC Talk](https://gdcvault.com/play/1023516/High-performance-Low-Overhead-Rendering)
[^vkg]: [Vulkan Guide chapter 3](https://vkguide.dev/docs/new_chapter_3/building_pipeline/)


[^make]: [Cmake](https://cmake.org/)

### Source

