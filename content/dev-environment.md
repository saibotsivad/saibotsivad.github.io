title: Dev Environment
date: 2012-09-06 03:30

---

The most frustrating times spent programming have been almost entirely when I have been
trying to setup the dev environment.

For example, a very cool tool in Java development is JRebel. It handles continuous deployment,
so as soon as you modify any class it will be repackaged. This saves an enormous amount of
time, since you don't have to rebuild an entire package to see instantaneous changes. But
JRebel requires setup to make it work, and that setup has not been automatized, so when I
try to get it running, it breaks in ways that I do not understand.

Another tool we use for packaging is Ant, which is very promising because you create simple
XML files to configure setup details, and then you simply run "ant build" or a few other
possible commands and it will compile and deploy the entire package. Very cool.

The problem occurs when you try to use these very handy tools, but don't have a good
understanding of them, and don't have a good understanding of the companies entire directory
structure. If I want to start JRebel within Eclipes, a pretty good Java IDE, how do I do it?
It looks like I have to add a "Run Configuration", but then Eclipse says I need a main
instance, and within this one code base there are dozens of packages, none of which have
an obvious main method to catch.

Answering all these questions means two things: 1) I end up spending valuable hours figuring
out debugging configuration issues, instead of spending those hours debugging the company
software. In other words, it costs the company real dollars by loss of my productivity. 2)
Because I end up resorting to bugging my coworkers for help, they not only waste valuable
hours themselves in time spent helping me, but also waste valuable time by switching between tasks.

With all these costs coming out of lack of automation, surely there must be costs associated
with automating everything?

I don't see it that way, and in fact the classic [Joel Test](http://www.joelonsoftware.com/articles/fog0000000043.html)
hints at this idea in question two: "Can you make a build in one step?"

I'm going to extend that a bit, and phrase a new question this way: "Can you setup an
entire developers platform in one step?"

For example, you could use git/svn to download the codebase, and then run something like
`setup_dev_environment.sh`, which would automatically install all applications to set
folders, configure `PATH`/`EXPORT` locations, etc. From this point, you should be able
to continue on with Joel's "build in one step". In fact, you could have a source-controlled
script that does all these things.

Doing so means that every new developer added can pick up the pieces much faster, and not
spend costly hours debugging software versions and folder locations.

How many hours per week do you spend on environment setup issues? How can you better automatize
that setup? What tools would you need? Do they exist, or do they need to be made? 