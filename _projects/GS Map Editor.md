---
layout: project
toc: true
title: Plugin for Godot | Grand Strategy Map Editor
description: A Godot 4.5 GDExtension that provides editor tools for interacting with Europa Universalis provinces and country data as well as a shader pipeline that renders a map with smooth borders.
image: assets/media/gs_map/demo_final.gif

main_category: Personal Projects
date: 2025-11-07

engine: "C++"
team_size: "Solo"  
platform: "PC"  
duration: "Sep. - Nov. 2025"
priority_graphics: 1
priority_engine: 2
priority_highlights: 1
---

## 📂 Source Code

Can be found on GitHub [here](https://github.com/OneBogdan01/gs-map-editor).

---

## Overview

I created a plugin in C++ that can read and modify a database of countries with provinces based on the Europa Universalis 4 and render a political map that has esthetic borders at medium to far distances.

- I did not know how to create editor tools in godot
- I had to research various ways to render political maps, focusing on creating borders.

My main goal for this project was to learn how the Godot engine can be extended using C++. It was a general confirmation that the language can be modified and changed to fit with a general architecture of the engine. C++ is very different in Godot compared to the small scale engines I worked on previously. One could argue that they were frameworks, rather then engines as complex as Godot.

The secondary goal was to dive deeper into how Europa Universalis 4(EU4) works as a grand strategy game, which is one of my favorite genres of all time. More specifically, the problems I wanted to solve relate to the database that needs to manage the countries. In turn, countries are build out of provinces which in a grid would be the cells. In this case however, provinces are voronoi like shapes that take an immersive historical aura.

One of the more interesting aspects was the rendering of country states. Below is an article I wrote that explains how I achieved this using an adapted technique explained from this [paper](https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf).

### 📚 [Project Article (contains code!)](https://tycro-games.github.io/posts/Grand-Strategy-Editor-using-Gdextension-in-Godot-with-C++/)

## 🛠️ Features

- Smooth borders using HQX shader
- Compute abstraction for generating `color_map`, `lookup_color` and `political_mask`
- Export/import functionality based on Europa Universalis 4 format
- Custom Inspector window for editing country data

## ⚙️ My Contributions

### Rendering Pipeline

I used the technique described in this [paper](https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf) to implement basic rendering for each of the countries, which can change at runtime their provinces. Broadly speaking, it involves using two textures(UV coordinates and one with color values) as an indirection in the fragment shader. One of them defines the UV coordinates to the other texture, therefore, a province is mapped to a pixel and changing that particular pixel will change the province color.

![Pipeline diagram](/assets/assets-2025-10-27/diagram.jpg)
*Complete overview of the rendering pipeline from province map to final output*

![Simple political map](/assets/assets-2025-10-27/Screenshot 2025-09-24 133323.png)
*Basic political map outputting province colors without borders*

### Border Rendering

There are many ways to do border rendering. One can generate meshes, use vector based splines or image based techniques. The latter is one of the simpler ones that I implemented, it has artifacts in certain . The political map from the `Rendering Pipeline` is used in conjunction with a mask and Signed Distance Field texture to create low resolution borders. Afterwards a HQX shader is applied to create a smooth appearance.

![Upscaled map result](/assets/assets-2025-10-27/upscaled.png)
*Map upscaled using HQX shader for smoother appearance*

### Editor Functionality

In this project I also learned how to extend the editor in Godot. Below you can see how the user can change owenership of provinces, or their country color through the editor I made. The changes are saved in the file format that Europa Universalis 4 uses.

<video controls src="/assets/media/gs_map/export import.mp4" title="Title"></video>

*Demonstration of province ownership editing and export/import functionality*

## 🎮 Download on itch.io

<iframe frameborder="0" src="https://itch.io/embed/4008182" width="552" height="167"><a href="https://tycro-dev.itch.io/grand-strategy-map-demo">Grand Strategy Map Demo by Tycro Games</a></iframe>
