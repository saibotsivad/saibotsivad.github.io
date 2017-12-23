# [saibotsivad](http://saibotsivad.com)

This is the website for [saibotsivad.com](http://saibotsivad.com),
it uses Github Pages, aka [JekyllRB](http://jekyllrb.com/).

For development, build and launch using the command (need ruby
installed, presumably):

	gem install jekyll bundler
	bundle exec jekyll serve

Since it's run with Github Pages, it means that any repo
inside the [saibotsivad repo](https://github.com/saibotsivad)
that has a `gh-pages` branch will be accessible at

	saibotsivad.com/$REPO_NAME

Note to self: If you're getting the error `bundle: command not found`,
it's probably because your `PATH` doesn't include the gem binary path. Try:

	gem env

Then look for **GEM PATHS** and `ls` the `bin` folder of each of those
until you find the `jekyll` and `bundle` binaries. After that, add
the `bin` folders to your `PATH`.
