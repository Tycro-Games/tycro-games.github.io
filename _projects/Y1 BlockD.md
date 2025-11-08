---
layout: project
title: "Procedural Coastline Generation Tool in Unreal Engine | Game"
description: "A Wave Function Collapse (WFC)-based tool for artists and designers to generate island coastlines procedurally."
image: /assets/portfolio/blockd-preview.png
main_category: University Projects
date: 2024-07-15

# Metadata tags
features: "WFC Algorithm & A* Pathfinding"
engine: "C++ & Unreal Engine"
team_size: "12 people"
platform: "PC"
duration: "8 weeks"
---

## 🎓 About the Project

This project was made in a team of 12 students (4 programmers, 3 designers and 5 artists). I focused on creating a **procedural coastline generation tool** for artists and designers.

The tool was developed using **C++** and integrated into **Unreal Engine**. The initial prototype was built in **Unity**.

## 🎥 Watch the Trailer

In addition to creating the procedural tool, I also created the trailer for this project.

<iframe width="1120" height="650" src="https://www.youtube.com/embed/zk-24I7OJf8?si=GfJ0t553i__HbgYu" title="Game Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
*Game trailer showcasing procedurally generated island environments*

## 📂 Source Code

This project was hosted on **Perforce** as part of a collaborative workflow, and the source code is not publicly available.

## 🛠️ Skills Developed

- **C++ Development**: Implemented the tool's core logic and Unreal Engine integration.
- **Agile Methodology**: Worked iteratively in a team, conducting regular stand-ups and sprints.
- **Collaboration**: Coordinated with designers and artists to align tool functionality with creative goals.
- **Research Skills**: Studied Wave Function Collapse algorithm and implementations to establish feasibility of the tool.
- **Prototyping**: Built the initial tool prototype in Unity for rapid testing and feedback.
- **Unreal Engine Workflow**: Integrated C++ tools into Unreal Engine and ensured usability for non-programmers.

## ⚙️ My Contributions

### Tile-Based Input for Procedural Generation

I initially tried using the 2D tile editor in Unreal Engine, but I found [Tiled](https://www.mapeditor.org/) to be much more efficient for the designers and artists.

The tool uses a .tmx file specifying tile types. The system dynamically generates the coastline and mainland tiles that fit together based on their user-defined sockets.

![Tiled editor interface with tile definitions](/assets/portfolio/blockD/tiledBefore.png)
*Tile map editor showing coastline tile definitions and socket connections*

![Tiled editor overview](/assets/portfolio/blockD/over.png)
*Overview of tile placement in the Tiled editor*

![Generated island in Unreal Engine](/assets/portfolio/blockD/engineModfied.png)
*Resulting procedurally generated island rendered in Unreal Engine*

### Constraint-Based Tile Placement

Designed a WFC algorithm that enables defining 3D tiles and their connections with other tiles using sockets. It also generates all the sockets for rotated tiles if the user enables that setting.

![WFC algorithm generating island terrain](/assets/portfolio/blockD/proc2.png)
*Wave Function Collapse algorithm placing tiles based on socket constraints*

![Socket constraint definition interface](/assets/portfolio/blockD/defineConstraints.png)
*Interface for defining tile socket constraints and rotation settings*

![Generated procedural coastline](/assets/portfolio/blockD/proc1.png)
*Final procedurally generated coastline with varied terrain*

### A* Pathfinding for Road Generation

Incorporated an A* pathfinding algorithm to generate roads between specified points. The algorithm avoids obstacle objects, ensuring that roads go around the island's gameplay objectives or props.

![A* pathfinding demonstration in Unity prototype](/assets/portfolio/blockD/AUnity.gif)
*A* algorithm generating roads that navigate around obstacles*