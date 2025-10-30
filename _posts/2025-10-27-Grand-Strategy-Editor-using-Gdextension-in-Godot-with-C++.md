---
title: Making a Grand Strategy Map Editor Plugin for Godot in C++
date: 2025-10-27 14:10:00 +0200
categories: [Tutorials 📚]
tags: [🎨Graphics, 🔧Engine, Godot, C++, Grand Strategy]
math: true
img_path: /assets/assets-2025-10-27/
image: /assets/assets-2025-10-27/bg.gif
---

In this article I will cover how I implemented the border rendering, and the possible improvements or future work one might be interested in.

The project is open source, you can access the repo by clicking [here](https://github.com/OneBogdan01/gs-map-editor).

## Intro

Border generation grand strategy games may be one of the most interesting subjects that I approached so far. There is parsing to be done and tooling to modify and read the game data, then using shader magic, we get "border gore". The combination between the two makes for a varied challenge. I read a few posts on the online forums:[very_old_epic_thread], [simulating_eu4], [game_dev_exchange] and adventured into the subject with much *zeal*.

I started this project around the time that Paradox was already posting videos with the new content of Europa Universalis 5 (EU5). Below are a few references from Paradox games:

![alt text](/assets/assets-2025-10-27/game_comparison.png)
*From left to right: Europa Universalis 5 (EU5), Victoria 3 and EU4*

> The image from EU4 is using [this](https://steamcommunity.com/sharedfiles/filedetails/?id=253263609&searchtext=) mod.
{: .prompt-info }

I believe the most peculiar aspect is that grand strategy games always have a runtime component: the maps you see above will change drastically over the course of one game and it will differ dramatically between runs. The map itself has a very dynamic appearance, despite the irony of being static once the player presses the "pause" button.

I own Europa Universalis 4, therefore, it is not surprising that it will have similarities with the rightmost render. EU4 uses a `province map` to keep track of each province.

![alt text](/assets/assets-2025-10-27/provinces.bmp)
*Province map from EU4*

### Results from my project

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 112910.png>)
*Country borders and province borders with mask applied*

![alt text](</assets/assets-2025-10-27/Screenshot 2025-10-27 113506.png>)
*No country borders and province borders with mask applied*

Here are a few screenshots more zoomed in, so it is easier to see the limitations of the technique (artifacts):
![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105438.png>)
*Norway*

![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105558.png>)
*Japan*

![text](</assets/assets-2025-10-27/Screenshot 2025-10-07 105332.png>)
*Brazil*

### Runtime demo

<video controls src="/assets/assets-2025-10-27/demo_final.mp4" title="Title"></video>
*Shows how the project would work in a game*

## Gdextension in Godot with C++

GDextension is a way to extend the Godot engine that still allows very easy distribution via their plugin store.

There are a lot of resources on how to work with GDextension that I will link below.
- [documentation on GDextension with C++][gdextension]
- [repo example][repo_example]

>  The repo helped me set my project up with Visual Studio Code which I wanted to learn how to use, as it is faster than Visual Studio
{: .prompt-info }

Suffice to say that, coding in C++ plugins is faster to run, but definitely not faster to write than in GDscript (Godot's scripting language).

Another important aspect is that I am only using compute shaders for generating the `color_lookup` and `color_map` at the beginning of the application. The rest is implemented using `SubViewports` in Godot, which is not the best way to do it, but it allowed me to experiment faster than I could have using compute shaders. 

## Rendering provinces using the paper on Imperator: Rome

There are relatively few resources available online about Grand Strategy games. One that I found very useful is [Optimized Gradient Border Rendering in
Imperator: Rome][intel_paper]. Although the paper's title relates to performance, the prerequisites for optimization outline how to render gradients for the countries.

> The fact that the paper is only explaining the algorithm for **gradients** and does **not** touch the topic of borders is a limitation of the technique I use. I will suggest a vector based approach at the end of the article.
{: .prompt-tip }

![alt text](</assets/assets-2025-10-27/Screenshot 2025-09-22 150426.png>)
*Screenshot from Imperator: Rome*

I will introduce a few terms from the paper, as it makes the explanation easier to grasp:

- `Color Map` is a small texture (256x256) that contains the color that a province should have
- `Color Lookup` is a texture with two channels that contain UV coordinates for the `Color Map`

The `Color Map` can be thought of as an array of colors that are in the same order of the provinces. To illustrate my point, below I show a very zoomed in `color map`.

> Note that, the first pixel is empty to keep it simple. The first province starts from the the second pixel with ID 1.
{: .prompt-info }
![alt text](/assets/assets-2025-10-27/color_map.png)
*Color map with the few first province IDs*

The first few provinces are mapped as follows:

![alt text](/assets/assets-2025-10-27/province_names.png)
*List of province pairs ID - Name, with their country color on the left*

Here the first few provinces are colored blue, since they are owned by Sweden. The 6th province is owned by Denmark, so color reflects that.

To know the initial state of the map, we can parse each of the province files. This is how I formed a database, where each country has a color associated with it and each province is associated with a country.

> I recommend taking a look at the C++ [code](https://github.com/OneBogdan01/gs-map-editor/blob/master/src/source/country_data_io.cpp) I wrote for parsing various data from the files. This post focuses more on the graphics side.
{: .prompt-tip }

There is a lot of gameplay related information, however, just to render a simple political map, we only need to find the token "owner=". There we will find a 3 letter ID. Here you can see SWE, which is the short name for Sweden.

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

Historically, this technique was first used for font rendering, to maintain crisp UI elements. However, we are using it to create a border, as well as a gradient between country colors. Therefore, the code needs to be adapted accordingly. Below is the simplest (and slowest) shader code:

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

The output is pixelated. While for pixel art styles this might be good enough, most developers would need a smoother result for making their maps exactly how they want. Feel free to skip to the [upscaling chapter](#upscaling-using-hqx-shaders), if you don't need a faster SDF generation.

### How to not do the Jump Flood Algorithm

JFA has a complexity of O(log n). It is useful in the context of a simulated environment where each country is fighting wars, their provinces changing several times a frame. In other, words, you can safely skip this part. The JFA itself is quite simple to implement, however, I think it is worth spending some time to understand it thoroughly. [Ben Golus][wide_outlines] has an article exploring the performance of this algorithm for outlines on 3D models. I will not explain the algorithm, since there are plenty of resources:

- [shadertoy][jfa]
- [article on voronoi diagrams and distance field][jfa_blog]: <https://blog.demofox.org/2016/02/29/fast-voronoi-diagrams-and-distance-dield-textures-on-the-gpu-with-the-jump-flooding-algorithm/>]
- [paper on jfa][paper_jfa]

Below I did a quick experiment in Godot using [SubViewports][subviewport] which can be thought of as `Render Textures` from other engines.

<video controls src="/assets/assets-2025-10-27/nyan.mp4" title="Title"></video>
*Nyan cat outline with the Jump Flood Algorithm*

A problem I encountered here is twofold:

- `SubViewports` provide less flexibility for the programmer compared to a compute shader. They are very easy to test and can be run from the editor. However, I believe it is safer to implement the algorithm in compute shaders at least in the Godot engine (version 4.4).
- Earlier I mentioned that the paper explains how to create the gradients, not the borders. However, the JFA algorithm needs a "seed" image with the borders. I was unable to use the previously mentioned approach to create good enough results. The naive approach detects if a pixel is a border by checking the color of neighboring pixels.

I believe that using compute shaders or calculating the borders using a vector based approach might yield good results.

## Upscaling using HQX shaders

The HQX shader is used to make the image look like it is at a higher resolution. It has been been implemented in godot [here](https://github.com/Thomas-Holtvedt/opengs/blob/8a86111d108fe3bcaef8c827529978e84ff8131c/map/shaders/map3d.gdshader) or in [Unreal Engine](https://www.youtube.com/watch?v=VjfHYfNEA_w)(check the description of the video for the code). You can check the [shadertoy][hqx_shader] to have an interactive experience with the shader.

![alt text](/assets/assets-2025-10-27/upscaled.png)
*Upscaled result using HQX*

Clearly, this approach is not perfect, especially when the camera is zoomed enough you can clearly see artifacts:
![alt text](/assets/assets-2025-10-27/artifacts.png)
*Upscaling artifacts*

However, this might be fine for a wide range of applications that involve looking at a grand strategy map from a medium distance.

### Future work: vector based borders

I will warn you from the start, that I have not implemented this technique yet. EU4 might use something similar, and it is known for a fact that they generate meshes for some of the borders they display, along with the vector style borders between provinces that are owned by the same country:

![alt text](/assets/assets-2025-10-27/eu4_borders.png)
*EU4 creates border meshes with its province neighbors*

[oikoumene][svg_repo_eu4] is an open source project using Scala, that generates an impressive looking map as a `.svg`! They have a [page](https://github.com/primislas/eu4-svg-map/tree/bddacf30b46761a9635aee3ed49d19805c0d0f34/docs/pages) dedicated to the explanation of the algorithm they use. The gist of the approach is to use the `province map` that we saw earlier to create the shape of the borders by tracing the border segments in various passes.

![alt text](/assets/assets-2025-10-27/banner.png)
*SVG from oikoumene samples*

![alt text](/assets/assets-2025-10-27/zoomedin.png)
*Original province map, approximately the same region as the screenshot below*

![alt text](/assets/assets-2025-10-27/curves.png)
*Province borders from oikoumene*

I think this approach looks amazing and I will keep you updated when I finally have a similar project as the one above. The JFA algorithm would also benefit, resulting in a much better SDF output for the map gradients.

## References

[Source code](https://github.com/OneBogdan01/gs-map-editor)

### Papers

[Intel Paper - Optimized Gradient Border Rendering in Imperator: Rome][intel_paper]
[Valve SDF Paper - Improved Alpha-Tested Magnification for Vector Textures][sdf]
[Jump Flooding Algorithm Paper][paper_jfa]

### Blog Posts & Articles

[Simulating the EU4 Map in the Browser with WebGL][simulating_eu4]

[The Quest for Very Wide Outlines][wide_outlines]

[Fast Voronoi Diagrams and Distance Field Textures on the GPU With the Jump Flooding Algorithm][jfa_blog]

### Code Examples & Demos

[HQX Shader (Shadertoy)][hqx_shader]

[JFA (Shadertoy)][jfa]

[EU4 SVG Map Repository (GitHub)][svg_repo_eu4]

### Forums

[Unreal Engine Forum - Borders Like Paradox Grand Strategy Game][very_old_epic_thread]

[Game Dev Stack Exchange - Answer on Border Rendering][game_dev_exchange]

### Documentation

[Godot - Using Viewport as Texture][subviewport]

[intel_paper]: https://www.intel.com/content/dam/develop/external/us/en/documents/optimized-gradient-border-rendering-in-imperator-rome.pdf
[sdf]: https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf
[svg_repo_eu4]: https://github.com/primislas/eu4-svg-map
[simulating_eu4]: https://nickb.dev/blog/simulating-the-eu4-map-in-the-browser-with-webgl/
[hqx_shader]: https://www.shadertoy.com/view/tsdcRM
[very_old_epic_thread]: https://forums.unrealengine.com/t/borders-like-paradox-grand-strategy-game/763968
[wide_outlines]: https://bgolus.medium.com/the-quest-for-very-wide-outlines-ba82ed442cd9
[game_dev_exchange]: https://gamedev.stackexchange.com/a/213105
[subviewport]: https://docs.godotengine.org/en/stable/tutorials/shaders/using_viewport_as_texture.html
[jfa_blog]: https://blog.demofox.org/2016/02/29/fast-voronoi-diagrams-and-distance-dield-textures-on-the-gpu-with-the-jump-flooding-algorithm/]

[jfa]: https://www.shadertoy.com/view/4syGWK
[paper_jfa]: https://www.comp.nus.edu.sg/~tants/jfa/i3d06.pdf
[gdextension]: https://docs.godotengine.org/en/stable/tutorials/scripting/cpp/gdextension_cpp_example.html
[repo_example]: https://github.com/paddy-exe/GDExtensionSummator
## Final Words

I made this article based on a self study project I did as a third year programmer at Breda University of Applied Sciences for the Creative Media and Game Technologies bachelor.
Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.
