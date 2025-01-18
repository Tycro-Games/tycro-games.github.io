---
title: Creating a basic Grand Strategy Renderer inspired by Europa Universalis 4
date: 2025-01-08 14:10:00 +0200
categories: [Learning 📚, Log 📖, Raytracing 🌐]
tags: [blog 📝, programming 💻, c++, 🔀procedural Generation , 🎓university, 🎨graphics , 🔺OpenGL, 🌍grand strategy]
math: true
img_path: /assets/assets-2025-01-08/
---


### Introduction
*Explain what the audience can expect out of this article. Explain what you are going to explain.*

## This is where I need to establish the relevance of grand strategy games!

Grand Strategy games (GTG) are a niche genre that appeal only to a smaller portion of the strategy audience. Their complex simulations of the world make it a hard genre to get into as well as a difficult one to develop for. The complex systems that guide diplomacy, economy and even history are being utilized more than just entertainment. The area of research around these games revolves around "Serious Games" for history, economy and medieval diplomacy. Here are a few research papers discussing those topics:
- [Grand Strategy Games As A Pedagogical Tool For Introductory Economics: A Student's Perspective](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4986923#paper-references-widget)
- [Simulating medieval connections Grand strategy games and social network analysis](https://jhnr.net/articles/81/files/660bbe5c7c0b0.pdf)
- [Grand Strategy Games and Economies](https://www.diva-portal.org/smash/get/diva2:1686298/FULLTEXT01.pdf)
- [Digitising Diplomacy: Grand Strategy Video Games as an Introductory Tool for Learning Diplomacy and International Relations](https://www.academia.edu/75509526/Digitising_Diplomacy_Grand_Strategy_Video_Games_as_an_Introductory_Tool_for_Learning_Diplomacy_and_International_Relations)


## Current state of tools for grand strategy

Most resources on the internet are providing information on how to create GTG games in an already established engine such as Unity, Godot or Unreal Engine. In this article my aim is to make the rendering aspect of this genre easier to approach, in order to contribute towards making engines and tools for creating GTG more accessible towards game developers.

## This is what I will present in my article

In this article I will explain how one can tackle the **rendering** challenges involved when creating a typical Grand strategy game from Paradox Interactive such as Europa Universalis 4.


By the end of the article you are going to have a procedural landmass, water and two map modes that you can switch between.

### Showcase what we are going to do
// video
I am going to use C++ and OpenGL for showcasing the concepts, using other languages and graphics API should be possible for all that we will discuss. It is expected that the reader knows some OpenGL.


### Body

*This can be thought of as the story of the project. What are did you set out to create? What did you actually get done? What features does it have?*

#### Outline
1. Generating procedural mesh
2. Texturing terrain
3. Simple water rendering
4. Province borders
5. Adding another map mode


## Introducing a heightmap

![heightmap_texture_of_the_world]({{ page.img_path }}heightmap.bmp)

This texture can be used to extract the height data from a single channel in order to create a 3D mesh. We can create this mesh by by populating the OpenGL buffers:
```cpp

mesh->SetAttribute(Mesh::Attribute::Position, meshVertices);
mesh->SetIndices(meshIndices);
mesh->SetAttribute(Mesh::Attribute::Texture, meshUVs);
//vertex normals
mesh->SetAttribute(Mesh::Attribute::Normal, meshNormals);

```
A procedural mesh for terrain can be thought of as a plane, which needs to have at least the same number of vertices as the resolution of the heightmap. We will then read the data of the heightmap texture and add it to the y axis. There are numerous tutorials that will provide code and explanations on how to achieve this.
- [OGLDEV](https://youtu.be/xoqESu9iOUE?si=HWXc-EfHuPOQWhgq)
- [LearnOpenGL](https://learnopengl.com/Guest-Articles/2021/Tessellation/Height-map)


![wireframe]({{ page.img_path }}3D_wireframe.png)

## Possible mesh optimizations

This 

#### How Grand Strategy games look & article outline?

Show some relevant eu4 snippets with:
- Terrain mesh and texturing with bombing triplanar, extra work for Height based blending and splatting
- Optimization techniques for the mesh:
  - Tesselation shaders
  - Geo mipmapping
  - Frustum Culling
- simple and easy water to add
- using a color map for texturing
- map modes
  - how one might implement this using multiple shaders instead of only one
  -
  - Gradient with compute shaders for the borders


### Conclusion
*Summarize what the article has been about, future ideas for the project. Problems that you encountered that were not discussed in the body.*

Basic starting point for rendering that could serve a Grand Strategy engine.

Future ideas:

- Pipeline for generating procedural grand strategy worlds
- Rivers and lakes
- Foliage and cities
- Infrastructure for creating cities based on provinces
- Spline based borders as well as text

