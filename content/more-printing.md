title: More printing and calibration
date: 2013-01-23 09:56

---

One thing I am certain of is that the Solidoodle is a home-brew 3D
printer, and comes with all those problems. It is definitely well
made, and it would be hard to beat the price for the quality it
produces, but the difference in price seems to be primarily software
support.

To run the Solidoodle, you need to use [Skeinforge][skeinforge] to turn
3D models into print files, then use a crude printer interface which
is a [set of Python scripts][printrun] to make the printer work. Inside
Skeinforge are [several hundred][settings] settings which you can
tweak to get better quality.

Admittedly, the Solidoodle comes with Skeinforge pre-calibrated, so
you don't need to tweak it to be able to print rudimentary things.
However, printing with no calibration leaves many little "whiskers"
of plastic, which are a result of plastic continuing to extrude when
it pauses. For example, here is a Yoda head which was printed with
default settings. You can see that there are many little hairs
and bumps on the ear that are a result of the printer being
calibrated incorrectly.

![Yoda head printed with Solidoodle 3D printer](/content/3d-printer/yoda-head.jpg)

I certainly do not want to disparage the Solidoodle company or the
developers of the Skeinforge application: The Solidoodle printer
is very good quality for the price, and the Skeinforge application
is a very impressive application.

Still, I bring these issues up to show how 3D printing is still
in relative infancy. There are not well-developed interfaces to
make printing easy. There are not well-developed algorithms to make
calibration easy. There are not well-developed work flow methods--to
print an object, you must open Skeinforge (a difficult interface) and
figure out how to compile your model to "GCode", and then you must
open the print program (another difficult interface) and figure
out how to start it printing.

With all that said, I would like also to point out the feeling
of awe that I got when printing.

Watching an empty printer bed be filled with a thing like the [Yoda head][yodathing]
was incredible to watch and, even despite the frustrations of
dealing with early-stage software, it was well worth the time and cost.

![Solidoodle printer after a week of work](/content/3d-printer/what-a-mess.jpg)


[skeinforge]: http://fabmetheus.crsndoo.com/wiki/index.php/Skeinforge
[printrun]: https://github.com/kliment/Printrun
[settings]: http://fabmetheus.crsndoo.com/wiki/index.php/Skeinforge#Craft
[yodathing]: http://www.thingiverse.com/thing:14104