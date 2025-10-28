---
title: Making a Grand Strategy Map Editor Plugin for Godot in C++
date: 2025-10-27 14:10:00 +0200
categories: [Tutorials 📚, Engine 🔧]
tags: [🎨Graphics, 🔧Engine, Godot, C++]
math: true
img_path: /assets/assets-2025-10-27/
image: /assets/assets-2025-10-27/bg.gif
---

## Intro

ADD HOOK here:
Ideas:

- Importance of grand strategy tools to make it easier for game developerms to make games in that genre
- Maybe some highlight of the project, like rendering, borders? Inspector for editing data?

Border generation grand strategy games may be one of the most interestingly complicated subjects that I approached so far. I started this project around the time that Paradox was already posting videos with the new content of Europa Universalis 5 (EU5). Below are references I used from Paradox games:

![alt text](/assets/assets-2025-10-27/game_comparison.png)
*From left to right: Europa Universalis 5 (EU5), Victoria 3 and EU4*

> The image from EU4 is using a mod for graphics enhancement.
{: .prompt-info }


I believe the most peculiar aspect is that Grand Strategy Games always have a runtime component, the maps you see above will change drastically over the course of one game and it will differ dramatically between runs.
I own Europa Universalis 4, therefore, it is not surprising that it will have similarities with the rightmost render. EU4 uses a `province map` to keep track of each province, I am not entirely certain, but I believe that they use the map below to generate their borders:

![alt text](/assets/assets-2025-10-27/provinces.bmp)
*Province map from EU4*

## Results from my project

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 112910.png>) 

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 113506.png>)
![text](2025-10-27-Grand-Strategy-Editor-using-Gdextension-in-Godot-with-C++.md)
![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105438.png>) 
![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105558.png>) 
![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105332.png>)

## Demo

<video muted controls  src="/assets/assets-2025-10-27/borders.mp4" title="Title"></video>


## Contents

- Write about what can they find here

1. Gdextension with C++ in Godot. (touch lightly and mainly reference to main references)
2. Rendering in Grand Strategy games using the intel paper.
3. Jump flood algorithm and on Subviewports.

## Final Words

Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.

## References

[Source code](https://github.com/OneBogdan01/gs-map-editor).
