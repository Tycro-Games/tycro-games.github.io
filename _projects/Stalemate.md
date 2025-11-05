---
layout: project
title: A Strategy game made in Unity | Stalemate
description: A strategy game where you play as both sides.
image: /assets/media/stalemate/thumbnail.gif
categories: [💻Unity, C#, ⚙️Prototype, 🛠️Tools, 👥Team Project]

main_category: Personal Projects
date: 2025-11-05
---

## 🚀 About the Project

Stalemate was made as a hobby project by me and [Jasmine de Jong](https://jasjasdev.itch.io/stalemate) alongside our studies at Breda University of Applied Sciences. It is a game based on chess where the player plays as both sides in order to obtain a "Stalemate". I was responsible for the code used in the project.

## 📂 Source Code

The game source code can be found on [GitHub](https://github.com/Tycro-Games/Stalemate).

## 🛠️ Main Features

- Configurable gameplay loop using events
- AI that adapts to designer made constraints via a rating score
- Custom Scriptable Objects for making new unit types
- Serialization system for the unit types
- Audio integration with FMOD



## ⚙️ Key Highlights:

### **Dynamic Pathfinding**
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Enemies dynamically alter their routes based on player tower placement.
  </div>

</div>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <img src="/assets/portfolio/lunar-voyage/A-path.gif" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" alt="Pathfinding demo in Lunar Voyage" />
</div>
---

### **Procedural Wave Spawning**


<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Procedurally selects enemies from a pool using scriptable objects and weight-based values.
  </div>
  <img src="/assets/portfolio/lunar-voyage/proc-spawnables.png" style="flex-shrink: 0; max-width: 45%; object-fit: contain;" alt="Procedural wave spawning in Lunar Voyage" />
</div>

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">

  <video src="/assets/portfolio/lunar-voyage/boom.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="Projectile explosion mechanics in Lunar Voyage"></video>

</div>
---


### **Tower Placement and Projectile Mechanics**
<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
  <div style="flex: 1; font-size: 1.5em; display: flex; align-items: center;">
    Towers shoot projectiles with customizable speed and parabolic paths.
  </div>

</div>
<div style="display: flex; justify-content: space-between; align-items: right; gap: 20px;">

 <video src="/assets/portfolio/lunar-voyage/parabolic.mp4" style="flex-shrink: 0; max-width: 100%; object-fit: contain;" controls alt="Parabolic projectile mechanics in Lunar Voyage"></video>
  </div>

---

## 🎮 Play on itch.io
<iframe frameborder="0" src="https://itch.io/embed/830920" width="552" height="167"><a href="https://tycro-dev.itch.io/lunar-voyage-moon-colonization">Lunar Voyage by Tycro Games, Jvfzago</a></iframe>