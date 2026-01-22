---
layout: project
title: PC/Nintendo Engine for Strategy Games  | FireAnt
description: A cross-platform engine demo featuring particle systems, ECS architecture, inspector hierarchies, and GLTF 3D model support.
image: assets/portfolio/Y2/C/Animation.gif
main_category: University Projects
date: 2025-04-08

# Metadata tags
# features: "Cross-Platform Engine"
engine: "C++ & OpenGL"
team_size: "7 programmers"
platform: "PC/Nintendo"
duration: "Feb. - Apr. 2025"
priority_graphics: 5
priority_engine: 3
priority_highlights: 1

---

## 🎓 About the Project

FireAnt is a cross-platform engine, with **Nintendo** and **PC**. It was made to create strategy game in a team of 7 programmers, over 8 weeks. I focused on **graphics programming** and on the **cross-platform API** for Nintendo using OpenGL.

## 🛠️ Skills Developed

- **Cross-Platform Development**: Designed the rendering layer for Nintendo and PC compatibility with a focus on abstraction and maintainability.
- **Core Engine Systems**: Worked within an ECS architecture using [`entt`](https://github.com/skypjack/entt) and [cereal](https://github.com/USCiLab/cereal) for serialization.
- **Engine Inspector UI**: Utilized [ImGui](https://github.com/ocornut/imgui) to create editor windows for managing entities, resources, and scene data.
- **Teamwork**: Contributed to code reviews, enforced coding standards via Github Actions, and led some meetings.

## ⚙️ My Contributions

### ⛰️ Terrain with Tessellation Shaders

I first tried to implement tessellation while working on the [Grand Strategy Renderer](https://tycro-games.github.io/projects/Y2-blockB/), but didn't manage to finish it due to time constraints.

In this project, I got it working, rendering the same terrain **~4× faster than geomipmapping on the CPU**, with better visual quality and lower memory usage.

<video autoplay muted loop controls style="width:100%; max-width:960px; height:auto;" src="/assets/portfolio/Y2/C/tess.mp4" title="Terrain Tessellation Demo"></video>
*GPU-based terrain tessellation with dynamic LOD*

| Technique                | Performance | Memory Usage     | Scalability | Visual Quality     |
| ------------------------ | ----------- | ---------------- | ----------- | ------------------ |
| Naive                    | ~17ms       | High             | Poor        | Good               |
| Geomipmapping            | ~4ms/frame  | Lower than naive | Good        | Good (with tuning) |
| **Tessellation Shaders** | **~1ms**    | **Low**          | **Best**    | **Best**           |

### 🎯 Frustum Culling

To optimize rendering, I implemented an **early out check** using a two-stage culling system.

With **8000 billboarded sprites**, frustum culling reduced the render time from **~30ms to 5ms**.

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/sphere culling.mp4" title="Sphere and Frustum Culling"></video>
*Color-coded culling visualization - Green: visible, Red: outside frustum, Orange: outside sphere*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/8000.mp4" title="8000 Units Culling Demo"></video>
*Performance improvement: 8000 animated sprites rendered in ~5ms (down from ~30ms)*

### 🎇 Particle System

The particle system was our main tool for adding "juice" and responsiveness to the game. It supported basic parameters with interpolation: color, velocity, acceleration and scaling.

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/scaling.mp4" title="Scaling Interpolation"></video>
*Particle scaling interpolation over lifetime*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/wobble.mp4" title="Enemy Hit Particles"></video>
*Hit particle effect triggered on enemy impact*

### 🎬 Animation System for Billboarded Sprites

Our brief required a 3D world with 2D sprites representing units. I implemented an animation system with events used in gameplay by other programmers.

<video controls style="width: 100%; height: auto;" src="/assets/portfolio/Y2/C/events.mp4" title="Animation Events"></video>
*Event-based animation system triggering console messages at keyframes*

## 🎮 Demo

**Isle Be Damned** was a strategy game in the style of *Bad North*.

<video controls muted width="100%" src="/assets/portfolio/Y2/C/Media1.mp4" title="Isle Be Damned Demo"></video>
*Isle Be Damned - Strategy game demo inspired by Bad North*

We also attempted a more traditional RTS similar to *StarCraft*, but ran out of time adapting it for Nintendo Switch.

<video controls muted width="100%" src="/assets/portfolio/Y2/C/whatwhat.mp4" title="Traditional RTS Demo"></video>
*Terranox - Traditional RTS prototype*

