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
- [Rendering provinces using Imperator: Rome's paper](#rendering-provinces-using-imperator-romes-paper)
- [Distance Fields - Jump Flood Algorithm (and how to not implement it)](#distance-fields---jump-flood-algorithm-and-how-to-not-implement-it)
	- [How to not do the Jump Flood Algorithm](#how-to-not-do-the-jump-flood-algorithm)
- [Upscaling using HQX shaders](#upscaling-using-hqx-shaders)
	- [Future work: vector based borders](#future-work-vector-based-borders)
- [References](#references)
- [Final Words](#final-words)

## Intro

Border generation grand strategy games may be one of the most interestingly complicated subjects that I approached so far. You can read more about this topic here:[very_old_epic_thread], [simulating_eu4], [game_dev_exchange]. I started this project around the time that Paradox was already posting videos with the new content of Europa Universalis 5 (EU5). Below are references I used from Paradox games:

![alt text](/assets/assets-2025-10-27/game_comparison.png)
*From left to right: Europa Universalis 5 (EU5), Victoria 3 and EU4*

> The image from EU4 is using a mod for graphics enhancement.
{: .prompt-info }

I believe the most peculiar aspect is that Grand Strategy Games always have a runtime component, the maps you see above will change drastically over the course of one game and it will differ dramatically between runs. If you are interested in reading more about this you check
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

Another important aspect is that I am only using compute shaders for generating the `color_lookup` and `color_map` at the beginning of the application. The rest is implemented using `SubViewports` in Godot, which is not the best way to implement it, but it allowed me to experiment faster than I could have using compute shaders.

## Rendering provinces using Imperator: Rome's paper

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

Below is a short snippet that gets the province color from the two textures.

```glsl
uniform sampler2D lookup_map : filter_nearest;
uniform sampler2D color_map : source_color, filter_nearest;

vec4 get_province_color(vec2 uv)
{
 vec4 lookup = texture(lookup_map, uv);
 vec2 province_id = lookup.rg;
 return texture(color_map, color_uv);
}
```

It is important to understand here, that this indirection is used, because the smaller texture can be modified easily and efficiently at runtime.

![alt text](<../assets/assets-2025-10-27/Screenshot 2025-09-24 133323.png>)
*Very simple political map that only outputs each province's color*

## Distance Fields - Jump Flood Algorithm (and how to not implement it)

Signed Distance Fields(SDF) are a common technique used in game development to create various graphics effects which can be seen in [this][sdf] paper from Valve. In the most simple case, one can generate an SDF as a 8 bit one channel texture.
The brute force version of this algorithm is to check each texel's neighbors using a "spread" variable. As you can imagine, 0 will represent the smallest distance and 1 will be the maximum distance.

> This is an Unsigned Distance field, since the borders cannot have a negative distance.
{: .prompt-tip }

Historically, this technique was first used for font rendering, to maintain crisp UI elements. However, we are using it to create a border, as well as a gradient between country colors. Therefore, the code needs to be adapted to this, below is the simplest (and slowest) shader code:

```glsl

void fragment()
{
	vec2 uv = UV;
	vec4 center_color = get_province_color(uv);
	vec2 pixel_size = 1.0 / vec2(textureSize(lookup_map, 0));
	float min_distance = max_distance;
	bool found_edge = false;
	int spread = int(max_distance);
	
	for (int x = -spread; x <= spread; x++)
	{
		for (int y = -spread; y <= spread; y++)
		{
			vec2 offset = vec2(float(x), float(y));
			vec2 sample_uv = uv + offset * pixel_size;
			vec4 sample_color = get_province_color(sample_uv);
			
			if (sample_color != center_color)
			{
				float dist = length(offset);
				min_distance = min(min_distance, dist);
			}
		}
	}
	
	float normalized_distance = min_distance / max_distance;
	COLOR = vec4(vec3(normalized_distance), 1.0);
}
```


![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-29 112346.png>)
*Resulting Distance field*

At this point we can already render a pixelated map with a gradient and borders.

```glsl
bool colors_equal(vec4 a, vec4 b)
{
	return all(lessThan(abs(a - b), vec4(EPSILON)));
}

void fragment()
{
	vec2 uv = UV;
	float df = texture(country_distance_field, UV).r;
	float df_province = texture(province_distance_field, UV).r;

	vec4 province_color = get_province_color(uv);

	float gradient_factor = smoothstep(edge_threshold - edge_smoothness,
			edge_threshold + edge_smoothness,
			df);


	vec3 final_color = mix(border_color.rgb, province_color.rgb, gradient_factor);

	final_color = mix(province_color.rgb, final_color, gradient_strength);
	// the sdf value becomes a border at a certain threshold
	if (df < edge_size)
	{
		final_color = border_color.rgb;
	}
	vec4 output = vec4(final_color.rgb, province_color.a);

	COLOR = output;

}
```

![alt text](/assets/assets-2025-10-27/sdf_image.png)
*Output of the previous shader*

The output is quite pixelated, while for pixel art styles this might be good enough, most developers would need a smoother result for making their maps exactly how they want. Feel free to skip to the [upscaling chapter](#upscaling-using-hqx-shaders), if you don't need a faster SDF generation.


### How to not do the Jump Flood Algorithm

This algorithm has a complexity of O(log n), it is useful in the context of a simulated environment where each country is fighting wars, their provinces changing several times a frame. In other, words, you can safely skip this part. The JFA itself is quite simple to implement, however, I think it is worth spending some time to understand it thoroughly. [Ben Golus][wide_outlines] has an article exploring the performance of this algorithm for outlines on 3D models. I will not explain the algorithm, since there are plenty of resources:

- [shadertoy][jfa]
- [article on voronoi diagrams and distance field][Fast Voronoi Diagrams and Distance Field Textures on the GPU With the Jump Flooding Algorithm]
- [paper on jfa][paper_jfa]

Below I did a quick experiment in Godot using [SubViewports][subviewport] which can be thought of as `Render Textures` from other engines.

<video controls src="/assets/assets-2025-10-27/nyan.mp4" title="Title"></video>
*Nyan the cat outline with the Jump Flood Algorithm*

A problem I encountered here is two fold:

- `SubViewports` provide less flexibility for the programmer compared to a compute shader. They are very easy to test and can be run from the editor. However, I believe it is safer to implement the algorithm in compute shaders at least in the Godot engine (version 4.1).
- Earlier I mentioned that the paper explains how to create the gradients, not the borders, however, the JFA algorithm needs a "seed" image with the borders. I was unable to use the previously mentioned approach to create good enough results with the naive detect a pixel is a border if neighboring pixels have another color. 

I believe that using compute shaders or calculating the borders using a vector based approach might yield good results.

## Upscaling using HQX shaders

The HQX shader is used to make the image look like it is at a higher resolution. It has been been implemented in godot [here](https://github.com/Thomas-Holtvedt/opengs/blob/8a86111d108fe3bcaef8c827529978e84ff8131c/map/shaders/map3d.gdshader) or in [Unreal Engine](https://www.youtube.com/watch?v=VjfHYfNEA_w). You can check the [shadertoy][hqx_shader] to have an interactive experience with the shader.

![alt text](/assets/assets-2025-10-27/upscaled.png)
*Upscaled result using HQX*

Clearly this approach, is not perfect, especially when the camera is zoomed enough you can clearly see artifacts:
![alt text](/assets/assets-2025-10-27/artifacts.png)
*Upscaling artifacts*

However, this might be fine for a wide range of applications that involve looking at a grand strategy map from a medium distance.

### Future work: vector based borders

I will warn you from the start, that I have not implemented this technique yet. EU4 might use something similar, and it is known for a fact that they generate meshes for some of the borders they display:


[Oikoumene][svg_repo_eu4] is an open source project using Scala, that generates an impressive looking map as a `.svg`! They have a [page](https://github.com/primislas/eu4-svg-map/tree/bddacf30b46761a9635aee3ed49d19805c0d0f34/docs/pages) dedicated to the explanation of the algorithm they use. The gist of the approach is to use the `province map` that we saw earlier to create the shape of the borders.

![alt text](/assets/assets-2025-10-27/banner.png)
*SVG from Oikoumene samples*


![alt text](/assets/assets-2025-10-27/zoomedin.png)
*Original province map, approximately the same region as the screenshot below*

![alt text](/assets/assets-2025-10-27/curves.png)
*Province borders from Oikoumene*

I think this approach looks amazing and I will keep you updated when I finally have a similar project as the one above. The JFA algorithm would also benefit from having the border as the input, resulting in a much better SDF output for the map gradients.

## References

[Source code](https://github.com/OneBogdan01/gs-map-editor).

[intel_paper]: https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf
[sdf]: https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf
[svg_repo_eu4]: https://github.com/primislas/eu4-svg-map
[simulating_eu4]: https://nickb.dev/blog/simulating-the-eu4-map-in-the-browser-with-webgl/
[hqx_shader]: https://www.shadertoy.com/view/tsdcRM
[very_old_epic_thread]: https://forums.unrealengine.com/t/borders-like-paradox-grand-strategy-game/763968
[wide_outlines]: https://bgolus.medium.com/the-quest-for-very-wide-outlines-ba82ed442cd9
[game_dev_exchange]: https://gamedev.stackexchange.com/a/213105
[subviewport]: https://docs.godotengine.org/en/stable/tutorials/shaders/using_viewport_as_texture.html
[Fast Voronoi Diagrams and Distance Field Textures on the GPU With the Jump Flooding Algorithm]: https://blog.demofox.org/2016/02/29/fast-voronoi-diagrams-and-distance-dield-textures-on-the-gpu-with-the-jump-flooding-algorithm/
[jfa]: https://www.shadertoy.com/view/4syGWK
[paper_jfa]: https://www.comp.nus.edu.sg/~tants/jfa/i3d06.pdf

## Final Words

Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.
