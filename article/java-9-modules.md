---
title: Trying out Java 9 module loading
summary: I attempt (and fail) to use Java 9's module loading system to handle different versions of the same module.
date: 2016-07-23 08:53
layout: article
published: true
---

Recently I had the privilege of attending [Uber Conf](https://uberconf.com)
in Denver, and while there I attended sessions by
[Kirk Knoernschild (@kirkk)](https://twitter.com/pragkirk)
and
[Venkat Subramaniam (@venkat_s)](https://twitter.com/venkat_s)
detailing the new module loading system. (Thank you both for
the great intro!)

I'm going to journal here my attempts to poke at it and make it do my
bidding. If you aren't already familiar with the new Java 9 module
loading system, you might check out these links:

* [Different Module Types in Java 9](http://www.pixelstech.net/article/1460718799-Different-module-types-in-Java-9)
* [Modularity in Java 9](http://www.javaworld.com/article/2878952/java-platform/modularity-in-java-9.html)
* [State of the Module System](http://openjdk.java.net/projects/jigsaw/spec/sotms/)

> **Please note:** Java 9 is still in early access, so there could be changes to
> the module loading system between when this was written and when you
> are reading it.

## Collisions

My primary goal is to see what happens with version/name collisions:

```txt
module A
    module B
        module D:1.0
    module C
        module D:2.0
```

Module (`A`) depends on two third-party modules, `B` and `C`. Both these
modules depend on another third-party module, `D`, but at different versions.

## Setup

I've created a very minimal example to try different
approaches, and I've made the source code
[available here](https://github.com/saibotsivad/java-9-module-demo)
if you want to poke at it later, but I'll summarize the
code setup here:

* Module `A` is a "client", calling a service inside modules `B` and `C`
* Module `B` uses a service inside module `D:1.0`
* Module `C` uses a service inside module `D:2.0`

Imagine that modules `B`, `C`, and `D` are third party modules that
you don't have control over, so that you are trying to use pre-built
JAR files instead of compiling your own.

Module `A` looks like this:

```java
public class Client {
	public static void main(String[] args) {
		System.out.println("Service B: " + ServiceB.msg());
		System.out.println("Service C: " + ServiceC.msg());
	}
}
```

Module `B` looks like this:

```java
public class ServiceB {
	public static String msg() {
		return ServiceD.msg();
	}
}
```

Module `C` looks basically the same as module `B`:

```java
public class ServiceC {
	public static String msg() {
		return ServiceD.msg();
	}
}
```

Module `D:1.0` looks like this:

```java
public class ServiceD {
	public static String msg() {
		return "Module D:1.0";
	}
}
```

While module `D:2.0` looks like this:

```java
public class ServiceD {
	public static String msg() {
		return "Module D:2.0";
	}
}
```

The `module-info.java` file for each module is different in each
example, so the example will describe those files.

> Note: I've included a slightly different, smaller module example
> [here](https://github.com/saibotsivad/java-9-module-demo/tree/master/working-example).
> If you're going to try compiling/running these examples, you
> should first try running the `working-example` to make sure
> your version of Java is compatible.
>
> For these examples, I was using Java version `9-ea+128`. If you
> have problems getting it to run, please
> [file an issue](https://github.com/saibotsivad/java-9-module-demo/issues)
> on that repo.

## The Problem/Motivation

[The *current* specs](http://openjdk.java.net/projects/jigsaw/spec/reqs/02)
indicate that version numbers are not intended to be used
inside modules (emphasis added):

> A module’s declaration **does not include a version string**, nor
> constraints upon the version strings of the modules upon which
> it depends. This is intentional.
>
> ...
>
> It is not necessary to support more than one version of a
> module within a single configuration.

This means that both `D:1.0` and `D:2.0` will have the same
module name, and therefore there will be a name collision.

As expected, if we attempt to compile our demo project with
both versions of `D` having this `module-info.java`

```
module d { 
	exports com.tobiaslabs.serviced;
}
```

We get an error like this:

```shell
$  javac -modulesourcepath src -d mods $(find src -name 'module-info.java')
src/d2/module-info.java:1: error: duplicate module: d
module d { 
^
src/d1/module-info.java:1: error: module name d does not match expected name d1
module d { 
       ^
2 errors
```

(See the full example
[here](https://github.com/saibotsivad/java-9-module-demo/tree/master/name-collision).)

## Version in Module Name?

Since the module name does not need to be tied to the package
name, in theory we could give module `D:1.0` the name `d1`
and module `D:2.0` the name `d2`. So that you'd have:

```
module d1 {
	exports com.tobiaslabs.serviced;
}
```

And:

```
module d2 {
	exports com.tobiaslabs.serviced;
}
```

This would mean that in your `require` you would need to use the
version number, but the exported class names would not have a
version number in them. For example, module `B` would be:

```
module b {
	requires d1;
	exports com.tobiaslabs.serviceb;
}
```

And module `C` would be:

```
module c {
	requires d2;
	exports com.tobiaslabs.servicec;
}
```

And the Java code of `ServiceB.java` and `ServiceC.java` would
remain the same.


Compiling and packaging work fine, leaving us with the files:

```
version-in-module-name/
	mlib/
		a.jar
		b.jar
		c.jar
		d1.jar
		d2.jar
```

However, when it is run, this error is thrown:

```shell
$  java -mp mlib -m a
Error occurred during initialization of VM
java.lang.reflect.LayerInstantiationException: Package com.tobiaslabs.serviced in both module d1 and module d2
	at java.lang.reflect.Layer.fail(java.base@9-ea/Layer.java:451)
	at java.lang.reflect.Layer.checkBootModulesForDuplicatePkgs(java.base@9-ea/Layer.java:409)
	at java.lang.reflect.Layer.defineModules(java.base@9-ea/Layer.java:359)
	at jdk.internal.module.ModuleBootstrap.boot(java.base@9-ea/ModuleBootstrap.java:298)
	at java.lang.System.initPhase2(java.base@9-ea/System.java:1928)
```

(See this code [here](https://github.com/saibotsivad/java-9-module-demo/tree/master/version-in-module-name).)

## Other Possibilities?

I'm sure you will run into this problem pretty fast, so if you
have a solution, please propose it by opening an issue over at
the [demo repo](https://github.com/saibotsivad/java-9-module-demo/issues).
