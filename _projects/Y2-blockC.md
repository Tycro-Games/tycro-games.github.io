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

- **Cross-Platform Development**: Designed and implemented the rendering layer, ensuring compatibility across Nintendo and PC targets. Contributed to the overall engine architecture with a focus on abstraction and maintainability.

- **Core Engine Systems**: Worked within an ECS architecture using [`entt`](https://github.com/skypjack/entt) and [cereal](https://github.com/USCiLab/cereal) for serialization. I built core gameplay systems, including a particle system and a 2D unit animation system, enabling other developers to easily integrate effects and animated sprites into the game.

- **Engine Inspector UI**: Utilized [ImGui](https://github.com/ocornut/imgui) to create editor windows for managing game entities, resources, and scene data.

- **Teamwork**: As this was my first "large" collaborative engine project, I contributed to code reviews, helped enforce team coding standards through using Github Actions, and worked to maintain a shared vision across the team. I got the opportunity to lead some of our meetings.


## 🎮 Demo

**Isle Be Damned** was a strategy game in the style of *Bad North*.

We also attempted to make a more "traditional" RTS using our engine, similar to *StarCraft* or *Cossacks 3*.  
We never managed to finish the Terranox demo, mainly because it was very hard to adapt it to our target, the Nintendo Switch, and the time ran out.

<video controls muted width="100%" src="/assets/portfolio/Y2/C/Media1.mp4" title="Isle Be Damned Demo"></video>
*Isle Be Damned - Strategy game demo inspired by Bad North*

<video controls muted width="100%" src="/assets/portfolio/Y2/C/whatwhat.mp4" title="Traditional RTS Demo"></video>
*Terranox - Traditional RTS prototype*

## ⚙️ My contributions

### 🎇 Particle System

The particle system was our main tool for adding "juice" and responsiveness to the game.  
It supported basic parameters with interpolation: color, velocity, acceleration and scaling.

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/scaling.mp4" title="Scaling Interpolation"></video>
*Particle scaling interpolation over lifetime*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/particles_sad.mp4" title="Moving Emitter"></video>
*Particle system with moving emitter*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/acceleration.mp4" title="Acceleration"></video>
*Particle acceleration parameter demonstration*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/wobble.mp4" title="Enemy Hit Particles"></video>
*Hit particle effect triggered on enemy impact*

### 🎯 Frustum Culling

To optimize rendering, I implemented an **early out check** using a two-stage culling system (quite simple, but effective for our use case):

This was especially effective for the RTS use case, where the camera looked down.  
With **8000 billboarded sprites**, frustum culling reduced the render time from **~30ms to 5ms**.

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/sphere culling.mp4" title="Sphere and Frustum Culling"></video>
*Color-coded culling visualization - Green: visible, Red: outside frustum, Orange: outside sphere*

<video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/8000.mp4" title="8000 Units Culling Demo"></video>
*Performance improvement: 8000 animated sprites rendered in ~5ms (down from ~30ms)*

### ⛰️ Terrain with Tessellation Shaders

I first tried to implement tessellation while working on the [Grand Strategy Renderer](https://tycro-games.github.io/projects/Y2-blockB/), but didn't manage to finish it due to time constraints.

In this project, I got it working, rendering the same terrain **~4× faster than geomipmapping on the CPU**, with better visual quality and lower memory usage.

<video autoplay muted loop controls style="width:100%; max-width:960px; height:auto;" src="/assets/portfolio/Y2/C/tess.mp4" title="Terrain Tessellation Demo"></video>
*GPU-based terrain tessellation with dynamic LOD*

**Performance Comparison:**

| Technique                | Performance | Memory Usage     | Implementation Difficulty | Scalability | Visual Quality     | Frustum Culling Support |
| ------------------------ | ----------- | ---------------- | ------------------------- | ----------- | ------------------ | ----------------------- |
| Naive                    | ~17ms       | High             | Trivial                   | Poor        | Good               | ❌ No                    |
| Geomipmapping            | ~4ms/frame  | Lower than naive | Medium                    | Good        | Good (with tuning) | ✅ Yes                   |
| **Tessellation Shaders** | **~1ms**    | **Low**          | **Hardest**               | **Best**    | **Best**           | ✅ Yes                   |

> Tessellation shaders could be improved further by subdividing geometry based on complexity—  
> something done in Sebastian Lague's [Geographical Adventures](https://github.com/SebLague/Geographical-Adventures).

### 🎬 Animation System for Billboarded Sprites

Our brief required that we have a 3D world with 2D sprites that represent units.  
I was in charge of this system and implemented an animation system with events that were used in gameplay by the other programmers.

<video controls style="width: 100%; height: auto;" src="/assets/portfolio/Y2/C/flip, speed, loop.mp4" title="Animation Flip, Speed, Loop"></video>
*Animation system controls: flip, speed, and loop parameters*

<video controls style="width: 100%; height: auto;" src="/assets/portfolio/Y2/C/events.mp4" title="Animation Events"></video>
*Event-based animation system triggering console messages at keyframes*

The videos showcase how I can use the animation system through the UI, and how the event based system triggers, using a console message.