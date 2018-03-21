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
  - image: /media/npmjs.svg
    url: https://www.npmjs.com/~saibotsivad
    name: npmjs
  - image: /media/linkedin.svg
    url: https://linkedin.com/in/saibotsivad
    name: linkedin
---


<header class="index">
	<img src="/logo.jpg" alt="Logo of Tobias!">
	<h1>Hello!</h1>
	<p>My name is Tobias Davis.</p>
	<p>I build software for businesses, and I would love to work with you on your next project!</p>
	<hr>
	<ul class="online-presence-icons">
		{% for identity in page.identities %}
		<li class="{{ identity.name }}">
			<a href="{{ identity.url }}">
				<img src="{{ identity.image }}" alt="{{ identity.name }} icon">
			</a>
		</li>
		{% endfor %}
	</ul>
	<hr>
</header>

# About Me

I build web-based applications for businesses, either to use internally or for their clients.

Here is what I do:

* Solve problems using software.
* Help you deliver exceptional services to your clients.
* Work with teams to plan and execute solutions.
* Engineer products that are maintainable and flexible.

Some things I've built for other clients:

* Digital content management systems
* Analytical tools for inspecting data
* Custom report generators
* Software for architectural system monitoring

Have a look at my [resume](/resume), or look me up [on LinkedIn](https://linkedin.com/in/saibotsivad).

# For Computers

Here are some things I've made that I think are useful:

* A collection of [email tools](https://github.com/saibotsivad/imap-tools) that I
	wrote to make it easier to work with IMAP.
* You can take a [JSON schema](http://json-schema.org/) and turn it to
	Markdown, for auto-generation of human-readable specs.
	(See [Github](https://github.com/saibotsivad/json-schema-to-markdown))
* [hex2words](https://tobiaslabs.github.io/hex2words/) is a simple JS tool utilizing the
	[PGP word list](https://en.wikipedia.org/wiki/PGP_word_list) to verify hashes.
	(See [Github](https://github.com/tobiaslabs/hex2words))
* The [SDMP](https://sdmp.github.io/) is my attempt at making the internet a better,
	more secure place.
	(See [Github](https://github.com/sdmp/sdmp.github.io))
* The [Very Open License](http://veryopenlicense.com/) is for people and businesses
	who are uncomfortable with "The Swears" in the [WTFPL](http://www.wtfpl.net/),
	but want something even simpler and *less* restrictive than the
	[MIT license](http://opensource.org/licenses/MIT).
	(See [Github](https://github.com/saibotsivad/veryopenlicense))

# For Humans

Occassionally I write things that are meant for humans to read, instead of computers:

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
