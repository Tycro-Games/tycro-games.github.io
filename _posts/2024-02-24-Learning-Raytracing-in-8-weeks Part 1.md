---
title: Learning-Raytracing-in-8-weeks | Area Lights | Part 1
date: 2024-02-24 14:10:00 +0200
categories: [Learning, Log, Raytracing]
tags: [blog, programming, c++, raytracing, graphics, voxels]
math: true
img_path: /assets/assets-2024-02-24
---
# Simple Area lights
Hello, this is the first part of this 8 part series where I write down what I have learned in my journey learning about Raytracing on the CPU with voxels (which is of course in C++). 
![State of my raytracer](RaytracerSoftShadows.png)
## The humble Point Light
The first step towards implementing an area light is starting with something that is a bit easier. In this context, Point Lights are the perfect candidate. We cast a ray towards a voxel, if we hopefully hit something, we need to answer the binary question, are we in shadow or not?
![drawing](MyDrawingLight.png)

---

### We are in light
We can cast a shadow ray from the intersection point of the primary source towards our point light. A point light can be thought of as a position with a defined color. One function that illustrates this concept could look like this:
```cpp
float3 Renderer::PointLightEvaluate(Ray& ray, Scene& scene, PointLightData lightData)
{
	//Getting the intersection point
	const float3 intersectionPoint = ray.O + ray.t * ray.D;
	const float3 dir = lightData.position - intersectionPoint;
	const float dst = length(dir);
	const float3 dirNormalized = dir / dst;

	const float3 normal = ray.GetNormal();
	//Having a negative dot product means the light is behind the point
	const float cosTheta = dot(dirNormalized, normal);
	if (cosTheta <= 0)
		return 0;
	//the formula for distance attenuation 
	const float3 lightIntensity = max(0.0f, cosTheta) * lightData.color / (dst * dst);
	//materi
	float3 originRay = OffsetRay(intersectionPoint, normal);
	const float3 k = ray.GetAlbedo(scene);

	Ray shadowRay(originRay, dirNormalized);
	// we do not shoot the ray behind the light source
	shadowRay.t = dst;
	if (scene.IsOccluded(shadowRay))
		return 0;


	return lightIntensity * k;
}
```
I will walk you through the code, but first, let's see how it look:
![Hard shadows](hardShadows.png)
As you can see this code results in some hard shadows, the result of our "yes" or "no" answer to the shadow question.
After we get all the common variables, such as the normal, intersection point for our hit, as well as the distance and direction to the point light we compute the lambertian cosine law which states that the intensity of light reflected off a surface is proportional to the cosine of the angle between the incident light and the surface normal, or in this case the dot product, because it is the same thing.


---


$$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}| \cdot |\mathbf{b}| \cdot \cos(\theta)$$


---


That means that in code we multiply the cosine between the normal of the point and the direction to the point light with the color of the light. We also need to divide by the distance squared, this is known as distance attenuation.

```cpp
	const float3 lightIntensity = max(0.0f, cosTheta) * lightData.color / (dst * dst);
```

All that is left is to construct a shadow ray and check if it occluded or not, in other words, if there is something between our point and the light. If it is then we are in shadow, if not we multiply by the color of the object and the light intensity based on the previous formula.
![block](blocksRay.png)

 In case you want a more detailed walkthough over how point lights are defined ogldev has a more in depth tutorial [here](https://ogldev.org/www/tutorial20/tutorial20.html).


## How can we approximate a sphere
I am quite new to raytracing, but the simplest approach to adding an area light is to have an imaginary sphere that is light source. The idea is very similar to our point light, while an area light shares a color and a position it is different by having a volume, for instance a sphere that irradiades light.

 Let's consider a simple approach for a random point on the sphere we are going to shoot a shadow ray. Repeat this process for a certain number of times and add up the total light intensity like we did with the point light. Finally, we can divide by the total number of shadow rays that we fired and we end up with a pretty good approximation. This is how a version of this in code might look like:

```cpp

float3 Renderer::AreaLightEvaluation(Ray& ray, Scene& scene, SphereAreaLightData lightData)
{

	//the same as before, we get all the needed variables


	//we check the shadow for a number of points and then average by the sample count
	for (int i = 0; i < numberOfSamples; i++)
	{
		float3 randomPoint = RandomDirection();

		randomPoint *= radius;
		randomPoint += center;

		const float3 dir = randomPoint - intersectionPoint;
		const float dst = length(dir);
		const float3 dirNormalized = dir / dst;
		const float cosTheta = dot(dirNormalized, normal);

//learn more about how this works here:
//https://www.physicsforums.com/threads/luminance-of-a-lambertian-sphere-formula.449703/
		const float3 lightIntensity = max(0.0f, cosTheta) * lightData.color /  (radius * radius) * PI;


		if (cosTheta <= 0)
		{
			continue;
		}

		Ray shadowRay(point, dirNormalized);
		shadowRay.t = dst;
		if (scene.IsOccluded(shadowRay))
			continue;
		incomingLight += lightIntensity;
	}
	incomingLight /= static_cast<float>(numberOfSamples);


	return incomingLight * k;
}
```

In practice this is going to look quite noise, but using an accumulator, we are going to get a better image over time.
![soft shadows](SoftShadows.png)
_We have soft shadows now!_

## What are we actually doing?
Formally, what we have done might be defined in the following way:

$$
\int_{\Omega} L(\mathbf{x}, \omega) \cos(\theta) \, d\omega \approx \frac{1}{N} \sum_{i=1}^{N} \frac{L(\mathbf{x}, \omega_i) \cos(\theta_i)}{p(\omega_i)}
$$

$$
\begin{align*}
&\text{Legend:} \\
&- \Omega: \text{Solid angle subtended by the area light sphere.} \\
&- L(\mathbf{x}, \omega): \text{Radiance of the area light at point } \mathbf{x} \text{ in direction } \omega. \\
&- \theta: \text{Angle between the surface normal and the direction vector.} \\
&- \omega: \text{Direction vector.} \\
&- p(\omega): \text{Probability density function for sampling directions } \omega. \\
&- N: \text{Number of Monte Carlo samples.}
\end{align*}
$$

_I hope the legend is helpful_

At first, this seems daunting, however, in computer graphics, we do not solve integrals analytically (most of the time I suppose), but we are trying to solve them numerically. In other words, we try to approximate until we get a solution that is very close to the truth. This is why we got so much noise in the image; over time, we would get less and less noise.
For a much better explanation of this topic, you can click on [this](https://jacco.ompf2.com/2019/12/11/probability-theory-for-physically-based-rendering/) article.


---

Thanks for reading my short article. If you have any feedback or questions, please feel free to share them in the comments or email me at bogdan.game.development@gmail.com. 













