title: Installing Debian on the Zipit Z2
date: 2010-04-19 04:56

---

This is the first post about installing different OSs on the Zipit Z2\. I'll be
posting more as I work on getting a good OS on it, and modifying things to work
better. Later on, after I finish some research, I would like to put together a more
complete guide on how to get things running well. Until then:

### What it is:

The Zipit Z2 has an internal wifi and a color screen, making it a fun little
toy to hack around on. It's resources are limited--32MB of RAM, and 8MB of
flash, with a 300 ish MHz processor--so you aren't going to be able to run
Windows 7 or Ubuntu. Most people install Debian with a very minimal setup,
and install Fluxbox, which is a super lightweight GUI (the "desktop" interface).

### The Idea:

The Zipit has a minimal operating system installed, a Linux derivative apparently.
While it would be nice to put a full operating system on the internal memory,
since it is apparently 8MB it won't hold much of interest.

Instead, the idea is to replace the installed bootloader with a different
version which will actually allow us to boot from a mini/micro SD card. With
this plan, we can plug in a mini/micro SD card of reasonable size and run
an OS from there. Doing this from another Linux computer is much easier, so
if you have  one you should do it that way. I'm going to show the directions
from  Ubuntu, but the directions should stand for any version of Linux with
gParted.

If you don't have a Unix/Linux system installed, you can always install
[Wubi](http://www.ubuntu.com/download/desktop/windows-installer) (it's a
temporary Linux install to the hard-drive) or boot from a
[thumbdrive](http://unetbootin.sourceforge.net/).