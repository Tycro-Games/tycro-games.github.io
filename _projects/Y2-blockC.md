---
layout: project
title: FireAnt | PC/Nintendo Engine
description: A cross-platform engine demo featuring particle systems, ECS architecture, inspector hierarchies, and GLTF 3D model support.
image: assets/portfolio/Y2/C/Animation.gif
categories: [C++, 🔧Engine Development, 🌍Cross-Platform, 🎓University, 🛠️Tools, 🎨Graphics, 👥Team Project]

main_category: University Projects
date: 2025-04-08
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

We also attempted to make a more "traditional" RTS using our engine, similar to <em>StarCraft</em> or <em>Cossacks 3</em>.<br>
We never managed to finish the Terranox demo, mainly because it was very hard to adapt it to our target, the Nintendo Switch, and the time ran out.
<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; margin-top: 1rem;">
  <div style="flex: 1 1 300px; max-width: 640px;">
    <video controls muted width="100%" src="/assets/portfolio/Y2/C/Media1.mp4" title="Isle Be Damned Demo"></video>
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">Isle Be Damned</p>
  </div>

  <div style="flex: 1 1 300px; max-width: 640px;">
    <video controls muted width="100%" src="/assets/portfolio/Y2/C/whatwhat.mp4" title="Traditional RTS Demo"></video>
    <p style="text-align: center; font-style: italic; margin-top: 0.5rem;">Terranox</p>
  </div>
</div>



## ⚙️ Key Highlights

### 🎇 Particle System

The particle system was our main tool for adding "juice" and responsiveness to the game.  
It supported basic parameters with interpolation: color, velocity, acceleration and scaling.

<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; margin-top: 1rem;">

  <figure style="flex: 1 1 320px; max-width: 45%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/scaling.mp4" title="Scaling Interpolation"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">Scaling Interpolation</figcaption>
  </figure>

  <figure style="flex: 1 1 320px; max-width: 45%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/particles_sad.mp4" title="Moving Emitter"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">Moving Emitter</figcaption>
  </figure>

  <figure style="flex: 1 1 320px; max-width: 45%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/acceleration.mp4" title="Acceleration"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">Acceleration</figcaption>
  </figure>

  <figure style="flex: 1 1 320px; max-width: 45%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/wobble.mp4" title="Enemy Hit Particles"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">Hit Particle Effect (on enemy impact)</figcaption>
  </figure>

</div>

---

### 🎯 Frustum Culling

To optimize rendering, I implemented an **early out check** using a two-stage culling system (quite simple, but effective for our use case):

This was especially effective for the RTS use case, where the camera looked down.  
With **8000 billboarded sprites**, frustum culling reduced the render time from **~30ms to 5ms**.

<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; margin-top: 1rem;">

  <figure style="flex: 1 1 320px; max-width: 48%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/sphere culling.mp4" title="Sphere and Frustum Culling"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">
      Color-coded sphere and frustum culling  
      (Green: visible, Red: outside frustum, Orange: outside sphere)
    </figcaption>
  </figure>

  <figure style="flex: 1 1 320px; max-width: 48%; text-align: center;">
    <video autoplay muted loop controls width="100%" src="/assets/portfolio/Y2/C/8000.mp4" title="8000 Units Culling Demo"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">
      8000 animated sprites: ~30ms without culling → ~5ms with culling
    </figcaption>
  </figure>

</div>

---

### ⛰️ Terrain with Tessellation Shaders

I first tried to implement tessellation while working on the [Grand Strategy Renderer](https://tycro-games.github.io/projects/Y2-blockB/), but didn’t manage to finish it due to time constraints.

In this project, I got it working, rendering the same terrain **~4× faster than geomipmapping on the CPU**, with better visual quality and lower memory usage.

<video autoplay muted loop controls style="width:100%; max-width:960px; height:auto;" src="/assets/portfolio/Y2/C/tess.mp4" title="Terrain Tessellation Demo"></video>

---

<table style="width:100%; border-collapse: collapse; margin-top: 1em;">
  <thead>
    <tr style="text-align:left;">
      <th style="padding:0.5em 1em;">Technique</th>
      <th style="padding:0.5em 1em;">Naive</th>
      <th style="padding:0.5em 1em;">Geomipmapping</th>
      <th style="padding:0.5em 1em;">Tessellation Shaders</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Performance</td>
      <td style="padding:0.5em 1em;">~17ms</td>
      <td style="padding:0.5em 1em;">~4ms/frame</td>
      <td style="padding:0.5em 1em; font-weight:bold;">~1ms</td>
    </tr>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Memory Usage</td>
      <td style="padding:0.5em 1em;">High</td>
      <td style="padding:0.5em 1em;">Lower than naive</td>
      <td style="padding:0.5em 1em; font-weight:bold;">Low</td>
    </tr>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Implementation Difficulty</td>
      <td style="padding:0.5em 1em;">Trivial</td>
      <td style="padding:0.5em 1em;">Medium</td>
      <td style="padding:0.5em 1em; font-weight:bold;">Hardest</td>
    </tr>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Scalability</td>
      <td style="padding:0.5em 1em;">Poor</td>
      <td style="padding:0.5em 1em;">Good</td>
      <td style="padding:0.5em 1em; font-weight:bold;">Best</td>
    </tr>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Visual Quality</td>
      <td style="padding:0.5em 1em;">Good</td>
      <td style="padding:0.5em 1em;">Good (with tuning)</td>
      <td style="padding:0.5em 1em; font-weight:bold;">Best</td>
    </tr>
    <tr>
      <td style="padding:0.5em 1em; font-weight:bold;">Frustum Culling Support</td>
      <td style="padding:0.5em 1em;">❌ No</td>
      <td style="padding:0.5em 1em;">✅ Yes</td>
      <td style="padding:0.5em 1em;">✅ Yes</td>
    </tr>
  </tbody>
</table>

---

> Tessellation shaders could be improved further by subdividing geometry based on complexity—  
> something done in Sebastian Lague’s [Geographical Adventures](https://github.com/SebLague/Geographical-Adventures).



### 🎬 Animation system for billboarded sprites

Our brief required that we have a 3D world with 2D sprites that represent units.  
I was in charge of this system and implemented an animation system with events that were used in gameplay by the other programmers.

<div style="
  display: flex; 
  flex-wrap: wrap; 
  gap: 32px; 
  justify-content: center; 
  margin-top: 1rem;
">

  <figure style="
    flex: 1 1 600px; 
    max-width: 900px; 
    min-width: 320px; 
    text-align: center;
  ">
    <video controls style="width: 100%; height: auto;" src="/assets/portfolio/Y2/C/flip, speed, loop.mp4" title="Animation Flip, Speed, Loop"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">
      Animation system controls: flip, speed, loop
    </figcaption>
  </figure>

  <figure style="
    flex: 1 1 600px; 
    max-width: 900px; 
    min-width: 320px; 
    text-align: center;
  ">
    <video controls style="width: 100%; height: auto;" src="/assets/portfolio/Y2/C/events.mp4" title="Animation Events"></video>
    <figcaption style="margin-top: 0.5rem; font-style: italic; font-size: 1rem;">
      Event-based animation system triggering console messages
    </figcaption>
  </figure>

</div>

The videos showcase how I can use the animation system through the UI, and how the event based system triggers, using a console message.

## 📂 Source Code

Unfortunately, due to NDA restrictions, I am unable to share the codebase.

---

![alt text](/assets/portfolio/logo.png)
