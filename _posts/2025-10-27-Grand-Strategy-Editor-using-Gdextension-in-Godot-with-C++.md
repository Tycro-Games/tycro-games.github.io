---
title: Making a Grand Strategy Map Editor Plugin for Godot in C++
date: 2025-10-27 14:10:00 +0200
categories: [Tutorials 📚, Engine 🔧]
tags: [🎨Graphics, 🔧Engine, Godot, C++]
math: true
img_path: /assets/assets-2025-10-27/
image: /assets/assets-2025-10-27/bg.gif
---

## Contents

In this article I will cover how I implemented the border rendering, a short section on the implementation I did in Godot and the possible improvements or future work one might be interested in.

The project is open source, you can access the repo by clicking [here](https://github.com/OneBogdan01/gs-map-editor).

- [Contents](#contents)
- [Intro](#intro)
  - [Results from my project](#results-from-my-project)
  - [Runtime demo](#runtime-demo)
- [Gdextension in Godot with C++](#gdextension-in-godot-with-c)
- [Rendering provinces using Imperator: Rome paper](#rendering-provinces-using-imperator-rome-paper)
- [Jump Flood for Distance Fields (and how to not implement it)](#jump-flood-for-distance-fields-and-how-to-not-implement-it)
- [Upscaling using HQX shaders](#upscaling-using-hqx-shaders)
- [Final Words](#final-words)
- [References](#references)

## Intro

Border generation grand strategy games may be one of the most interestingly complicated subjects that I approached so far. I started this project around the time that Paradox was already posting videos with the new content of Europa Universalis 5 (EU5). Below are references I used from Paradox games:

![alt text](/assets/assets-2025-10-27/game_comparison.png)
*From left to right: Europa Universalis 5 (EU5), Victoria 3 and EU4*

> The image from EU4 is using a mod for graphics enhancement.
{: .prompt-info }

I believe the most peculiar aspect is that Grand Strategy Games always have a runtime component, the maps you see above will change drastically over the course of one game and it will differ dramatically between runs.
I own Europa Universalis 4, therefore, it is not surprising that it will have similarities with the rightmost render. EU4 uses a `province map` to keep track of each province, I am not entirely certain, but I believe that they use the map below to generate their borders:

![alt text](/assets/assets-2025-10-27/provinces.bmp)
*Province map from EU4*

### Results from my project

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 112910.png>)
*Country borders and province borders with mask applied*

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 113506.png>)
*No country borders and province borders with mask applied*

Here are a few screenshots closer to the borders:
![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105438.png>)
*Norway*

![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105558.png>)
*Japan*

![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105332.png>)
*Brazil*


### Runtime demo

<video muted controls  src="/assets/assets-2025-10-27/borders.mp4" title="Title"></video>
*Shows how the project would work in a game*

## Gdextension in Godot with C++

GDextension is a way to extend the Godot engine that still allows very easy distribution via their plugin store.

There are a lot of resources on how to work with GDextension that I will link below.

LINK RESOURCES
Suffice to say that, coding in C++ plugins it is faster to run, but definitely not faster to write than in their scripting language (GDscript).

## Rendering provinces using Imperator: Rome paper

There are relatively few resources available online about Grand Strategy games. One that I found very useful is [Optimized Gradient Border Rendering in
Imperator: Rome][intel_paper]. Although the paper's title relates to performance, the prerequisites for optimization outline how to render gradients for the countries.

> The fact that the paper above is only explaining the algorithm for gradients, **not** on how to make borders is a limitation of the technique I use. I will suggest better alternatives at the end of the article.
{: .prompt-tip }

![alt text](</assets/assets-2025-10-27/Screenshot 2025-09-22 150426.png>)
*Screenshot from Imperator: Rome*

I will introduce a few terms from the paper, as it makes the explanation easier to grasp:

- `Color Map` is a small texture (256x256) that contains the color that a province should have.
- `Color Lookup` is a texture with two channels that contain UV coordinates for the `Color Map` .

The `Color Map` can be thought of as an array of colors that are in the same order of the provinces. To illustrate my point, below I show a very zoomed in `color map`.

> Note that, the first pixel is empty, as the first province's id is 1.
{: .prompt-info }
![alt text](/assets/assets-2025-10-27/color_map.png)
*Color map with the few first province IDs*

The first few provinces are mapped as follows:

![alt text](/assets/assets-2025-10-27/province_names.png)
*List of province pairs ID - Name, with their country color on the left*

Here the first few provinces are colored blue, since they are owned by Sweden. The 6th province is owned by Denmark, therefore the color reflects that.

To know the initial state of the map, we can parse each of the province files. This is how I formed a database of data, where each country has a color associated with it and each province is associated with a country.

There are a lot of gameplay related information, however, just to render a simple political map, we only need to find the token "owner=". There we will find a 3 letter ID. Here you can see SWE, which is the short name for Sweden.

Below, is one of the files that defines which provinces are owned by countries.


```
#Uppland, contains Stockholm, Uppsala & Nyk�ping.

add_core = SWE
# ------------------
# This is relevant for our use case
owner = SWE
# ------------------

controller = SWE
culture = swedish
religion = catholic
hre = no
base_tax = 5 
base_production = 5
trade_goods = grain
base_manpower = 3
capital = "Stockholm"
is_city = yes
discovered_by = eastern
discovered_by = western
discovered_by = muslim
discovered_by = ottoman
extra_cost = 16
center_of_trade = 2


1436.4.28 = { revolt = { type = pretender_rebels size = 1 leader = "Karl Knutsson Bonde" } controller = REB add_base_tax = 1 } # Karl Knutsson Bonde marsh on Stockholm
1438.3.6 = { revolt = {} controller = SWE } # Unclear date
1438.10.1 = { revolt = { type = pretender_rebels size = 1 leader = "Karl Knutsson Bonde" } controller = REB } # Unclear date
1440.9.1 = { revolt = {} controller = SWE } # Christopher III elected Union King
1444.11.12 = { add_base_tax = 2 }
1448.6.20 = { revolt = {} controller = SWE } # Karl VIII is elected king of Sweden
1501.8.1 = { controller = DAN } # Danish loyalists at Swedish DoW and breaking of vassalage
1502.5.9 = { controller = SWE } # Retaken by Sweden
1523.6.7 = { base_manpower = 4 } # Kgl.Drabantk�ren/Svea Livgarde
1527.6.1 = {
	religion = protestant
	reformation_center = protestant
}
1598.8.12 = { controller = PLC } # Sigismund tries to reconquer his crown
1598.12.15 = { controller = SWE } # Duke Karl get it back
1617.1.1 = { 
	base_tax = 6 
	base_production = 6 
} # Stockholm become Baltic Metropol
```


> You can find all the text files I used in my project [here](https://github.com/OneBogdan01/gs-map-editor/tree/478e1a66ed1c3b7e0f2383d00f836823dd868e66/demo/map).
{: .prompt-info }


I will refer to a `Political Map` as the output of these two textures.

TODO INTRODUCE COLOR MAP AND LOOK UP TEXTURE AS DIAGRAM HERE

The algorithm for simple rendering of colors can be summarized as follows:

1. From `Province Map` generate a lookup texture at the beginning
2. Parse the province and country data files
3. Associate each province with its country color
4. Create `Color Map` texture from the data in step 3
5. Render the final result

SHOW A DIAGRAM ANIMATION STEP BY STEP TO SHOW THE OUTPUT AT EACH STEP.

It is important to understand here, that this indirection is used, because the smaller texture can be modified easily and efficiently at runtime.

![alt text](<../assets/assets-2025-10-27/Screenshot 2025-09-24 133323.png>)
*Very simple political map that only outputs each province's color*

## Jump Flood for Distance Fields (and how to not implement it)

## Upscaling using HQX shaders

## Final Words

Vector based border generation

Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.

## References

[Source code](https://github.com/OneBogdan01/gs-map-editor).

[intel_paper]: https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf
[svg_repo_eu4]: https://github.com/primislas/eu4-svg-map
[simulating_eu4]: https://nickb.dev/blog/simulating-the-eu4-map-in-the-browser-with-webgl/
[sdf]: https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf
[hqx_shader]: https://www.shadertoy.com/view/tsdcRM
[very_old_epic_thread]: https://forums.unrealengine.com/t/borders-like-paradox-grand-strategy-game/763968
[wide_outlines]: https://bgolus.medium.com/the-quest-for-very-wide-outlines-ba82ed442cd9

