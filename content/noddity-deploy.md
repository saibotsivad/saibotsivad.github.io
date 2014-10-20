title: How I deploy noddity
date: 2014-10-19

---

I use [Noddity][noddity] to run most of my blogs. It's a sort
of framework that lets you write in content in [markdown][md]
and loads everything from your site as static files, with no
build step.

If you want a really simple setup, you can just fork the
[`gh-pages` branch][nodditygh] of noddity, edit your settings,
and (if the branch name is `gh-pages`) you'll have a Github
hosted version of Noddity running at: `http://USERNAME.github.io/REPO`

However, Noddity does have some technical limitations, mainly
that there is no rendered HTML hosted. (In Noddity, the browser
downloads the Markdown and renders it locally. Read about it
more at the [Noddity website][noddity].)

Because of technical limitations, some search engines won't render
pages correctly. To resolve this, [@TehShrike][ts] offers a service
that will render your Noddity install to HTML. To set this up
requires a bit more configuration than simply using [GitHub Pages][gp],
so I'm going to tell you:

### How I setup Noddity on Dreamhost

I use [Dreamhost](http://dreamhost.com) for hosting my random few
sites. Dreamhost is a shared LAMP stack, and lets you put `.htaccess`
rules in your site folders. (Dreamhost also has `git` installed, which
is necessary.)

Conveniently, Noddity has an [htaccess file][nodht] included with
the necessary files, and it is already well configured.

Github also has hooks, that let you do things when your repo changes.

Together, Github and Dreamhost let me set up a simple site that
I can fully update using the git command line and/or the Github
website interface.

The basic idea is that any time the Github repo changes, it will
fire some action which will initiate a refresh of the Dreamhost
site.

On the server we'll put a PHP file that looks like this:

```php
<?php
$LOCAL_ROOT         = "/path/to";
$LOCAL_REPO_NAME    = "mysite.com";
$REMOTE_REPO        = "https://github.com/USERNAME/REPO.git";
$BRANCH             = "master";

$LOCAL_REPO         = "{$LOCAL_ROOT}/{$LOCAL_REPO_NAME}";

if ( $_SERVER['HTTP_X_GITHUB_DELIVERY'] ) {
  if( file_exists($LOCAL_REPO) ) {
    shell_exec("cd {$LOCAL_REPO} && git pull");
    die("done " . mktime());
  } else {
    shell_exec("cd {$LOCAL_ROOT} && git clone {$REMOTE_REPO} {$LOCAL_REPO_NAME}");
    die("done " . mktime());
  }
}
```

The code says that, if the HTTP request contains the header field
`HTTP_X_GITHUB_DELIVERY`, to `git pull` the latest version down.

Currently I'm not passing in a secret, because all that hitting the URL does is
download the latest from the Github repo. If you are worried about rate limits,
you'll probably want to setup a "secret".

I'll put this file somewhere on my site, like `/var/www/mysite.com/github.php`, which
would make it available at the URL `http://mysite.com/github.php`

On the Github side, I setup a [hook][hook] that will call that URL whenever the
repo changes. Simply go to:

    https://github.com/USERNAME/REPO/settings/hooks/new

Then I set the `Payload URL` to the URL above, e.g. `http://mysite.com/github.php`

### Testing

To test this setup, update your repo. This will run the *webhook*, so that Github
hits this PHP file. Make sure that the `git pull` was run by making sure the
update you made is on the server.

Make sure that you uncomment the line inside `index.html` that looks like this:

````html
<meta name="fragment" content="!">
````

Finally, to test that the `.htaccess` rule is working, try this as the URL:

    http://mysite.com/?_escaped_fragment_=/post/index.md

This should redirect you to the domain `http://seo.noddityaas.com/`, and the
links on that page should go back to your site **correctly formatted** like so:

    http://mysite.com/#!/post/index.md

That's all there is to it!

### Conclusion

You can setup a Noddity blog on a LAMP stack server, but write your content in
markdown, and serve your files *statically*, and never need to run a build step.

(I'm hoping that if Noddity takes off, Github will support the `_escaped_fragment_`
search engine notation natively, thus making this extra step obsolete. Maybe some day soon!)

[noddity]: http://noddity.com
[nodditygh]: https://github.com/TehShrike/noddity/tree/gh-pages
[md]: http://daringfireball.net/projects/markdown/
[ts]: https://twitter.com/TehShrike
[gp]: https://pages.github.com/
[nodht]: https://github.com/TehShrike/noddity/blob/master/.htaccess
[hook]: https://developer.github.com/v3/repos/hooks/
