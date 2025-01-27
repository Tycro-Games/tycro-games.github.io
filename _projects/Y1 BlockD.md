---
layout: project
title: "Procedural Coastline Generation Tool in Unreal Engine"
description: "A Wave Function Collapse (WFC)-based tool for artists and designers to generate island coastlines procedurally."
image: /assets/portfolio/blockd-preview.png
categories: [C++, 🌊Unreal Engine , 🔀Procedural Generation , 🎓University, 🛠️Tools ]
main_category: University Projects
date: 2024-07-15
---
## 🎓 About the Project

This project was a collaboration between students at **Breda University of Applied Sciences**. I focused on creating a **procedural coastline generation tool** for artists and designers.

The tool was developed using **C++** and integrated into **Unreal Engine**. The initial prototype was built in **Unity**.

## 📂 Source Code

This project was hosted on **Perforce** as part of a collaborative workflow, and the source code is not publicly available.

## 🛠️ Skills Developed

- **C++ Development**: Implemented the tool’s core logic and Unreal Engine integration.  
- **Agile Methodology**: Worked iteratively in a team, conducting regular stand-ups and sprints.  
- **Collaboration**: Coordinated with designers and artists to align tool functionality with creative goals.  
- **Research Skills**: Studied Wave Function Collapse algorithm and implementations to establish feasibility of the tool.  
- **Prototyping**: Built the initial tool prototype in Unity for rapid testing and feedback.  
- **Unreal Engine Workflow**: Integrated C++ tools into Unreal Engine and ensured usability for non-programmers.

## ⚙️ Key Highlights

---

### **Tile-Based Input for Procedural Generation**

I initially tried using the 2D tile editor in Unreal Engine, but I found [Tiled](https://www.mapeditor.org/) to be much more efficient for the designers and artists.

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    The tool uses a .tmx file specifying tile types. The system dynamically generates the coastline and mainland tiles that fit together based on the their user defined sockets.
  </div>
  <img src="/assets/portfolio/blockD/tiledBefore.png" style="flex-shrink: 0; max-width: 45%; object-fit: contain;" alt="Tiled Input for Procedural Generation" />
</div>

<!-- Add the images showing the results of editing the text file in Tiled and how it shows in the engine -->
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <img src="/assets/portfolio/blockD/over.png" style="flex-shrink: 0; max-width: 45%; object-fit: contain;" alt="Tiled Input Overview" />
  <img src="/assets/portfolio/blockD/engineModfied.png" style="flex-shrink: 0; max-width: 45%; object-fit: contain;" alt="In Engine Procedural Island" />
</div>

---

### **Constraint-Based Tile Placement**

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Designed a WFC algorithm that enables defining 3D tiles and their connections with other tiles using sockets. It also generates all the sockets for rotated tiles if the user enables that setting.
  </div>
  <img src="/assets/portfolio/blockD/proc2.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="Constraint-Based Tile Placement" />
</div>

<!-- Add the images showing the results of editing the text file in Tiled and how it shows in the engine -->
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <img src="/assets/portfolio/blockD/defineConstraints.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="In engine procedural Island" />
  <img src="/assets/portfolio/blockD/proc1.png" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="In Engine Procedural Island" />
</div>
---

### **A* Pathfinding for Road Generation**

---

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Incorporated an A* pathfinding algorithm to generate roads between specified points. The algorithm avoids obstacle objects, ensuring that roads go around the island's gameplay objectives or props.
  </div>
  <img src="/assets/portfolio/blockD/AUnity.gif" style="flex-shrink: 0; max-width: 50%; object-fit: contain;" alt="A* Pathfinding for Road Generation" />
</div>
---

## 🎥 Watch the Trailer

In addition to creating the procedural tool, I also created the trailer for this project.
<iframe width="1120" height="650" src="https://www.youtube.com/embed/zk-24I7OJf8?si=GfJ0t553i__HbgYu" title="Game Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

![alt text](../assets/portfolio/logo.png)