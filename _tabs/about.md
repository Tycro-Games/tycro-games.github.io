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
</style>

<div class="about-container">
<div class="about-content" markdown="1">

Hello! I'm **Bogdan Mocanu**, a game programming student at **Breda University of Applied Sciences**. I am working towards becoming an engine programmer, focusing on **graphics programming** at the moment. To me, game programming is a constant challenge of learning and collaborating with other passionate developers. I do not see it as "work", but a wide subject where I can keep discovering.

### Outside of "work"

- I am building my **own game engine** to explore low-level systems and graphics techniques
- I am learning **game design** by making games on my own
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

*Currently seeking programming internships with a focus on engine, tools, graphics or low-level systems. Available from Summer 2026.*

<!-- </div>

<div class="about-sidebar">
  <div class="passion-photo">
    <img src="/assets/eu4.png" alt="Europa Universalis 4 gameplay">
    <p class="passion-caption">Campaign for the Holy Horde with the Teutonic Order</p>
  </div>
  
  <div class="passion-photo">
    <img src="/assets/calisthenics.jpg" alt="Calisthenics training">
    <p class="passion-caption">Gymnastic rings training</p>
  </div>
  
  <div class="passion-photo">
    <img src="/assets/pizza.jpg" alt="Homemade pizza">
    <p class="passion-caption">Fresh homemade pizza</p>
  </div>
</div>

</div> -->