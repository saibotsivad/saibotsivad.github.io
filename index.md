---
layout: index
isroot: true
identities:
  - image: /media/github.png
    url: https://github.com/saibotsivad
    name: github
  - image: /media/keybase.png
    url: https://keybase.io/saibotsivad
    name: keybase
  - image: /media/twitter.svg
    url: https://twitter.com/saibotsivad
    name: twitter
  - image: /media/npmjs.svg
    url: https://www.npmjs.com/~saibotsivad
    name: npmjs
  - image: /media/linkedin.svg
    url: https://linkedin.com/in/saibotsivad
    name: linkedin
---


<header class="index">
	<img src="/logo.jpg" alt="Logo of Tobias!">
	<h1>saibotsivad:</h1>
	<ul class="online-presence-icons">
		{% for identity in page.identities %}
		<li class="{{ identity.name }}">
			<a href="{{ identity.url }}">
				<img src="{{ identity.image }}" alt="">
			</a>
		</li>
		{% endfor %}
	</ul>
	<p>I write software and design user interfaces, and I want to be excellent at both of those things!</p>
	<p>You can have a look at <a href="/resume">my resume</a>, if that's your thing.</p>
	<hr>
</header>

# About Me

I care about solving problems using software. I want the
code that I write to be readable and maintainable years
down the road. I like to spend the extra time doing it
right, but I can understand the necessity of getting it
done quickly.

In my spare time I like to write software, and I also occasionally
write about some technical/user-experience issues.

Currently I'm working for [From Now On](http://from-now-on.com/) on
a product that connects fans to their school teams. You can have
a look at my [resume](/resume), or my professional experience
[on LinkedIn](https://linkedin.com/in/saibotsivad).

# For Computers

* A collection of [email tools](https://github.com/saibotsivad/imap-tools) that I
	wrote to make it easier to work with IMAP.
* [hex2words](https://tobiaslabs.github.io/hex2words/) is a simple JS tool utilizing the
	[PGP word list](https://en.wikipedia.org/wiki/PGP_word_list) to verify hashes.
	(See [Github](https://github.com/tobiaslabs/hex2words))
* The [Very Open License](http://veryopenlicense.com/) is for people and businesses
	who are uncomfortable with "The Swears" in the [WTFPL](http://www.wtfpl.net/),
	but want something even simpler and *less* restrictive than the
	[MIT license](http://opensource.org/licenses/MIT).
	(See [Github](https://github.com/saibotsivad/veryopenlicense))
* The [SDMP](https://sdmp.github.io/) is my attempt at making the internet a better,
	more secure place.
	(See [Github](https://github.com/sdmp/sdmp.github.io))
* You can take a [JSON schema](http://json-schema.org/) and turn it to
	Markdown, for auto-generation of human-readable specs.
	(See [Github](https://github.com/saibotsivad/json-schema-to-markdown))

# For Humans

<ul>
{% assign sorted_pages = (site.pages | sort: 'date' | reverse ) %}
{% for post in sorted_pages %}
	{% if post.published == true %}
	{% if post.layout == 'article' %}
		<li>
			<a href="{{ site.url }}{{ post.url }}">
				{{ post.title | xml_escape }}
			</a>
			&ndash;
			{{ post.date | date: "%Y-%m-%d" }}
			{% if post.updated %}
				<br>
				<em>Last updated {{ post.updated | date: "%Y-%m-%d" }}</em>
			{% endif %}
		</li>
	{% endif %}
	{% endif %}
{% endfor %}
</ul>

You can use <a href="/feed.xml" class="link-muted">Atom/RSS</a>.
