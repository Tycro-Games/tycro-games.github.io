---
layout: page
icon: fas fa-info-circle
order: 1
---
<style>
.about-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
.about-content {
  flex: 1;
  min-width: 0;
}
.about-sidebar {
  flex: 0 0 300px;
  position: sticky;
  top: 2rem;
}
.passion-photo {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.passion-photo img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}
.passion-caption {
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 0.5rem;
  font-style: italic;
  text-align: center;
}
.skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin: 2rem 0;
  justify-content: center;
}
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 4.5rem;
}
.skill-item i {
  font-size: 4rem;
  color: var(--text-muted-color);
}
.skill-item .skill-icon {
  width: 4rem;
  height: 4rem;
  display: block;
  pointer-events: none;
}
.skill-item span {
  font-size: 0.85rem;
  color: var(--text-muted-color);
}
@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
  }
  .about-sidebar {
    flex: 1;
    width: 100%;
    position: static;
  }
}
.skill-icon-light {
  filter: invert(1);
}
</style>
<div class="about-container">
<div class="about-content" markdown="1">

Hello! I'm **Bogdan Mocanu**, a game programming student at **[Breda University of Applied Sciences](https://www.buas.nl/en/programmes/creative-media-and-game-technologies/programming#courses)** working towards becoming an engine programmer. I mainly work with **C++** and have worked on cross platform custom engines targeting PC and consoles as part of my university projects. I also have experience with **Unity**, **Unreal Engine** and **Godot**.

I have been fascinated from a young age by how Spore, Civilization and Command & Conquer create expansive virtual worlds governed by their own strange rules. I started tinkering in **Unity** before university, but I've come to believe that building custom technology teaches things no existing engine can. In my free time I explore **low-level systems**, **engine architecture**, **simulations** and **optimization techniques** in my own engine, [Hammered](https://github.com/OneBogdan01/hammered-engine).

Beyond building games, I care a lot about **collaboration** among game developers. I have worked in teams of up to 16 people on custom engines, and I find that working together on games is a much more nuanced and challenging endeavour than simply making them. Even when a project isn't exactly what I would pick for myself, being a dependable part of the team, looking for ways to improve the workflow for others and finding opportunities to contribute are things that I value greatly.

<div class="skills-row" markdown="0">
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" class="skill-icon" alt="C++">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg" class="skill-icon" alt="CMake">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg" class="skill-icon" alt="Visual Studio">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" class="skill-icon skill-icon-light" alt="GitHub">
  </div>
  <div class="skill-item">
    <img src="/assets/img/icons/perforce.png" class="skill-icon" alt="Perforce">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-plain.svg" class="skill-icon skill-icon-light" alt="Unity">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg" class="skill-icon skill-icon-light" alt="Unreal Engine">
  </div>
  <div class="skill-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg" class="skill-icon" alt="Godot">
  </div>
</div>

### Outside of "work"

- I am practicing **calisthenics** exercises with emphasis on **gymnastic skills** on the rings
- I play **Paradox**, **indie** and **strategy** **games**; my favorite game of all time is **Europa Universalis 4** *with 1000h+*
- Every time I return to my home country, I **bake** at least one **pizza** from scratch with my childhood friend

---

### You can find me
**Email:** [bogdan.game.development@gmail.com](mailto:bogdan.game.development@gmail.com)  
**LinkedIn:** [linkedin.com/in/bogdan-mocanu](https://www.linkedin.com/in/bogdan-mocanu-8234581b1/)  
**GitHub:** [github.com/OneBogdan01](https://github.com/OneBogdan01)  
**Itch.io:** [tycro-games.itch.io](https://tycro-games.itch.io/)

---

*Currently seeking programming internships with a focus on engine, tools or low-level systems. Available from Summer 2026.*

</div>
</div>