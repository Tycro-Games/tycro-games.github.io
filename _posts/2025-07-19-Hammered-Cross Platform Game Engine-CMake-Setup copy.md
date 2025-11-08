---
title: Hammered Engine | Cmake setup
date: 2025-07-19 14:10:00 +0200
categories: [Engine 🔧, Tutorial 📚]

math: true
img_path: /assets/assets-2025-07-19/
image: /assets/assets-2025-07-19/gl_vk_demo.gif
---

## Intro

At the end of my second year at university, I had the opportunity to work with custom game technologies. I contributed to cross-platform engines (each took 8 weeks) that ran on [Nintendo](https://tycro-games.github.io/projects/Y2-blockC/) and [PS5](https://tycro-games.github.io/projects/Y2-BlockD/). Over another 8 weeks, I built a [grand strategy renderer](https://tycro-games.github.io/projects/Y2-blockB/) inspired by one of my favorite games, *Europa Universalis IV*.

The experience was educational and practical; however, I often felt constrained by the strict deadlines. I had to compromise in order to finish on time, just as each project was starting to come together. This is why I decided to start my most ambitious solo project yet: **Hammered**, an engine using OpenGL and Vulkan for simulation games, where I can experiment with graphics, tools and gameplay systems at my own pace, building each addition on top of the last.

The project is available on github, specifically the branch used when this articles was made can be found [here](https://github.com/OneBogdan01/hammered-engine/tree/Cmake-opengl-vulkan-set-up).

### Breakdown

This is what I have done so far:

- using Cmake[^make] I can generate two .exes that use OpenGL and Vulkan, "_gl" and "_vk" as name endings
- shaders are compiled in the generation step from `.glsl` to `.spv` into Vulkan and OpenGL specific binaries, as detailed in the Red Book, chapter two [^glb].
- running one of them, initializes the selected graphical backend with the following setup: a triangle is rendered, along with an imgui menu that allows changing the compute shader applied to the background
- an ImGui menu is also present to allow changing from one backend to another, closing the current instance and running the other executable

## Demo

In the video below, I run the application using the generated `.sln` solution. The shaders are compiled before the window is opened:

<video muted controls width="100%" src="/assets/assets-2025-07-19/2025-07-19 18-00-20.mp4" title="Title"></video>

*In the next updates, I will save the current state of the engine on close, automatically loading the state when switching between backends*

At this point in my development journey I am still trying to figure out a lot of unknowns. For the time being, I want to build a Vulkan renderer and use OpenGL as a visual check. For a long time, I've had the curiosity to experiment with performance on Vulkan and modern OpenGL. I never compared OpenGL with AZDO and Vulkan [^grc][^glAZDO][^GDCtalk] which is something that I am excited to explore (and profile!).

>This setup was made using vulkan guide[^vkg], then adapted to OpenGL in order to have the same visual output. I will not go into the graphics implementation yet, since I do not have a good grasp of how I want to build that API yet.
{: .prompt-info }

## Cmake

>For the next section I expect the reader to have some basic understanding of Cmake. If you need a refresher or you never used it before, check [this](https://cmake.org/cmake/help/latest/guide/tutorial/index.html).
{: .prompt-tip }

### Project Structure

![alt text](../assets/assets-2025-07-19/FolderStructure_ManimCE_v0.19.0.png)
*Cmake project structure*

I mentioned in the intro section that I would like to build this engine specifically for *simulation games*. It is irrelevant what is the target kind of game for an engine as long as it has a clear purpose, for me that would be a **3D renderer** and a similar game to **Dwarf Fortress**. Regardless of the project, I would like to allow the user to switch between backends.

This is the build structure I came up with:

1. `gl` and `vk` are the OpenGL and Vulkan backends.
2. the engine is compiled into both backends:`hammered_engine_gl` & `hammered_engine_vk`
3. each engine backend uses `common` code and external libraries.
4. in addition, there is specific code & libraries for OpenGL and Vulkan that also get linked into their respective engine backends
5. `game_gl` & `game_vk` are built on top of their backends

<video muted controls width="100%"  src="/assets/assets-2025-07-19/EngineStructureDiagram.mp4" title="Title"></video>

>This is roughly how the Cmake build process will work
{: .prompt-info }

### Building the root

The `CmakeList.txt` that serves as the entry point:

```cmake
cmake_minimum_required(VERSION 3.24.0)

# Include utilities and other modules
# Hide inside global variables and useful functions
include(cmake_utility/utility.cmake)
project(hammered_template VERSION ${HM_VERSION})


# Backend selection, makes sure at least one is enabled
set(GAME_BACKENDS "")
# other code to allow the user to define the variable ...

# Adds engine code and externals
add_subdirectory(engine)

# This is where it compiles shaders to .spv
add_subdirectory(game)
# Sets up the backends .exes, GAME_BACKENDS is created in the engine folder
add_game_backends("${GAME_BACKENDS}")

# Set the Visual Studio startup project to the first enabled backend executable
list(GET GAME_BACKENDS 0 first_backend)
# This will be game_gl or game_vk
set_property(DIRECTORY PROPERTY VS_STARTUP_PROJECT "game_${first_backend}")
```

> The utility.cmake file can be found [here](https://github.com/OneBogdan01/hammered-engine/blob/6c75dfc19378b49ca015781f44a8b1a80146832e/cmake_utility/utility.cmake).
{: .prompt-tip }

### Building the engine target

Inside this folder there are another two: external and code. The cmake file below links everything together into two targets, each using OpenGL and Vulkan: `hammered_engine_gl` and `hammered_engine_vk`.

```cmake

# Add externals and code
add_subdirectory(external)
add_subdirectory(code)

# Iterate over each backend and add the right external libraries
foreach(backend ${GAME_BACKENDS})
    set(engine_target "hammered_engine_${backend}") # will end in _gl or _vk

    # Common libraries for all backends
    target_link_libraries(${engine_target}
        PUBLIC
            glm
            #and so on
    )

    # Backend-specific libraries
    if(backend STREQUAL "gl")
        target_link_libraries(${engine_target}
            PUBLIC
                glad
                imgui_opengl
        )
    elseif(backend STREQUAL "vk")
        target_link_libraries(${engine_target}
            PUBLIC
                vkbootstrap
                vma
                imgui_vulkan
        )
    endif()
    # Set Visual Studio folder
    set_target_properties(${engine_target} PROPERTIES FOLDER "engine")
endforeach()

```

> `target_link_libraries` takes a target and links against the specified libraries. The `PUBLIC` keyword means that these libraries can be accessed by other targets that might depend on the engine, in this case, that would be the "game" target.
{: .prompt-info }

You might wonder why I set `set_target_properties`, I am using Visual Studio and I like to have my solutions organized in folders:

![alt text](../assets/assets-2025-07-19/folder.png)
*resulting project hierarchy*

### Building External

This is the folder with all libraries used by the engine, for now these are:

- sdl3
- vma
- stb_image
- vkbootstrap
- fmt
- glad
- imgui

This is a bare-bones version of the file, the full file can be found on the github repo [^source].

```cmake

# Header-only libraries
# ..

# vkbootstrap needs to be linked with vulkan

add_library(vkbootstrap STATIC)

target_sources(vkbootstrap PRIVATE 
  vkbootstrap/VkBootstrap.h
  vkbootstrap/VkBootstrap.cpp
  )

target_include_directories(vkbootstrap PUBLIC vkbootstrap)
target_link_libraries(vkbootstrap PUBLIC Vulkan::Vulkan $<$<BOOL:UNIX>:${CMAKE_DL_LIBS}>)
set_property(TARGET vkbootstrap PROPERTY CXX_STANDARD 20)
# This is omitted below for brevity
#set_target_properties(vkbootstrap PROPERTIES FOLDER "engine/external")

# SDL3 has its own cmake files
add_subdirectory(SDL)  
get_property(SDL_TARGETS DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/SDL PROPERTY BUILDSYSTEM_TARGETS)


# fmt
add_subdirectory(fmt)
# glad
add_library(glad STATIC ${CMAKE_CURRENT_SOURCE_DIR}/glad/src/glad.c)
target_include_directories(glad PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/glad/include)

```

The second part of this file is used to link common and per backend libraries, I kept the libraries that require a different setup to the others:

```cmake
# Common imgui files, used by both backends
set(IMGUI_CORE
    imgui/imgui.cpp
    # and so on
)

# Links imgui with SDL
add_library(imgui_core STATIC ${IMGUI_CORE})
target_include_directories(imgui_core PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/imgui)
target_link_libraries(imgui_core PUBLIC SDL3::SDL3)


# Vulkan specific
if(ENABLE_VK_BACKEND) 
    add_library(imgui_vulkan STATIC
        imgui/backends/imgui_impl_vulkan.cpp
    )
    target_link_libraries(imgui_vulkan PUBLIC imgui_core Vulkan::Vulkan)
endif()

# OpenGL specific
if(ENABLE_GL_BACKEND) 
# Same idea as above
# ...

# Disable library warnings
# ...

```

### Building Code

> My code folder is further split into `include` and `source` , containing `.hpp` and `.cpp` files.
{: .prompt-info }
To only include the right code files per backend, I exclude the `platform` folder for the `source` and `include`. Below you can see how I can filter the files:

```cmake
foreach(backend ${GAME_BACKENDS})
    set(target_name "hammered_engine_${backend}")

    # Gets every cpp file inside the source folder
    file(GLOB_RECURSE ALL_SOURCES CONFIGURE_DEPENDS
        ${CMAKE_CURRENT_SOURCE_DIR}/source/*.cpp
    )
    # Excludes all the source files in the platform folder
    list(FILTER ALL_SOURCES EXCLUDE REGEX ".*/platform/.*")

    set(ENGINE_SOURCES ${ALL_SOURCES})
    # Do the same for includes

```

> The `file(GLOB_RECURSE ALL_SOURCES CONFIGURE_DEPENDS)` line, might look a bit complicated, this is the breakdown:
>
>
> `file(GLOB_RECURSE ...)` tells cmake this is a file operation and to look recursively into the directories.
>
> `ALL_SOURCES` is where the result is going to be stored.
>
> `CONFIGURE_DEPENDS` makes cmake run the config automatically in case a file was added or removed.
>
> `${CMAKE_CURRENT_SOURCE_DIR}/source/*.cpp` is providing a path with filtering that will return all `.cpp` files found.
{: .prompt-info }

> In short, `GLOB_RECURSE` can save you the trouble of specifying each file, however, this is advised against on the docs, due to the fact that `CONFIGURE_DEPENDS` may not work for all generators. Keep that in mind, in case you decide to use it.
{: .prompt-warning  }

[![alt text](../assets/assets-2025-07-19/warn.png)](https://cmake.org/cmake/help/latest/command/file.html#filesystem)

*You can click on the image to open the documentation page*

Afterwards, I can get into the specific folder for each of the APIs:

```cmake
    # Backend-specific sources
    if(backend STREQUAL "gl")
        file(GLOB_RECURSE PLATFORM_SOURCES CONFIGURE_DEPENDS
            ${CMAKE_CURRENT_SOURCE_DIR}/source/platform/opengl/*.cpp
        )
        file(GLOB_RECURSE PLATFORM_HEADERS CONFIGURE_DEPENDS
            ${CMAKE_CURRENT_SOURCE_DIR}/include/platform/opengl/*.hpp
        )
        # define macro
        set(PLATFORM_DEFINE "GFX_USE_OPENGL")
    elseif(backend STREQUAL "vk")
    ## The same idea for vulkan
    #...
    # Append platform vars to the ENGINE_SOURCES and ENGINE_HEADERS 
    add_library(${target_name} STATIC
        ${ENGINE_SOURCES}
        ${ENGINE_HEADERS}
    )


    target_include_directories(${target_name} PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/include
    )
    target_compile_features(${target_name} PUBLIC cxx_std_20)
    target_compile_definitions(${target_name} PUBLIC ${PLATFORM_DEFINE})



    # Visual Studio organization
    source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR}/source PREFIX "source" FILES ${ENGINE_SOURCES})
    source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR}/include PREFIX "include" FILES ${ENGINE_HEADERS})

    set_target_properties(${target_name} PROPERTIES FOLDER "engine")
endforeach()
```

### Building the shaders

At this point the engine is basically ready, each backend has its own library that has common libraries and specific ones depending on the API. The next step is to prepare the shaders. Normally, OpenGL uses `GLSL` which is compiled at run-time. However, there are extensions that allow OpenGL to use `.spv` files, which are compiled offline, as described in the **Red Book**, chapter two [^glb]. 

It is more convenient to use the same `.glsl` file for both backends, the specific differences can be handled using `ifdef`. The last step is to compile to the Vulkan or OpenGL `.spv` variants, using the command line:

```
# For opengl:
glslangValidator -G shader.vert -o output.spv
# For vulkan:
glslangValidator -V shader.vert -o output.spv
```

> I chose to put my shaders in the assets folder, which is inside the game folder.
{: .prompt-info }

```cmake

find_program(GLSL_VALIDATOR glslangValidator HINTS /usr/bin /usr/local/bin $ENV{VULKAN_SDK}/Bin/ $ENV{VULKAN_SDK}/Bin32/)

file(GLOB_RECURSE GLSL_SOURCE_FILES
    "${ASSET_SOURCE_DIR}/shaders/*.frag"
    "${ASSET_SOURCE_DIR}/shaders/*.vert"
    "${ASSET_SOURCE_DIR}/shaders/*.comp"
    "${ASSET_SOURCE_DIR}/shaders/*.tesc"
    "${ASSET_SOURCE_DIR}/shaders/*.tese"
    "${ASSET_SOURCE_DIR}/shaders/*.geom"
    )

# Generate Vulkan and OpenGL SPIR-V for each shader
foreach(GLSL ${GLSL_SOURCE_FILES})
    get_filename_component(FILE_NAME ${GLSL} NAME)

if(ENABLE_VK_BACKEND)
    # Vulkan SPIR-V
    set(SPIRV_VK "${ASSET_SOURCE_DIR}/shaders/${FILE_NAME}.vk.spv")
    add_custom_command(
        OUTPUT ${SPIRV_VK}
        COMMAND ${GLSL_VALIDATOR} -V ${GLSL} -o ${SPIRV_VK}
        DEPENDS ${GLSL}
        COMMENT "Compiling Vulkan SPIR-V: ${FILE_NAME} -> ${SPIRV_VK}"
    )
    list(APPEND SPIRV_BINARY_FILES ${SPIRV_VK})
endif()
# The same as Vulkan but end with _gl and use the different command
endforeach()


add_custom_target(
    shaders
    DEPENDS ${SPIRV_BINARY_FILES}
)
# This target will be in the utilities folder
set_target_properties(shaders PROPERTIES FOLDER "utilities")
```

> This should ideally be moved to a script that is ran every time by the engine on start-up, in order to allow hot reloading of the shaders.
{: .prompt-tip }

The output for each shader will be:

![alt text](../assets/assets-2025-07-19/shader.png)
*These can then be loaded depending on the API.*

### Building the executable

This code resides in the utlity.cmake file in order to not clutter the rest of the `CmakeLists.txt` files. It starts by settings some global settings and folders:

```cmake
# Configuring some global settings
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
## Multithreaded enable for msvc

## Versioning
#...

## Setting the dlls and .exe in the same folder
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib/$<CONFIG>)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin/$<CONFIG>)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin/$<CONFIG>)


```

Then it copies the assets into the binary and solution folders, this allows for easy sharing of the executable, manually or by using CI/CD and it requires no further setup for running from Visual Studio.

```cmake
# Asset utility function
set(ASSET_SOURCE_DIR "${CMAKE_SOURCE_DIR}/game/assets")
function(configure_assets_for target)


    set(ASSET_BINARY_DIR "$<TARGET_FILE_DIR:${target}>/assets")
    set(ASSET_SOLUTION_DIR "${CMAKE_CURRENT_BINARY_DIR}/assets")

    add_custom_command(TARGET ${target} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_directory
        "${ASSET_SOURCE_DIR}"
        "${ASSET_BINARY_DIR}"
    )
    add_custom_command(TARGET ${target} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_directory
        "${ASSET_SOURCE_DIR}"
        "${ASSET_SOLUTION_DIR}"
    )
endfunction()
```

As I have shown before, I can open the OpenGL backend, close it, and open the Vulkan one. That requires each of the applications to know the path of the other one. In my case, I used a macro:

```cmake
# Generic addition of macro per backend as GAME_VK_EXECUTABLE_NAME="game_vk.exe" or GAME_GL_EXECUTABLE_NAME="game_gl.exe"
function(exec_macro_for target backend)
    foreach(backend IN LISTS backends)
        string(TOUPPER "${backend}" B_UP)
        target_compile_definitions(${target} PUBLIC
        "GAME_${B_UP}_EXECUTABLE_NAME=\"$<TARGET_FILE_NAME:game_${backend}>\""
            )
    endforeach()

endfunction()
```

Finally, we can generate all the backends applications. At the end, I also create a dummy target which will build both backends at the same time, so it does not have to be done manually:

```cmake
function(add_game_backends backends)
    set(game_exes)

    foreach(backend IN LISTS backends)
        message(STATUS "  Generating targets for backend = ${backend}")
        set(target "game_${backend}")
        set(engine "hammered_engine_${backend}")
        #TODO expand this for scripting, or structuring the game application
        add_executable(${target} game/src/main.cpp)
        target_link_libraries(${target} PRIVATE ${engine})
        add_dependencies(${engine} shaders)

        exec_macro_for(${target} "${backends}")
        exec_macro_for(${engine} "${backend}")

        set_property(TARGET ${target} PROPERTY CXX_STANDARD 20)
        configure_assets_for(${target})

        list(APPEND game_exes ${target})

    endforeach()

    # Set compiler flags
    #...
    #This will try to build both backends when trying to run either applications:
    add_custom_target(build_all_backends ALL
        DEPENDS ${game_exes}
    )
    set_target_properties(build_all_backends PROPERTIES FOLDER "utilities")
endfunction()


```

## Final Words

In my next update I will probably showcase how I designed my rendering layer. I hope this article helped you understand more about Cmake and how you can use it in your own projects.

Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.

## References

### Source

[Github repo link to the branch used at the moment of writing](https://github.com/OneBogdan01/hammered-engine/tree/cmake-opengl-vulkan-set-up)

[^glb]: [Red Book](https://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0134495497)
[^grc]: [3D Graphics Rendering Cookbook: A comprehensive guide to exploring rendering algorithms in modern OpenGL and Vulkan](https://www.amazon.com/Graphics-Rendering-Cookbook-comprehensive-algorithms/dp/1838986197)
[^glAZDO]: [Indirect Rendering OGLDEV](https://www.youtube.com/watch?v=oETErEkFICE)
[^GDCtalk]: [GDC Talk](https://gdcvault.com/play/1023516/High-performance-Low-Overhead-Rendering)
[^vkg]: [Vulkan Guide chapter 3](https://vkguide.dev/docs/new_chapter_3/building_pipeline/)

[^make]: [Cmake](https://cmake.org/)