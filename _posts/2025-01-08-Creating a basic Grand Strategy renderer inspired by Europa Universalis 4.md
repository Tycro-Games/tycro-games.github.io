---
title: Creating a basic Grand Strategy Renderer inspired by Europa Universalis 4
date: 2025-01-08 14:10:00 +0200
categories: [Learning 📚, Log 📖, Raytracing 🌐]
tags: [blog 📝, programming 💻, c++, 🔀procedural Generation , 🎓university, 🎨graphics , 🌍grand strategy]
math: true
img_path: /assets/assets-2025-01-08/
---


### Introduction
*Explain what the audience can expect out of this article. Explain what you are going to explain.*

## This is where I need to establish the relevance of grand strategy games!

Grand Strategy games are a niche genre that appeal only to a smaller portion of the strategy audience. The complex systems that guide diplomacy, economy and even history are being utilized as "serious games". The area of research around these games:
-[Grand Strategy Games As A Pedagogical Tool For Introductory Economics: A Student's Perspective](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4986923#paper-references-widget)
- [Simulating medieval connections](https://jhnr.net/articles/81/files/660bbe5c7c0b0.pdf)
- [Grand Strategy Games and Economies](https://www.diva-portal.org/smash/get/diva2:1686298/FULLTEXT01.pdf)
- [Digitising Diplomacy: Grand Strategy Video Games as an Introductory Tool for Learning Diplomacy and International Relations](https://www.academia.edu/75509526/Digitising_Diplomacy_Grand_Strategy_Video_Games_as_an_Introductory_Tool_for_Learning_Diplomacy_and_International_Relations)
- 
In this article I will explain how one can tackle the **rendering** challenges involved when creating a typical Grand strategy game from Paradox Interactive such as Europa Universalis 4. By the end of the article you are going to have a procedural landmass, water and two map modes that you can switch between.

### Showcase what we are going to do


### Body

*This can be thought of as the story of the project. What are did you set out to create? What did you actually get done? What features does it have?*

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

Basic starting point for creating a technologies that aid in creation of grand strategy games.

Future ideas:

- Tesselation shaders to generate the mesh
- Pipeline for generating procedural grand strategy worlds
- Rivers and lakes
- Foliage and cities
- Political map mode

