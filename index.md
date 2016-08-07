---
layout: index
---

Hi there! I'm Tobias Davis:

* [saibotsivad](https://github.com/saibotsivad) on Github
* Also [tobiaslabs](https://github.com/tobiaslabs) on Github
* [saibotsivad](https://keybase.io/saibotsivad) on Keybase
* [@saibotsivad](https://twitter.com/saibotsivad) on Twitter
* Also [on LinkedIn](https://www.linkedin.com/in/saibotsivad) I guess?

I'm a software engineer, familiar with the LAMP, Java+Jetty, Node.js,
and AWS stacks, and in my spare time I make software published under the
[Very Open License](http://veryopenlicense.com). I also write about
some technical/user-experience issues when I have time.

You can follow the [RSS/Atom feed](/feed.xml) for updates.

# Experiments

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

# Contributing

I welcome all pull requests against any of my public repositories, and
if you don't want to do that, you can 

# Articles

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
