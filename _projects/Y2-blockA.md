---
layout: project
title: Custom Game Engine
description: Showcasing the development of a cross-platform engine demo with features including particle systems, ECS architecture, inspector hierarchies, and GLTF support for 3D models.
image: assets/portfolio/Y2/A/preview.png
categories: [C++, 🔧Engine Development, 🌍Cross-Platform, 🎓University, 🛠️Tools]

main_category: University Projects
date: 2024-11-08
---

## 📂 Source Code

Unfortunately, due to NDA restrictions, I am unable to share the codebase.

## 🛠️ Skills Developed

- **Cross-Platform Development**: Integrated with PS5 and PC platforms using the "pimpl" technique to ensure clean separation between interface and implementation.
  
- **Core Engine Systems**: Gained hands-on experience with ECS architecture, importing 3D models, and serialization using libraries like [`entt`](https://github.com/skypjack/entt) and [cereal](https://github.com/USCiLab/cereal).
- **ImGui Engine Windows**: Utilized [ImGui](https://github.com/ocornut/imgui) to create \\ engine windows for managing game entities, resources, and scene data, enabling a more user-friendly interface for debugging and development tasks.

- **Entity Hierarchies**: Managed complex entity structures and streamlined workflows via an inspector window for enhanced productivity.
  
- **Engine Architecture**: Designed a clean, extensible API to allow smooth interaction between game systems and tools.

## Demo
<iframe width="751" height="460" src="https://www.youtube.com/embed/WFJyYSXYuOM?si=PgACObtNaUXSW1hL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## ⚙️ Key Highlights

---

### **Particle System** using ECS



<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Particles with mass that fade over time.
  </div>
</div>

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <video src="/assets/portfolio/Y2/A/fire.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="particle video"></video>
</div>

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Particles with no mass that transition to another color over time.
  </div>
</div>

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <video src="/assets/portfolio/Y2/A/sparks.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="particle video"></video>
</div>

---

### **Debug Drawings**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Integrated debug drawing tools that visualize velocity, and shape velocities.
  </div>
  
</div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">

 <video src="/assets/portfolio/Y2/A/velocity_visualization.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="velocity drawing" ></video>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <video src="/assets/portfolio/Y2/A/cone_visualization.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="cone drawing" ></video>
  
</div>


---

### **Editor windows**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    I created an inspector, resource and scene window to allow the user interact with different systems of the engine.
  </div>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <video src="/assets/portfolio/Y2/A/parenting.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="Inspector Hierarchies" ></video>
</div>

---

### **Tile Editor with GLTFs**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Supports resizing and transform manipulation and undo/redo system using the command pattern.
  </div>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <video src="/assets/portfolio/Y2/A/tile.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="Inspector Hierarchies" ></video>
</div>

---