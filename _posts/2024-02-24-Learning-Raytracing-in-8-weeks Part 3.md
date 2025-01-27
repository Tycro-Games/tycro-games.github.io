---
title: Learning-Raytracing-in-8-weeks | Transforming voxel volumes | Part 3
date: 2024-03-24 14:10:00 +0200
categories: [Learning 📚, Log 📖, Raytracing 🌐]
tags: [blog 📝, programming 💻, c++, raytracing 🌟, graphics 🎨, voxels 🔳]
math: true
img_path: /assets/assets-2024-03-24/
---

# Intro
Hello, this is the second article of an 8 part series where I write down what I've learned about Raytracing on the CPU with voxels (which is of course in C++). I have used [this](https://github.com/jbikker/voxpopuli) template to which I have added features and refactored over the span of the 8 weeks.
Here is the overview:
- [Part 1 Area Lights](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-1/)
- [Part 2 Glass](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-2/)
- [Part 3 Transforms](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-3/)
- [Part 4 Smoke](https://tycro-games.github.io/posts/Learning-Raytracing-in-8-weeks-Part-4/)

You can see the repo of my raytracer [here](https://github.com/Tycro-Games/Raytracer-VoxPopuli).

## Ray tracing in world space
The template we have received for this project uses a world space camera that shoots rays that have their origin and direction expressed in world space. In ray tracing this is completely fine, however in rasterization, I am not so sure anymore. Here is what adding a voxel volume of arbitrary resolution looks like, defined by the two vectors: **(0, 0, 0)** and **(1, 1, 1)**.

![01 cube]({{ page.img_path }}BoundsVolume.png)

If we move the camera, everything still works properly, but what if we wanted to **translate, rotate or scale** this volume?

## Transforming the ray, not the volume
Let's start from the top and solve the issues as we go deeper and deeper. When we enter our basic **Trace** function we can think of it in the following way:

```cpp
float3 Renderer::Trace(Ray& ray, int depth)
{
	//we are done with this ray
	if (depth < 0)
	{
		return {0};
	}
	//find nearest intersection point with an entity
	FindNearest(ray);


	//hit the sky
	if (ray.indexMaterial == MaterialType::NONE)
	{
		return SampleSky(ray.D);
	}



	//figure out which material we are dealing with
	switch (ray.indexMaterial)
	{
		//material calculations
	}
}
```
> Keep in mind that I am simplyfing the code by only assuming you have one voxel object.
{: .prompt-tip }

An implementation for the voxel volume traversal is something like this:
```cpp

void Scene::FindNearest(Ray& ray) const
{
	// setup Amanatides & Woo grid traversal
	DDAState s;
	//did we even hit the big cube that makes up the volume?
	//also prepare the right t value for the traversal if we did hit the cube
	if (!Setup3DDDA(ray, s))
	{
		return;
	}
	// start stepping, make sure it is the nearest hit
	while (s.t < ray.t)
	{

		const MaterialType::MatType cell = grid[GetVoxel(s.X, s.Y, s.Z)];
		//the closest non empty voxel
		if (cell != MaterialType::NONE && s.t < ray.t)
		{
			//save the distance
			ray.t = s.t;
			//do not worry yet about this part
			ray.rayNormal = ray.GetNormalVoxel(WORLDSIZE, matrix);
			//get the material
			ray.indexMaterial = cell;
			return;
		}
		//just stepping
		if (s.tmax.x < s.tmax.y)
		{
			if (s.tmax.x < s.tmax.z)
			{
				s.t = s.tmax.x, s.X += s.step.x;
				if (s.X >= GRIDSIZE) break;
				s.tmax.x += s.tdelta.x;
			}
			else
			{
				s.t = s.tmax.z, s.Z += s.step.z;
				if (s.Z >= GRIDSIZE) break;
				s.tmax.z += s.tdelta.z;
			}
		}
		else
		{
			if (s.tmax.y < s.tmax.z)
			{
				s.t = s.tmax.y, s.Y += s.step.y;
				if (s.Y >= GRIDSIZE) break;
				s.tmax.y += s.tdelta.y;
			}
			else
			{
				s.t = s.tmax.z, s.Z += s.step.z;
				if (s.Z >= GRIDSIZE) break;
				s.tmax.z += s.tdelta.z;
			}
		}
	}
	//missed
}
```
We can go even deeper, in the ***Setup3DDDA***, are the first modifications we need to make. (if you want to look at the original version click [here](https://github.com/jbikker/voxpopuli/blob/18c19bc58532857cf4cfa6ddcd9231a24237d193/template/scene.cpp#L83C1-L103C2))

```cpp
bool Scene::Setup3DDDA(Ray& ray, DDAState& state) const
{
	// if ray is not inside the world: advance until it is
	state.t = 0;
	if (!cube.Contains(ray.O))
	{
		//get the intersecting t
		state.t = cube.Intersect(ray);
		//complete miss, return
		if (state.t > 1e33f)
		{
			return false;
		}
	}
	//expressed in world space, the bounds of the object
	const float3 voxelMinBounds = cube.b[0];
	const float3 voxelMaxBounds = cube.b[1] - cube.b[0];
	//the voxel resolution as a float
	const auto gridsizeFloat = static_cast<float>(GRIDSIZE);
	const float cellSize = 1.0f / gridsizeFloat;
	//some maths I do not want to bother to understand again
	//assume they just convert correctly, from world space to volume space
	state.step = make_int3(1 - ray.Dsign * 2);

	const float3 posInGrid = gridsizeFloat * ((ray.O - voxelMinBounds) + (state.t + 0.00005f) * ray.D) /
		voxelMaxBounds;
	const float3 gridPlanes = (ceilf(posInGrid) - ray.Dsign) * cellSize;
	const int3 P = clamp(make_int3(posInGrid), 0, GRIDSIZE - 1);
	//setting the values for the traversal here
	state.X = P.x, state.Y = P.y, state.Z = P.z;
	state.tdelta = cellSize * float3(state.step) * ray.rD;
	state.tmax = ((gridPlanes * voxelMaxBounds) - (ray.O - voxelMinBounds)) * ray.rD;

	return true;
}
```
This code can work with any bounds now, not just the original which always assumed the bounds (0,0,0) and (1,1,1). It is also important to keep in mind that now you could have different resolutions per volume. However, this method is lacking rotations. I thought it will still be valuable in case you do not need rotations.
Another way to solve this (a more complete way), is to move the ray, not the voxel. Every object could then be at the default 0 and 1 bounds, with their own matrices that will define their position, scale and rotation. The ray will need the inverse matrix of the volume to get the correct result. Here is some code that shows this concept:
```cpp
//create a backup
Ray backupRay = ray;

//we can get the inverse matrix from the volume
mat4 invMat = voxelVolume.invMatrix;
//we are transforming the origin
ray.O = TransformPosition(ray.O, invMat);

//we are transforming the direction

ray.D = TransformVector(ray.D, invMat);
//reciprocal is used for the traversal setup as we have seen earlier
ray.rD = float3(1 / ray.D.x, 1 / ray.D.y, 1 / ray.D.z);
//also used there
ray.Dsign = ray.ComputeDsign(ray.D);

//go on with the traversal as usual
voxelVolume.FindNearest(ray);
//keep the t value from the traversal!
backupRay.t = ray.t;
//copy the old data back
backupRay.CopyToPrevRay(ray);
```
As easy as it gets, there are still some build-in functions that I call here I did not explain. It would be best if you looked into the implementations from the template directly, [here](https://github.com/jbikker/voxpopuli/blob/main/template/tmpl8math.cpp). To compute the Dsign correctly I did some bit magic, because it is a bit faster than copysign:
```cpp
float3 Ray::ComputeDsign(const float3& _D)
{
	const uint x_sign = (*(uint*)&_D.x >> 31);
	const uint y_sign = (*(uint*)&_D.y >> 31);
	const uint z_sign = (*(uint*)&_D.z >> 31);

	return (float3(static_cast<float>(x_sign) * 2 - 1, static_cast<float>(y_sign) * 2 - 1,
	               static_cast<float>(z_sign) * 2 - 1) + 1) * 0.5f;
}
```
## Setting the inverse matrix

```cpp
void Scene::SetTransform(const float3& _rotation)
{
	//center cube
	const float3 centerCube = (cube.b[0] + cube.b[1]) * 0.5f;
	// Translate the object to the pivot point (center of the cube)
	const mat4 translateToPivot = mat4::Translate(centerCube + position);

	// Translate back to the original position after rotation
	const mat4 translateBack = mat4::Translate(-centerCube);

	// Scale the object
	const mat4 _scale = mat4::Scale(this->scale);

	// Rotate the object around the pivot point
	const mat4 rot = mat4::RotateX(rotation.x) * mat4::RotateY(rotation.y) * mat4::RotateZ(rotation.z);
	// Calculate  transformation matrix, suprise!
	matrix = translateToPivot * _scale * rot * translateBack;
	// Calculate  inverse transformation matrix
	invMatrix = matrix.Inverted();
}
```
Without considering the rotation parameter, this code is quite self-explanatory. We concatenate all these matrices into one and then get the inverse of that. I have not talked yet about calculating the matrix, but the inverse. Do not worry, the next chapter explains how we are going to use the actual matrix.

## Getting the "right" normals
We got the inverse matrices transforming the ray and we are blessed with the following normals:
![normals worng]({{ page.img_path }}wrongNormals.png)



I will be delighted to see your own renders at this point. I do not remember what I did to get normals that are so broken, but feel free to send yours to my email down below.

What is going so wrong is that the normals are still in object space. Going back to our traversal, our ray is still transformed with the inverse of the volume when we compute the normal, the solution, as you have probably have seen from earlier, is to transform the normal back with the matrix:
```cpp
float3 Ray::GetNormalVoxel(const uint32_t worldSize, const mat4& matrix) const
{
	// Calculate the intersection point
	const float3 I1 = IntersectionPoint() * static_cast<float>(worldSize);

	// Calculate fractional part of I1
	const float3 fG = fracf(I1);

	// Calculate distances to boundaries                                              
	const float3 d = min3(fG, 1.0f - fG);
	const float mind = min(min(d.x, d.y), d.z);

	// Calculate signs
	const float3 sign = Dsign * 2 - 1;

	// Determine the normal based on the minimum distance
	float3 normal = float3(mind == d.x ? sign.x : 0.0f, mind == d.y ? sign.y : 0.0f, mind == d.z ? sign.z : 0.0f);


	// Transform the normal from object space to world space
	//normalization fixes scaling issues
	normal = normalize(TransformVector(normal, matrix));


	return normal;
}
```
The nicest part about this code is that it is nearly identical to the [original](https://github.com/jbikker/voxpopuli/blob/18c19bc58532857cf4cfa6ddcd9231a24237d193/template/scene.cpp#L3-L15). We are just transforming the normal with the matrix and normalizing the result.

## Transform away
![rotate]({{ page.img_path }}Rotations.gif)

---




Thanks for reading my article. If you have any feedback or questions, please feel free to email me at bogdan.game.development@gmail.com. 

![alt text](../assets/portfolio/logo.png)