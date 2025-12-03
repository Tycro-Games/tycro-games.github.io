---
layout: project
title: "A 2D top down game made in C++ and SDL2 | An Unrealistic Spaceship Simulator"
description: "A C++ and SDL2 project built for Breda University's intake, having the theme 'Bounce'."
image: /assets/portfolio/auss-preview.png
main_category: Archive Projects
date: 2022-12-28

# Metadata tags
# features: "Gameplay Systems"
engine: "C++ & SDL2"
team_size: "Solo"
platform: "PC"
priority_graphics: 20
priority_engine: 9
---

# An Unrealistic Spaceship Simulator (AUSS) 🚀

**Created for Breda University Intake (Creative Media & Game Technologies)**

**AUSS** is a **top-down shooter** developed for my **Breda University** intake, using **C++** and **SDL2**. The project embraces the theme **"Bounce"**, where the core mechanic revolves around shooting projectiles that reflect on the tiles in the level.

## 🎥 Watch the Showcase

<iframe width="100%" height="400" src="https://www.youtube.com/embed/Ldiha_dJDD8" title="An Unrealistic Spaceship Simulator Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*Gameplay showcase demonstrating wave-based combat and bouncing projectile mechanics*

## 🎮 Play on itch.io

<iframe frameborder="0" src="https://itch.io/embed/1607830" width="552" height="167"><a href="https://tycro-dev.itch.io/auss">An Unrealistic Spaceship Simulator by Tycro Games</a></iframe>

## 📂 Source Code & Template

The game is based on a template I received during the intake, which you can find [here on GitHub](https://github.com/Tycro-Games/AUSS).


## 🛠️ Technologies Used
- **C++**: Game logic and core programming
- **SDL2**: Graphics, window management, and input handling

## ⚙️ My Contributions

### Wave System
The game is structured in **waves of enemies**. Players need to clear the current wave to move to the next, and the game progressively becomes more challenging. The **enemy spawner** becomes increasingly difficult with each wave.

### Flexible Enemy Configuration
One of the unique aspects of this project is that **players** can modify the game's **enemy waves** and **enemy properties** (such as health, speed, damage) simply by editing the JSON files. No programming experience is required!

### Bounce Mechanic and Collision Handling
Implemented using a **Sweep and Prune Algorithm** for efficient collision detection.