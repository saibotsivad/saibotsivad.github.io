---
title: Setup a Node serve on Digital Ocean
---

This is all done using the Digital Ocean API, so you'll want to
read these instructions for how to get an API token:

https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2

That leaves me with an API token, which looks like:

	aaa5e07c93afb654f87f511253a52fa49aebd46e0fa37510b887226659ef3f0d

Which you then use, with curl, like this:

	curl -X GET "$URL" -H "Authorization: Bearer $TOKEN"

I prefer to use [httpie](https://github.com/jkbrzt/httpie), which looks like:

	http $URL Authorization:"Bearer $TOKEN"

So now we want to set up a machine with node and nginx.

I'm going to use an Ubuntu OS, since that's what I'm familiar
with, and it works pretty well.

The JSON object for that looks like:

	{
		name: 'droplet-name',
		region: 'nyc',
		size: '512mb',
		image: 'ubuntu-15-10-x64'
	}

So now the curl command looks like:

	curl -X POST "https://api.digitalocean.com/v2/droplets" \
		-d'{"name":"droplet-name","region":"nyc2","size":"512mb","image":"ubuntu-15-10-x64"}' \
		-H "Authorization: Bearer $TOKEN" \
		-H "Content-Type: application/json"

