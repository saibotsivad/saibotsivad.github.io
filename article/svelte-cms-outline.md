---
title: Using Svelte for a CMS
description: The outline of what I currently think is a reasonable custom built CMS framework.
date: 2017-07-05 11:57
layout: article
published: false
---

In my current work with [From Now On](http://from-now-on.com/) I inherited
a CMS website that was built with old technology, created in a rush, and had a lot of
[fundamental](https://medium.com/javascript-scene/how-to-fix-the-es6-class-keyword-2d42bb3f4caf)
issues. In the process of upgrading the site, we decided to use a totally amazing
no-framework JS tool called [Svelte](https://svelte.technology/).

After having spent a few months slowly rebuilding the existing CMS, I have
a design approach that seems to be working pretty well and is easy to modify
and maintain, so I'm going to describe it here!

## Intro

First of all, I'll introduce Svelte using a thing that I've been calling
a "form field". It's really just a reusable single form element, like
a text input, a checkbox, that sort of thing, created as a Svelte component.

### Intro: Bootstrap

We are using [Bootstrap](http://getbootstrap.com/), so an example text
input field might be these HTML elements:

```html
<div class="form-group">
	<label for="firstname">First Name</label>
	<input type="text" class="form-control" id="firstname" placeholder="Name">
</div>
```

With bootstrap you can add a class to the `div.form-group` element to indicate
the "validation state" of that field. So you would have these HTML elements for
a form field that had an error state, and it would get a nice red outline around
the `input` element:

```html
<div class="form-group has-error">
	<label for="firstname">First Name</label>
	<input type="text" class="form-control" id="firstname" placeholder="Name">
</div>
```

### Intro: Svelte

I've found it helpful to compose Svelte components using these guides:

* Reusable components never use two-way binding
* Data goes in to the component with `value="{{myThing}}"`
* Data comes out as emitted events using `on:eventName="handler(event)"`
* In particular, components should emit `change` events and
	take in data as `value`

Inside the base components I've found it works really well to use two-way
binding like this:

```
<input
	type="text"
	bind:value="value"
	on:change="fire('change', value)">
```

This means that the browser-based `change` event will cause the
component to fire its own `change` event which is the now-updated
`value` property.

## Combine Svelte with Bootstrap

With those pieces, I created a dozen or so core "form field" components, which
were built to be consistent with our UI guide. Since we are using Bootstrap
I basically created a bunch of Svelte components that were all simple
form-group Bootstrap elements.

Here's a complete example that I will explain:

```html
<!-- FormFieldText.html -->
<div class="form-group {{state ? `has-${state}` : ''}}">
	{{#if label}}
	<label
		for="{{id}}"
		class="control-label"
	>
		{{label}}
		{{#if helptext && showHelptext}}
		<span class="text-muted">({{helptext}})</span>
		{{/if}}
	</label>
	{{/if}}
	<input
		type="text"
		class="form-control"
		id="{{id}}"
		placeholder="{{placeholder || ''}}"
		bind:value="value"
		on:change="fire('change', value)"
		on:focus="set({ showHelptext: true })"
		on:blur="set({ showHelptext: false })"
	>
</div>
```

There's a lot going on here, so let me break it down:

* The root element has a `form-group` class, and if the `state`
	of the component is set, it'll also have `has-STATE`.
* Sometimes I want to use Bootstrap form labels, so if those
	are passed in we'll use them.
* Inside the label, we have the option of some nice help text. The
	help text in this example is only visible when focus exists
	in that `input` element, using `on:focus` and `on:blur` events.
	It's a nice way to limit text on screen, so it doesn't look too
	busy, but you'll need good placeholder microcopy so users are
	never confused.
* For good page design, you'll want to tie the `label` to the
	`input` element, and you do that with the `for`/`id` attributes.
	I recommend including a default data value for `id` which uses
	something light [like this](https://www.npmjs.com/package/random-uuid-v4).
* If the `placeholder` value isn't set, it'll actually show up as
	"undefined" in the input field. Not what we want, so `|| ''`
	for a blank string default.

You might use this component like:

```html
<!-- UsingFormFieldText.html -->
<FormFieldText
	label="First Name"
	placeholder="Name"
	helptext="Must be 2-20 characters."
	value="{{firstname}}"
	on:change="update('firstname', event)"
/>
```

## Form Components

If form fields are single input elements, than what happens if
we want to make a reusable set of those fields? I've been calling
them "form components" so far, and I've found it helpful to follow
these guides when making form components:

* The main component never uses two-way binding, and the inner
	components don't either
* Main data still goes in to the component with `value="{{myThing}}"`
* Data still comes out as emitted events using `on:eventName="handler(event)"`
* Components should try to emit `change` events and take in
	data as `value` but each component may be unique so you'll
	want to document each one

For example, if I find myself 
