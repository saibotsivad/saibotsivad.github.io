---
title: Ubuntu, nginx, NodeJS, socket.io, and Lets Encrypt
---

I imagine that, apart from the initial VPS creation (which uses the Digital Ocean website), most of the rest of this will work for any VPS setup.

Please let me know if any of these steps need updating, and I'll go through and update this walkthrough.

---

## create VPS

Inside Digital Ocean, the options I selected were:

* Ubuntu 15 x64
* 512MB
* No "additional options"
* Add in an SSH key

Then create it, and when it's done click into it to see what the assigned IP address is.

To route a domain to that instance, I went into the Digital Ocean "Networking" tab, then "Domains", then added the domain to that "droplet".

I added the domain [simplecrud.tobiaslabs.com](http://simplecrud.tobiaslabs.com/) as a domain, since that's a site I use to test/demo this setup.

## install node/npm

Following the [NodeJS recommendation](https://docs.npmjs.com/getting-started/installing-node) I installed node 6:

	sudo apt-get install curl
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs

Verify the version of npm and node:

	node --version
	npm --version

Make sure you have the latest version of npm by running:

	npm install -g npm

## install nginx

Install nginx and the nginx extras (for header manipulation, among other things):

	sudo apt-get install -y nginx nginx-extras

Verify that nginx is running by navigating to the server's IP address directly at `http://$IP_ADDRESS/` and you should see a page that says `Welcome to nginx`.

> Note: When I did this on Digital Ocean, nginx was running after install, but if you have problems check out [these instructions](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-12-04-lts-precise-pangolin) on starting it manually.

Make nginx start at system bootup by adding it to the `rc.d` file:

	sudo update-rc.d nginx defaults

Verify that this works by rebooting the computer:

	sudo shutdown -h now

After it reboots, navigate to `http://$IP_ADDRESS/` and verify that the welcome page is displayed. If it is, this means nginx has started at system boot.

## configure nginx

This part I'm pretty unsure about, because (at least on Digital Ocean) installing nginx comes installed with some reasonable defaults. However, in the interest of documenting the setup, I'll explain my understanding of it.

The main configuration file is at:

	/etc/nginx/nginx.conf

At the end of the `http` block, there is a line that looks like:

	include /etc/nginx/sites-enabled/*;

This is important, because it's where the enabled sites will place their nginx configuration files, and then nginx will automatically add those when it reloads.

## install [spin-nginx](https://github.com/tobiaslabs/spin-nginx)

This is what I'm using to manage my installs. Check out the link for more info. Install it like this:

	npm install -g spin-nginx

## configure `spin-nginx`

TODO





## add a website














---

## create VPS and add users

I started with an Ubuntu 15 x64 "droplet" (a VPS instance) with 512MB, this gave me a VPS instance and an IP address to access it. Then I clicked the "add domain" and added my domain to that droplet (`gitver.com`), and added an SSH key, giving that key access to the VPS.

My domain registrar is Dreamhost, so I went to my management console and changed the nameservers to use the Digital Ocean ones. (This takes a while to propagate, but in the meanwhile I can connect via IP address.)

Trying to log in via SSH is not bad, but Mac OSX has an issue that drives me absolutely *batty*. The normal command to SSH is this:

	ssh root@ipaddress ~/.ssh/privatekey

If you're concerned about security, you'll have your private key password protected, and you'll use a *serious* password, which means you'll be using a password manager. This isn't normally an issue, but Mac OSX uses a popup prompt to enter the password, and they've disabled pasting into the input.

The workaround, which is probably only applicable on Mac OSX, is to run the command:

	ssh-add ~/.ssh/privatekey

Which will prompt for the password *on the command line*, which allows pasting.

Because running as `root` worries me, I set up a new user:

	adduser johndoe

Then, I wanted to give this user root privileges, so I ran this command as `root` to add the new user to the sudoers list:

	gpasswd -a johndoe sudo

Then, I definitely want to be able to log in via SSH with this user, so I created a key pair for them. Following [this useful guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04), I generated a new key and installed the public key out to the VPS.

I then confirmed this was all set up by exiting the SSH session and attempting to log in as the new user:

	ssh johndoe@ipaddress ~/.ssh/newuserprivatekey

Now we've got a VPS configured with a `root` user and a normal user, and it's got Ubuntu on it. We've also got the DNS configured for the domain, but it'll still be a while before that domain resolves to this box.

---

## install npm

NodeJS recommends [this way](https://docs.npmjs.com/getting-started/installing-node) (you might already have `cURL` installed):

	sudo apt-get install curl
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs

You can check the version of npm by running `npm -v`. It'll probably be an old version, in which case you'll want to update it:

	sudo npm install npm -g

Next, to make permissions easier, I [fixed the npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) (I use option #2) so that modules install to the user directory instead of the root directory.

	mkdir ~/.npm-global
	npm config set prefix '~/.npm-global'

Add the new npm location `bin` folder to the path by editing the `~/.profile` file (make a new file if it doesn't exist):

	export PATH=~/.npm-global/bin:$PATH

And then run `source ~/.profile` to activate for this session (it'll be on all future sessions).

Now we've got NPM installed with safe permissions.

---

## install nginx

Installing nginx on Ubuntu is pretty easy:

	sudo apt-get install nginx

I also want to be able to do some header manipulation and other things, so I installed the extra module bits:

	sudo apt-get install nginx-extras

Digital Ocean has [some instructions](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-12-04-lts-precise-pangolin) on starting nginx, but I found that, after installing it, it was already running.

If you don't know the machines IP address, you can check it using this command:

	ifconfig eth0 | grep inet | awk '{ print $2 }'

You can make sure that nginx is running by going to your servers IP address. If nginx is running, you'll be greeted by a minimalist page that says "Welcome to nginx!".

You'll also want to make sure nginx starts at system bootup. Add it to the `rc.d` file, which is what runs at bootup, by running the command:

	sudo update-rc.d nginx defaults

I don't know a way to check that this works other than rebooting the computer. So go ahead and do that. Most VPS providers have a web interface that lets you power cycle the box, but you can probably do it on the command line:

	sudo shutdown -h now

Then restart the box via the web interface, and once it's running visit the IP address. The same nginx welcome screen should be visible.

If you don't restart the box, you'll want to restart nginx at this point, to pull in the extra bits:

	sudo service nginx restart

---

## how files are structured

Because the nginx reflects the hosting and deployment decisions, it's probably important to discuss that setup.

Most of these thoughts on deployment are influenced by [this amazing article](https://zachholman.com/posts/deploying-software).

> Note: The main change that I made was based on my dislike of the deployment type being a color: green and blue have meaning that is easy to conflate with performance. E.g. "the server is green" means "the server deployment is on a particular branch", but can be misunderstood to mean "the server status is that everything is okay".
>
> Because of this, I decided to borrow naming from one of my hobby fields: [quantum mechanics][qm]. The deployment kind is called a "spin", and the two spins are the "fermion" and "boson".

[qm]: https://en.wikipedia.org/wiki/Spin_(physics)#Fermions_and_bosons

Generally speaking, all websites are deployed from

	/var/www/DOMAIN/

I also like to configure my sites on a domain level like so:

* Anything served from `site.com` is given low caching times, so it isn't cached by the client very long.
* I've decided to serve bundled JS/CSS and other immutable assets from the domain `forever.site.com`, as an indication that anything served from there should be referenced by *hash*, and not *name*.
* If I develop non-static interfaces for a site, such as an HTTP-based API or socket.io, I like to serve from `api.site.com` and give it version numbers if possible. Aka `api.site.com/namedapi/v1/`.
* Having a site like `site.com/page?key=val` generate custom HTML content and serve it is a special case that I try very hard to avoid, instead favoring single-page apps and good APIs. I haven't run into a case where this hasn't worked, but configuring nginx to handle that should be pretty easy.

Because of this, my general routing rules are (in pseudo code):

	if (domainExists && domain.startsWith('api.')) {
		// serve from a node.js app at a specific port
	} else if (domainExists && fileExists) {
		if (domain.startsWith('forever.')) {
			// set headers to cache forever
		} else {
			// set headers to normal non-cached
		}
		if (shouldServeCompressed) {
			// serve compressed file
		} else {
			// serve it as-is from disk
		}
	} else {
		// return a 404
	}

Also, I require my deployments to have zero downtime, so I'll have to figure that out in the configs. You can reload nginx configs with:

	nginx -s reload

For serious zero-downtime, what you really need is *two* servers, so that your deploy looks like (using `fermion` and `boson` as the servers):

1. Running domain is at `/var/www/fermion/site.com` and nginx is configured to point *all* requests to `fermion`.
2. Copy new files to `/var/www/boson/site.com`
3. Start node.js process, if needed, to a different port
4. Change the nginx config so new requests go to `boson`.
5. Have nginx reload config, which is a zero-downtime process.
6. Verify that the site is running correctly and no connections are made to `fermion`.

If you find that `boson` is not running correctly, all you need to do to revert is:

* Change the nginx config so new requests go to `fermion`.
* Have nginx reload the config.

Otherwise, if everything is working fine, you can simply shut down `fermion`.

> Note: One other thing I like to do is be able to start up the server on `*.stage.site.com` so that I can verify that everything is working before switching.
>
> I don't have this working yet, but it'll be my next update to this.

---

## configuring nginx

The docs that you'll want to read are:

* [nginx docs](https://www.nginx.com/resources/admin-guide/)
* [common pitfalls](http://wiki.nginx.org/Pitfalls)
* [quick start](http://wiki.nginx.org/QuickStart)
* [configuration](http://wiki.nginx.org/Configuration)

My setup had the main configuration file in `/etc/nginx/nginx.conf`

That file has a handful of generic settings, and near the bottom it says:

	include /etc/nginx/sites-enabled/*;

What this means is that any configuration we add to the folder `/etc/nginx/sites-enabled` will get added to the overall nginx setup. The general approach recommended is to put your configuration file in `/etc/nginx/sites-available`, and when you want to use that configuration, symlink it in the `sites-enabled` folder.

For each site I'm going to make a folder `sites-available/site.com/` and inside it make the following files:

* `fermion.conf` the `fermion` deployment configs
* `boson.conf` the `boson` deployment configs

(Eventually I'd like to be able to deploy any pull request at the click of a button to something like `$PULL_REQUEST.site.com` but that'll be a while still.)

If the server is `fermion`, I'd do the following:

* deploy the actual `boson` content/server
* symlink the `boson.conf` into the `sites-enabled`
* deleting the `fermion.conf` from `sites-enabled`
* issuing the nginx command to reload configs (`nginx -s reload`) which will put the server on `boson` with zero downtime
* shut down the `fermion` server

### forever-vhost.conf

Because of my setup, the forever server is immutable and doesn't need the two-server setup. The root for all domains will be `/var/www/forever`. Additionally, since the content is hash addressed, there's no need for subfolders per subdomain. This simplifies the problem to:

user johndoe;

	server {
		listen 80;
		server_name forever.* www.forever.*;
		root /var/www/forever;
		index index.html;
		error_page 404 404.html;
		access_log off;
		expires max;
		location / {
			# serve request as file or 404
			try_files $uri index.html =404;
		}
	}







	{
		http {
			index index.html;

			# forever server is immutable and doesn't
			# need the two-server setup
			server {
				listen 80;
				server_name forever.* www.forever.*;
				root /var/www/forever
			}

			# anything under the api is reverse
			# proxy to a nodejs app on a port, and
			# different colors have different ports
			server {
				listen 80;
				server_name api.*;
				# route to port?
			}

			# anything else should go to that
			# domain under that color
			server {
				listen 80 default_server;
				server_name site.com;
				server_name_in_redirect off;
				root /var/www/a/site.com
			}
		}
	}




---

## setup lets encrypt

[Let's Encrypt](https://letsencrypt.org/) offers a free way to get signed certificates to your server, so that you can use HTTPS. I definitely want that.

> Note: Let's Encrypt is still in beta, and doesn't officially support nginx yet, so these directions might change substantially.

I followed the Let's Encrypt [instructions](https://letsencrypt.org/getting-started/) and an [nginx blog](https://www.nginx.com/blog/free-certificates-lets-encrypt-and-nginx/) to make this work.

We need `git` to be installed, and apparently that didn't come on this box. Install via:

	sudo apt-get install git

Then the instructions say to do this (I ran it in the users home directory):

	cd ~
	git clone https://github.com/letsencrypt/letsencrypt
	cd letsencrypt
	./letsencrypt-auto --help

That downloads and sets up all the dependencies, which can take some time.

