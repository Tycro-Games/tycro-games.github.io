---
title: Learning Multithreading by Logging Asynchronously
date: 2026-01-14 14:10:00 +0200
categories: [Engine 🔧, Multithreading 🧵]
math: true
img_path: /assets/assets-2026-01-14/
image: /assets/assets-2026-01-14/cover.png

---

Logging is a pretty basic concept that as a programmer you get exposed to quite early. The most fundamental programming exercises are usually about logging to a console or to a file. Multithreading on the other hand, has always been something that had a complex aura around it. As my curiosity demands me to do, I aimed to make a small project where I could learn how to apply multithreading to logging.

If you need a production-ready solution, please use [spdlog][spdlog].

The project is open source. You can access the repo by clicking [here][hammered_repo].

## Async Logger

In this article I will explain how an "async logger" works and what problems it solves.

## Preliminaries

In this section I mention what you need to know in order to better use the information provided. I am assuming a basic understanding of C++, I will not pay a lot of attention to implementation "details", but to overall ideas and concepts. I will try my best to provide comments or simplify the code, so the C++ code is easier to navigate.

### Multithreading Primitives
I am assuming an abstract understanding of mutexes, condition variables, atomics and mutex wrappers (`scoped_lock`, `unique_lock`) present in the standard library. If any of those are unclear, please check the links provided [here](#resources-for-multithreading-primitives).

### Test Environment

The way I test logging in order to compare it between single/multi-threaded solutions is via aggressively logging from a 3D model loading function. In practice this will almost never be required, however, it is done in order to observe the performance of logging. I log both to console and file to compare the results. This serves as a way to check the results against the "ground truth", represented by the single-threaded output:

[text](../assets/assets-2026-01-14/log.txt)

### About Hammered Engine

"Hammered" is a personal project of mine where I explore anything that piques my interest. Currently it uses C++23, however, the concepts discussed are not tied to C++ and could be applied to any other language.

## A Basic Logger with Sinks

A sink is an object that will process a message and "print" it. This could be a file called `log.txt`, the console well had to write to when learning to code. A sink is not necessarily only those two, but anything that can be written to as well as `flushed`. To `flush`  means the code will return only after the message was written to the sink. As you can imagine, flushing is often slow.

> There is why the seemingly `endl` is not as fast as using '\n'. `endl` will also flush the console buffer, which is way slower than only adding an endline.
{: .prompt-info }

We can use an abstract class as our blueprint for making various kinds of sinks:

```cpp
struct BaseSink
{
  virtual ~BaseSink() = default;
  virtual void Sink(LogMsgView msg) = 0;
  virtual void Flush() = 0;
};
```

To call the sink object we need to pass a `LogMsgView`, an object that can have various types. One could add or remove as much information as they need:

```cpp
struct LogMsgView
{
  Level level; // Debug, Warning, Error etc.
  std::string_view loggerName; // could have multiple loggers, each could have the same or different sinks
  std::string_view payload; // the message!
  time_point timestamp; // time when it was processed
  std::thread::id threadId; // only relevant when we multithreaded
};
```

> C++ uses the concept of a `string_view`, you can think of this as a read-only pointer to a string object with a some utility functions and size of the string. 
{: .prompt-info }

Of course, it is important to realize that there may be times when different wrappers for log messages are needed. The one above does not own its message, and uses a read-only approach, which has the advantage of no-memory allocations for the string it holds. However, one may need another object that owns the `string` it holds.

To build a logger, we only need to wrap the sinks inside an API that allows the user to call the basic `sink` and `flush` functions from the sinks. A few templated functions will also help us make a thread-safe and a non-thread-safe version.

```cpp
#pragma once

//this is a struct that makes the mutex be accepted to strip thread-safeness
struct NullMutex
{
  void lock() {}
  void unlock() {}
  bool try_lock() { return true; }
};

template<typename Mutex>
struct BaseLogger
{
  virtual ~BaseLogger() = default;
  virtual void Log(Level level, std::string_view msg)
  {
	//can set the level to higher to filter messages
    if (level < m_level) 
      return;

	//create our message
    LogMsgView view {.level = level,
                     .loggerName = m_name,
                     .payload = msg,
                     .timestamp = clock::now(),
                     .threadId = std::this_thread::get_id()};


	//only one thread can log one logger object at a time
    std::scoped_lock lock(m_mutex);

    for (const auto& sink : sinks)
    {
      sink->Sink(view);
    }
  };

  virtual void Flush()
  {
	//only one thread can flush one logger object at a time

    std::scoped_lock lock(m_mutex);
    for (const auto& sink : sinks)
    {
      sink->Flush();
    }
  }

  template<typename... T>
  void Debug(std::format_string<T...> fs, T&&... args)
  {
	//profiling function from Tracy
    HM_ZONE_SCOPED_N("Log::Debug");
    Log(Level::Debug, std::format(fs, std::forward<T>(args)...));
  }
  //other functions like debug

	//sinks can be added here via polymorphism
  std::vector<std::shared_ptr<BaseSink>> sinks;

 protected:
  std::string m_name {"Global"};
  Level m_level {Level::Debug};
  //null or std::mutex
  Mutex m_mutex;
};
//short hands
using LoggerMt = BaseLogger<std::mutex>;
using LoggerSt = BaseLogger<NullMutex>;
} // namespace hm::log
```
> `Mutex` can be either `std::mutex` which makes the code thread safe, or `NullMutex` which is an empty implementation of a mutex construct. This makes it so C++ removes all the multitheading primitives and removes the overhead associated with it.
{: .prompt-info }


## A Generic Thread Pool
## Making the Logger Async
## Performance Comparison

## References

### Libraries & Tools

- [spdlog][spdlog] — Fast C++ logging library
- [Tracy Profiler][tracy] — Frame profiler

### Books

- *Game Engine Architecture* by Jason Gregory — The multithreading chapter
- *C++ Concurrency in Action* by Anthony Williams

### Learning Resources

- [Mike Shah's Multithreading Series][mike_shah] — YouTube playlist
- [cppreference — Thread support library][cppreference_thread]

[spdlog]: https://github.com/gabime/spdlog
[tracy]: https://github.com/wolfpld/tracy
[hammered_repo]: https://github.com/OneBogdan01/hammered
[mike_shah]: https://www.youtube.com/playlist?list=PLvv0ScY6vfd9wBHRBmWh7EvAHYbqH9NRV
[cppreference_thread]: https://en.cppreference.com/w/cpp/thread

## Final Words

I made this article based on a self study project I did as a third year programmer at Breda University of Applied Sciences for the Creative Media and Game Technologies bachelor.
Thanks for reading my article. If you have any feedback or questions, please feel free to email me at <bogdan.game.development@gmail.com>.
