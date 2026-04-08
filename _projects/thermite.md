---
layout: project
title: Ray-traced destroy everything voxel game engine | thermite
description: A custom tech engine that support voxel ray-tracing and destruction.
image: assets/media/thermite/cover.png
main_category: University Projects
date: 2026-02-10
engine: "C++ & SDL3"
team_size: "16 developers"
platform: "PC (Steam)"
duration: "Nov. 2025 - June. 2026"
priority_highlights: 3
---

<!-- ## Source Code ADD when it is open source

Can be found on GitHub **[here](TODO_LINK)**.

--- -->

> **Note:** This project is still in development — this page covers the first 16 weeks of work.

## Overview

**Voxmos** (name is still a work in progress) is an FPS mining game that features raytracing and voxel mining with destruction made with the **Thermite** engine. The engine was built from the beginning of the project in parallel with the design of the game. The team consisted of 10 programmers, 3 designers and 3 artists. Below is an in-progress video of features of the game and engine:


{% include embed/youtube.html id='vkW3bTD-wck' %}

**Key Achievement:** Building and publishing a custom voxel raytracing engine and game on Steam as a multidisciplinary team of 16.

---

## What I Did

I was more of a generalist on this project, this is what I contributed with:

- **Editor additions and improvements:** console with commands, filtering and logs; build packager; physics layer editor (inspired by Godot);
- **CI/CD pipeline:** hybrid setup using Perforce and GitHub; non-programmers were using Perforce to handle assets, while all the code was developed and checked via various actions on GitHub;
- **Input System:** via SDL3 support for controller and keyboard + mouse, using input actions;
- **Gameplay mechanics:** mining via rays, early player collision; barge logic for movement and collection of ores; weapon handling state for the 3 types in the game.
- **Debugging and bug fixing**

---

## Gameplay

> [Developers at valve] learned the hard lesson not to develop both a Half-Life game and its engine from the ground up at the same time

I think this quote fits very well, since as a team we learned the same lesson from the project. A big challenge I faced when implementing gameplay features was that I often did not have the right engine APIs, therefore I closely worked with physics programmers in order to advance progress of our milestones from gameplay as well as from the engine side. This is how I helped to prioritize certain APIs, requested new ones or modified them. As I usually do engine programming, I also argued to use certain design patterns such as the observer (mainly for events to decouple components) and for the state pattern (player and weapons). In the end we used `entt`'s dispatcher for instantaneous events to decouple the codebase without needing to do any initial time investment.

---

## Perfectionism

When I moved to gameplay I had an urge to ask for everything I would have needed and a bit more. I was asking the engine team for a lot of features, even though the scope we had was on the higher side. This was obviously a big mistake that my colleague Mika, the other gameplay programmer, helped me see through debates we had over gameplay as well as the physics APIs we asked for. The other side of the problem was that I was aiming to follow programming principles too aggressively, for instance I wanted to implement the state pattern as soon as I learned that we had tools in the game, even though a switch statement would have been enough. 

Together with the engine team we arrived at a balance between features that were absolutely needed in order to ship features. At the time of writing, these were physics layers, raycasts and a sphere check.

---

## Reflection

I would like to emphasize that at the beginning of the project I had to overcome two issues that I personally struggled with. The first was that the idea chosen from the concepting phase did not really appeal to me. I did not find it particularly interesting at the time and the thought that I had to work on it for about 6 months worried me. The second was that most of the team had experience working together and I felt like an outsider.

This made me feel that my ideas were quite useless to the team and I doubted myself a lot at that point in time.

Fortunately, these two problems that caused me a lot of distress in the first months were resolved completely. I started to fit in with the group and contribute to discussions about gameplay, pipeline, modules and even game design. The distance I felt in the beginning was overcome by talking with my colleagues and getting to know their characters and many talents. On the first issue, I managed to find parts of the project more interesting than my initial opinion and I am happy to say I was able to overcome my initial worry.

In the end, I learned a few new things related to programming and got to meet and work with talented developers on an impressive project. The thing that I will take with me is that my initial feelings and assumptions towards anything can change, and interesting things to learn and satisfy one's curiosity can arise from any project.
