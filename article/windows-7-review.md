title: Rather Lengthy Windows 7 Review, by a Linux Fan
date: 2009-11-22 13:10
excerpt: 
categories: other

It's important to note a difference between an Operating System (OS) and a Graphical User Interface (GUI). In the Apple system, the OS is a type of Unix, and the GUI is Snow Leopard. In the Ubuntu system, the OS is a type of Linux, and the GUI is Gnome. In the Microsoft system, originally the core was DOS, and the GUI was Windows. In XP the DOS core was finally removed, I don't know what it's called so I will call it WDOS.

This distinction is an important one, because when you install Snow Leopard, what you see and click on isn't really the OS, it's the GUI. This is especially apparent on systems like Ubuntu, which use a Debian/Linux OS, and can come with a multitude of GUIs: Gnome, KDE, Fluxbox, etc... However, in common terminology, normal people call Snow Leopard the Operating System, and when they test it they say "The OS doesn't have a good network connector program".

The use of the term, OS, is misused, but for good reason: The Operating System, to the normal person, is the thing you install from the disk. So when I review Windows 7, realize that I am actually testing the interface and not the core beneath it. I could test the actual core OS of Windows 7, but what I would be saying is things like "The CPU benchmarks run the Fibonacci sequence at a rate of so many sequences per second", which wouldn't be terribly helpful to normal people who just want to use the computer to "do stuff".

So I am really going to review the Graphical Interface of Windows 7, not the core Operating System.

**A Note About Freedom**

I have used open source software for so long that I nearly returned Windows 7 on the License Agreement alone (EULA). I can appreciate the need to have a carefully drafted license, but one thing jumped out at me that I wish I could get clarification on: "You may only use the software on two processors at one time."

This pretty much excludes the i7 processor, and the new hex cores I keep hearing rumors about are definitely out. It doesn't even work if you say "processors" means CPU chips, since a quad core chip has four _processor_ chips internally. In the case of a quad core, Microsoft can either cripple the computer by only using two of the four cores, or put you on the honor system. Either option is not acceptable, and if I had a quad core CPU, I can guarantee would be calling Microsoft for a refund, since I would be violating my agreement if I used more than two of the cores.

This is, I hope, a case of a poorly worded License, perhaps a copy-over from the old XP license. However, I would like to know if anyone has a quad core, whether they can confirm for sure that all four cores are in use by Windows?

**Installation Notes**

The installation process was very simple and relatively pain free. I was even able to mess around with the partitions, although in this install I decided to let Windows take the whole 100 GB drive. The partition management options looked like, if I had some exotic ext4 partitions, that it would work around them. I also didn't try installing to a secondary partition, so no word on whether Windows has fixed that problem.

Full installation took only about 20 minutes, which was pretty nice.

**Updating**

As soon as I installed, Windows told me there were some updates available, which is pretty normal for a new OS. I poked around in that interface a bit and was pleasently surprised to see an improved interface over the XP design, with actual update packages visible and selectable in a very easy manner. There were some driver updates as well, so I installed all those and rebooted.

One thing that always annoyed me in XP was the "Updates are ready" notification popping up every ten minutes or whatever. This has stopped with 7, which is nice. The notification pops up once on boot up, and leaves a small flag icon on the taskbar (you can remove that also, but I like to have a reminder visible).

**Turning off the computer**

This is as pain free as ever, and takes about as much time as before. If you use multiple users, there is no "Log off" option in the immediate Start Menu, you have to select the tiny arrow and then select "Log Off". Alternately (the faster way) is to hit Ctrl+Alt+Delete which brings up a prompt from which you can select "Log off".

_Update:_ You can change the default setting of the button by right-clicking and selecting the item in the dropdown menu.

**Sharing Folders**

I have four computers on my own private router, which connect to the main house router and to my roommate's computer. I share documents between the computers, so this was a big issue to test. On my XP laptop I placed a document in a new folder and then shared it, but 7 never could find it. I tried the mysterious "Homegroup", thinking it may be like the old "Workgroup", but had no luck. Eventually I was able to connect to my computer by typing my IP address in the Location Bar. I never actually could pull files off my laptop, but I can't be certain that wasn't a privacy setting on the laptop, so I won't take marks off for it since I was able to access the desktop folders from the laptop.

**A Word on Appearance**

Is it just me, or does the initial look seem really girlie? After looking at the clothing on the campus, I noted that apparently the swirly things are all the fad lately. I think they look girlie. Windows 7 has some pretty reasonable themes available, so I fixed that pretty quick.

One thing I was a bit disappointed on was the Logon Screen was not able to be changed without editing the registry. I think that is a style that the user should be able to change easily, so I will detract points for not having a complete "Style Suite" available. Good start, but still needs work.

Also, Windows has _finally_ joined the modern age and included the option to have the desktop wallpapers rotate through a selection of images. Finally.

**Turning Off System Sounds**

I don't like the computer to make noise at me, it annoys me. To get to the sounds setup, Windows 7 has a pretty intuitive "Personalize" option when you right-click the desktop. The sound settings were there, which is a good place for them.

**Installing Applications**

The two things people really care about when they install a new OS are these: Do my programs work, and Does my hardware work?

I use a rather large suite of programs very consistently, so this was a good opportunity to test them out. This version of Windows 7 was the 64 bit version, so some of the programs didn't install until I downloaded the correct version, but here is a list of software that installed fine:

7-zip, AbiWord, Audacity, CCleaner, CPU-Z, DFraggler, Mozilla Firefox, Filezilla, foobar2000, the GIMP, Inkscape, IrfanView, Launchy (although I am noticing that I don't really need it anymore in 7), Notepad++, Open Office (installed without the Java extras), Pidgin, Spybot Search &amp; Destroy, Synergy, TortoiseSVN, Unlocker, VirtualBox, VLC, WampServer, Xiphos.

The only two things that didn't install fine were:

1) Easeus Partition Manager: The 32 bit version is free, but won't install on the 64 bit system. The 64 bit version costs money! I might end up paying for it, since it's a pretty good tool, although gParted is open source, which I like better.

2) PeerGuardian didn't install, even the Vista 64 bit version. My roommate told me to get PeerBlock instead, since PeerGuardian wasn't actually under development anymore. Installing PeerBlock was a snap!

**The Windows Firewall**

I use the program Synergy to share a Keyboard+Mouse over TCP/IP. It's the handiest thing ever, I don't need a KVM switch! It installed and when I went to run it, Windows Firewall popped up and said "Do you want to allow Synergy?", so I said yes. And then it worked.

I don't know how secure the Firewall is, at it's core, but the interface was pretty clean. I poked around in the settings later, just to see what it was like, and it's pretty easy to maneuver.

**Sharing Folders Across a Network, Round 2**

I wanted to move some folders from my XP laptop to the desktop. I made a folder on the 7 computer, right clicked, and selected "Sharing", which allowed me to select three places: "Homegroup read only", "Homegroup read+write", or "Everybody". I really have no clue what "Homegroup" is, but I wanted other people to be able to write, so I selected that. What happened next is one of the most aggravating things I have ever seen on an OS:

"You cannot share this folder"

And the only option is to click "OK".

This is not a Windows exclusive thing, bad design shows up in every OS I have ever used: If you are going to give me an error, _let me know something about it!_ Anything at all, even a cryptic error code can be searched online, but this was very frustrating.

I tried again, and this time another option was available called "Advanced Sharing", which let me share the folder eventually. Then I went on my laptop and typed in desktop and was prompted for a login. That was weird, but I typed in the desktop logon and got access to the whole drive. Not the shared folder, the whole drive.

Network sharing continues to be a problem for me, it seems like Microsoft made a new sharing system and decided to not support other file sharing systems. Typical Windows snobbery, unfortunately, and makes me wonder how well supported the Linux SAMBA file system will work. I'm not very hopeful.

**Networking Issues**

While in the process of trying to set the desktop up with a static IP, I inadvertently disabled the actual hardware network device. In XP you can disable the network device from the "Network Connections" page, but the icon stays there. So far as I can tell (from about an hour of poking around) when you disable the network device from the "Network and Sharing Center", the only way to re-enable it is through the Device Manager, who is buried deep in the control panel.

The troubleshooting available was as summarily unhelpful as ever. When I couldn't figure out why my network didn't work, the Troubleshooter essentially said that nothing was wrong, and then offered to _look online_ for more help. The humor is not lost on me, to be sure.

I have discussed my frustrations with networking issues quite strongly to the Kubuntu crowd when they installed a new, known-to-be-broken network manager application with their default OS install, so don't think I'm blindly hatin' on Windows. Windows 7 is an advance from the XP interface, but it still needs a few wrinkles ironed out.

**Final Notes**

Windows 7 suffers from the age-old problem of not being perfect.

If you were expecting to turn on your computer and have everything magically work for you, every time you did something, then you should either not use computers, or lower your expectations. Alternately you could get involved in software design/testing so you can do something about it, but that's not for most people.

That said, Windows 7 has a pretty reasonable interface, although I think they suffer from a "This is shiny, let's include it" mentality.

Your mileage may vary, of course, and people in the gaming community still have some driver issues going on, but those will be worked out relatively quickly.