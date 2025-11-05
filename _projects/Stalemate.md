---
layout: project
title: A Strategy game made in Unity | Stalemate
description: A game where you play as both sides.
image: /assets/media/stalemate/thumbnail.gif
categories: [💻Unity, C#, ⚙️Prototype, 🛠️Tools, 👥Team Project]

main_category: Personal Projects
date: 2025-11-05
---


## 🎮 Play on itch.io

<iframe frameborder="0" src="https://itch.io/embed/2664633" width="552" height="167"><a href="https://jasjasdev.itch.io/stalemate">Stalemate by JasJas, Tycro Games</a></iframe>

## 🚀 About the Project

Stalemate was made as a hobby project by me and [Jasmine de Jong](https://jasjasdev.itch.io/stalemate). We developed it in our free time, while doing our studies at Breda University of Applied Sciences. It is a game based on chess where you play as both sides, in order to obtain a "stalemate". Each round, battle ship "pieces" fight among each other based on predefined rules. I was responsible for the codebase used in the project.

## 📂 Source Code

The game source code can be found on [GitHub](https://github.com/Tycro-Games/Stalemate).

## 🛠️ Main Features

- Configurable gameplay loop using events
- AI that adapts to designer made constraints via a rating score
- Custom Scriptable Objects for making new unit types
- Serialization system for the unit types
- Audio integration with FMOD

## ⚙️ Key Highlights

### **Gameplay loop**

It follows a sequential list of events for each round: player chooses sides, show fog of war units, player places units, etc. The system uses `UnityEvents` to allow for changing certain phases of the game easily. This is applied in the same way for unit actions (move, attack, boost), as well as the ordering of unit actions. These can be reordered, modified or deleted as needed.

> Boosting is the ability of some units, to retrigger movement and attack
{: .prompt-info }

![alt text](/assets/media/stalemate/phase.png)

*Each phase of the game can be configured to trigger certain events*

---

### **Creating units as data**

All units are defined using `ScriptableObjects`, which is a feature that Unity provides to represent objects offline. To define a unit, one has to fill their gameplay information. Sprites for each unit are expected to be in grayscale, because they get colored based on the faction colors in a shader.

![alt text](/assets/media/stalemate/unit.png)

*Filling the gameplay data for a unit*

![alt text](/assets/media/stalemate/shader.png)

*Output of the shader from grayscale sprite*

---

### **AI constrained by design**

Stalemate is based on chess and it uses **backtracking** to generate all possible permutations of the 5 units in the 4 squares that are available at a time. In the project, there is a scene called **Backtracking** that showcases how the AI rates a board. In the video below you can see how the test scene is used to generate permutation using a max cost. These are sorted based on a developer-defined rating. Blue side is configured to have a smaller rating if there are fewer units placed, therefore, the highest rating boards have as many units as possible.

<video controls src="/assets/media/stalemate/export import.mp4" title="Title"></video>

*Debug scene where all the permutations are rated and viewed*

The constraints are once again defined offline by the designer:

![alt text](/assets/media/stalemate/AI.png)

*Blue rating defined as a ScriptableObject*

---

