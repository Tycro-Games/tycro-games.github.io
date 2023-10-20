---
title: Starting a new Game Engine
date: 2023-10-19 14:10:00 +0200
categories: [Game Engines]
tags: [blog, engine, programming, grand-strategy]
---
# Who am I?
Hello there! As I am writing this I am a programmer in year 1 of university with a bit of too much hope for this project. I have used in the past Unity3D and made quite a few games with it, but other then that I am just learning how to use C++ to build games without an engine.

---

# Why grand strategy?
I have always wanted to offer open source tools to my fellow game developers. One such tool is a game engine in the grand strategy scene, one that is still relatively niche to the other bigger genres. I have decided that this will be my long term project which I will never manage to complete on my own, especially when I am against a studio as big as paradox games which is the major player in the grand strategy genre with the Clausewitz engine. Below you can see how one map of such a game looks like, of course the map is bigger then this, and it does not have to look like Earth.
![Image with the the clausewitzengine](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frepository-images.githubusercontent.com%2F42066014%2F99803377-0620-4b81-8df5-bc3b8b11bc07&f=1&nofb=1&ipt=7f4cf6261090c4a9841e6f023dccfda98f2b81ff5a2b6f4e261d6cad6a9ee019&ipo=images)  

---

# Developing an engine organically
What I plan to do is not to make an engine from scratch with all the possible features, because that would be a mess and I would code to expectations instead of reality. Making a few games (grand strategy) seems much more interesting and enjoyable for me. The code used would be repurposed into an engine over time which of course is going to be open source.  
> I already made a repository for the project on github which you can find [here](https://github.com/Tycro-Games/OPB-engine).

 Time and iteration are the best way to develop something as complicated as a game engine, so I will need game designers, fellow programmers and artists that would partake in this lofty endeavor.

For our first game I would like to make finish it into about 1 month (not starting at the time I post this) with the modest scope of making a simple war game. The mechanics would consist of:

- Managing supply lines
- Army recruitment
- Fighting system

# Last considerations
Before I dive in into this game dev "crusade" I am not sure which language to build this engine with. There are many options, but let's list the features I think the engine will have and why I think they are important:
- Really easy and flexible to use (this is where choosing a language comes in)
- Multithreading (is a must because of the simulations involved with grand strategy)
- Moddable (is a must because of the community that will form around the engine)
  - Easy to use by non-programmers: (so iteration is fast and easy for everyone)
    - adding UI elements
    - creating and editing the map
    - adding new mechanics by the design
    - sounds and music

Right now I am trying to research which language might be suitable. I will update this post at some point when I finally decided. Some options are:

- C++ 
    - Pros:
        - most popular and used in the industry
        - fast
        - backward compatibility? (people really like that for some reason)
    - Cons:
        - hard to use
        - easily to errors
        - error output is sometimes nebolous
        - very complicated language (templates, C++ versions, etc.)


>  Note: I might downplay C++ a bit too much, maybe modern C++ solves a lot of the cons listed above, but I am not sure. I think one could also argue that C++ can be used in a certain way to improve the pros and reduce the cons. Like not using any OOP design patterns and instead using a more functional approach.

- [Rust](https://www.rust-lang.org/)
    - Pros:
        - does what C++ does but better
        - memory safety
        - fast
        - easy to use and flexible
        - the community of game development is growing fast [here](https://arewegameyet.rs/)
    - Cons:
        - not as popular as C++
        - the ecosystem for game dev is still young
        - I need to learn the language

- [Odin](http://odin-lang.org/)
    - Pros:
        - battle tested with [EmberGen](https://jangafx.com/software/embergen/)
        - explicit & simplicity
        - also fast
        - easy to use and flexible
        - comes with major graphics API bindings and other popular libraries
        - seems to work with some C libraries
    - Cons:
        - not as popular as C++
        - I need to learn the language

