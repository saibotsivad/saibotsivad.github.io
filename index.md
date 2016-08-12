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
	<p>I write software and design user interfaces, and I care a lot about getting both of those things right.</p>
	<ul class="online-presence-icons">
		{% for identity in page.identities %}
		<li class="{{ identity.name }}">
			<a href="{{ identity.url }}">
				<img src="{{ identity.image }}" alt="">
			</a>
		</li>
		{% endfor %}
	</ul>
	<hr>
</header>

# About Me

* Much of what I write is in JavaScript (ES6 is awesome!), but I
	also write in Java (lambdas are awesome too!).
* In my current job I write a lot of AngularJS code, and have
	become intimately acquainted with Bootstrap. I appreciate
	them both, but could also complain at length about them.
* Familiar with popular stacks: LAMP, Node.js, Java+Jetty, AWS.

In my spare time I like to write software, and I also occasionally
write about some technical/user-experience issues.

# For Computers

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
	(See [Github](https://github.com/tobiaslabs/json-schema-to-markdown))

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
