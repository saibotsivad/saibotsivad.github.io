---
layout: index
---

Hi there! I'm Tobias Davis:

* [saibotsivad](https://github.com/saibotsivad) on Github
* [@saibotsivad](https://twitter.com/saibotsivad) on Twitter
* Also [on LinkedIn](https://www.linkedin.com/in/saibotsivad) I guess?

This is a list of projects I started, some of them a bit experimental
in nature, as well as articles I've written about tech stuff. You can
follow the [RSS/Atom feed](/feed.xml) for updates.

* All the code and documentation made public on this site is
	released under the [Very Open License](http://veryopenlicense.com).
* Check out the [complete repository list](https://github.com/tobiaslabs).
* You can open issues or make pull requests to any of the repositories.

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
* You can take a JSON schema and turn it to Markdown, for auto-generation
	of human-readable documents.
	(See [Github](https://github.com/tobiaslabs/json-schema-to-markdown))

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
