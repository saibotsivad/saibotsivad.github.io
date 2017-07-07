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

I'll introduce some of the tools and concepts used. We use Bootstrap for
fast styling, Svelte for the templates/HTML, and some data structures to
make message passing and object saving consistent and easier to pull into
the brain.

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

The bits of Svelte that I consider the fundamentals are that you
pass data in as a named attribute, and you pass data out as events:

```html
<!-- SomeForm.html -->
<MyComponent
	myStuff="{{things}}"
	on:namedEvent="myHandler(event)"
/>
```

Svelte does support two-way binding, and I will show you how I use
it safely. For now though, two-way binding is not something that you
will generall use. Instead, a component will take in a named property
and emit named events.

In the above example:

* The property `things` will be available in the component `MyComponent` as
	the variable name `myStuff`.
* The component is emitting events that you would normally use in JavaScript,
	so `component.on('namedEvent', myHandler)` becomes `on:namedEvent`. The
	property named `event` is the reserved name for the emitted event.

### Intro: Composing Components

Since I'm building a CMS, mostly I am dealing with a lot of views that have
forms, with lots of inputs. And in anything like that, you'll definitely end
up with repeatable chunks, that you don't want to rewrite for every view.

What I've ended up doing is distinguishing between components that are the
lowest level and emit single events (like a text input element with minimal
classes/styling), versus components that contain one or many of those low
level components.

Currently I've named them "form *field*" (for a single field) and "form *element*"
for a composed set of fields. That naming doesn't sound great, so I'll probably
change it eventually when I think of something better.

The biggest issue here is that you want all your different components to
be taking in consistently named values, and emitting consistently named
events. In HTML `<input>` elements, it seems that the norm is the value
input is named `value`, and the native emitted change event is usually
named `onchange` or `on:change` in Svelte. Let's keep that, and stick
with these guidelines:

* Reusable components shouldn't generally use two-way binding.
* Data should normally go in with `value="{{property}}"`.
* Data should normally emit under the name `change`, e.g. `on:change="handler(event)"`.

Specifically, the low-level components should really attempt to adhere
to those guidelines.

### Intro: Data/Message Structure

What I really wanted to end up with was some component that could
look like this:

```html
<!-- MyForm.html -->
<ComponentOne
	value="form.propertyOne"
	on:change="...do something one..."
/>
<ComponentTwo
	value="form.propertyTwo"
	on:change="...do something two..."
/>
```

And so I wanted all the components to emit change events that were
consistently shaped.

What I ended up doing is following these rules:

**Low-level form components emit raw values.**

For example, a form component that is a wrapper for an `<input type="text">`
would emit a change event where `typeof event === 'string'` and so on.

**Higher-level form components emit "change" objects.**

These change objects look like this:

```json
{
	"namedProperty": "emitted value"
}
```

So for example, a higher-level component that handles a first and last
name might emit a change event that looks like this:

```json
{
	"firstName": "Billy"
}
```

Because the thing emitted is an object, it can emit a change object
containing multiple properties, at any depth. For example, an address
book component might emit a change event that looks like this:

```json
{
	"person": {
		"firstName": "Billy",
		"lastName": "Badger"
	},
	"age": 72
}
```

Because of this consistent behaviour, a view that is a complex form
really is just a component that emits bigger change objects, and you
can make some utilities to accumulate and save overall emitted changes.

(I wrote a [difference accumulator](https://github.com/saibotsivad/difference-accumulator)
that we use at work.)

If it isn't clear why this design decision is powerful, it should
become clearer in some of the later sections.









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
