---
title: Learning-Raytracing-in-8-weeks | Glass made out of voxels | Part 2
date: 2024-02-24 14:10:00 +0200
categories: [Learning, Log, Raytracing]
tags: [blog, programming, c++, raytracing, graphics, voxels]
math: true
img_path: /assets/assets-2024-03-02
---
# Intro
Hello, this is the second article of an 8 part series where I write down what I've learned about Raytracing on the CPU with voxels (which is of course in C++). I have used [this](https://github.com/jbikker/voxpopuli) template that I have added features and refactored over the span of the 8 weeks.

You can see the repo of my raytracer [here](https://github.com/Tycro-Games/Raytracer-VoxPopuli).

## Glass in a raytracer
![sphere of voxels](sphereOfVoxels.png)
_A sphere of glass made out of voxels_

Glass has been done many times in most real raytracers. You can even find a great explanation along with some code that does the trick from the Peter Shirley's notorious tutorial, [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics). 

Glass, or more generally a dialectric material has some interesting properties. Its behavior could be split into two parts for the sake of simplicity: refraction and reflection.




## Refraction in a cube of glass
I am going to start simple by only doing refraction. There is an equation that dictates what happens when light enters a medium that has a different index of refraction. Pure materials or trasnparent such as air, water, diamonds and glass are interacting with light based on their index of refraction which I am going to refer as IOR from now on. The IOR defined that material, for instance, air has IOR of 1, water 1.3, glass, 1.4 to 1.8 and so on. Computing a refracted ray is quite easy after you translate Snell's law into code.

$$
n_1 \sin(\theta_1) = n_2 \sin(\theta_2)
$$

$$
\begin{align*}
&\text{Legend:} \\
&- n_1: \text{Index of refraction of the medium the incident ray is traveling through.} \\
&- \theta_1: \text{Angle of incidence.} \\
&- n_2: \text{Index of refraction of the medium the refracted ray enters.} \\
&- \theta_2: \text{Angle of refraction.}
\end{align*}
$$

This is still far from the down to earth float3 structs that we use to represent vectors in code, but deriving from the base formula we get this code:
```cpp
//based on Raytracing in one Weekend
float3 Renderer::Refract(const float3 direction, const float3 normal, const float IORRatio)
{
	const float cosTheta = min(dot(-direction, normal), 1.0f);
	const float3 rPer = IORRatio * (direction + cosTheta * normal);
	const float3 rPar = -sqrtf(fabsf(1.0f - sqrLength(rPer))) * normal;
	return rPer + rPar;
}
```
I will skip the explanation of how to get there as you can find it quite easily in Ray Tracing in One Weekend.

For further reading, I found an interesting course [presentation](https://cseweb.ucsd.edu/classes/sp17/cse168-a/CSE168_03_Fresnel.pdf) that has a lot of good information on this topic. 

## How we traverse voxels
The algorithm I have in my project is based on [this](http://www.cse.yorku.ca/~amana/research/grid.pdf) paper that describes the algorithm. The TLDR version is that when we shoot a ray we check if it missed the whole voxel volume, if we did not we are going to increment the distance exactly to the next voxel until we get outside the voxel volume or hit a non-empty one. 

This image is from a nice video explaining this traversal, you can find that video [here](https://www.youtube.com/watch?v=gXSHtBZFxEI).

![Voxel explanation](voxelExplanation.png)

## Some code at last

At the most basic, we need to refract in and out of the material, do this we need to figure out if we are, well, inside the voxel, or outside. We are going to store that information in the ray and then assign the IOR ratio based on that. The angle of refraction is going to depend on the IOR ratio which is the IOR of the environment we are going, in this case, air (1.0), and the environment we are going in, glass (1.45). Keeping track where we are is quite simple at this point,
as we can only refract into the glass voxel, and then refract again outside of the voxel. When we are inside of the glass, we need to get to the next non-glass voxel, that is what the "FindMaterialExit" is doing.
```cpp
float3 color{1};
//code for glass
bool isInGlass = ray.isInsideGlass;
float IORMaterial = ray.GetRefractivity(mainScene); // defaults to 1.45
//get the IOR based if the ray is inside or outside the glass
float refractionRatio = isInGlass ? IORMaterial : 1.0f / IORMaterial;
//we need to get to the next voxel
if (isInGlass)
{
	//add color of the glass, maybe expand with Beer Law
	color = ray.GetAlbedo(mainScene);
	//gets to the next non-glass voxel
	mainScene.FindMaterialExit(ray, MaterialType::GLASS);
}

float3 resultingDirection = Refract(ray.D, normal, refractionRatio);
//this is an implementation from Raytracing gems chapter 6: https://www.realtimerendering.com/raytracinggems/unofficial_RayTracingGems_v1.9.pdf
//this computes the origin of an ray assuring that it is not self-intersecting
float3 originDirection = OffsetRay(ray.IntersectionPoint(), -normal);
//we are exiting or entering the glass


isInGlass = !isInGlass;
//we need to create a new ray that starts a bit outside or inside the dialectric voxel
newRay = {originDirection, resultingDirection};
newRay.isInsideGlass = isInGlass;
return Trace(newRay, depth - 1) * color;
```

This is what we are doing:
![drawing](drawing.png)
Observe how the beam of light bends in the environment and then rotates to the same angle as it was before we got there. By using the other IOR ratio on the refracted ray inside we get the previos entering ray.

![sphere vox](refractOnly.png)
_A refract only sphere of voxel_


## Getting reflections

In real life glass also reflects light, so we would like our voxel sphere to also reflect:

![sphere vox](reflectingLight.png)

---


Thanks for reading my article. If you have any feedback or questions, please feel free to share them in the comments or email me at bogdan.game.development@gmail.com. 







code for reference
```cpp

	{
		float3 color{1};
		//code for glass
		bool isInGlass = ray.isInsideGlass;
		float IORMaterial = ray.GetRefractivity(mainScene); //1.45
		//get the IOR
		float refractionRatio = isInGlass ? IORMaterial : 1.0f / IORMaterial;
		bool isInsideVolume = true;
		//we need to get to the next voxel
		if (isInGlass)
		{
			color = ray.GetAlbedo(mainScene);

			isInsideVolume = mainScene.FindMaterialExit(ray, MaterialType::GLASS);
		}
		//outside bounds
		if (!isInsideVolume)
			return skyDome.SampleSky(ray);

		float cosTheta = min(dot(-ray.D, ray.GetNormal()), 1.0f);
		float sinTheta = sqrtf(1.0f - cosTheta * cosTheta);

		bool cannotRefract = refractionRatio * sinTheta > 1.0;

		float3 resultingDirection;

		//this may be negative if we refract
		float3 resultingNormal;
		if (cannotRefract || SchlickReflectance(cosTheta, refractionRatio) > RandomFloat())
		{
			//reflect!
			resultingDirection = Reflect(ray.D, normal);
			resultingNormal = normal;
		}
		else
		{
			//we are exiting or entering the glass
			resultingDirection = Refract(ray.D, normal, refractionRatio);
			isInGlass = !isInGlass;
			resultingNormal = -normal;
		}
		newRay = {OffsetRay(ray.IntersectionPoint(), resultingNormal), resultingDirection};
		newRay.isInsideGlass = isInGlass;
		return Trace(newRay, depth - 1) * color;
	}
	```








