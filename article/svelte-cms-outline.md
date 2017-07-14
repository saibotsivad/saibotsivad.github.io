---
title: Using Svelte for a CMS
description: The outline of what I currently think is a reasonable custom built CMS framework.
date: 2017-07-05 11:57
layout: article
published: true
---

{% raw %}

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
the "validation state" of that field. So if you wanted a nice red outline around
the `input` element to indicate an error, you would add the `has-error` class
to the `div.form-group`:

```html
<div class="form-group has-error">
	<label for="firstname">First Name</label>
	<input type="text" class="form-control" id="firstname" placeholder="Name">
</div>
```

Bootstrap is opinionated, and I don't use all of it, so later I'll show
you how to customize it for your own site.

### Intro: Svelte

The bits of Svelte that I consider the fundamentals are that you write
in mostly normal HTML, you pass data in as attributes, and you pass data
out as events:

```html
<!-- SomeForm.html -->
<MyComponent
	myStuff="{{things}}"
	on:namedEvent="myHandler(event)"
/>
```

Svelte does support two-way binding, and I will show you how I use
it safely. For now though, two-way binding is not something that you
will generally use. Instead, a component will take in a named property
and emit named events.

In the above example:

* The property `things` will be available in the component `MyComponent`
	scope as the variable name `myStuff`.
* The component is emitting events like you would normally use in JavaScript.
	So `component.on('namedEvent', myHandler)` becomes `on:namedEvent`. The
	property named `event` is the reserved name for the emitted event.

### Intro: Composing Components

Since we are building a CMS, mostly we are dealing with a lot of views that have
forms, with lots of inputs. And in anything like that, you'll definitely end
up with repeatable chunks that you don't want to rewrite for every view.

What I've ended up doing is distinguishing between components that are the
lowest level and emit single events (like a text input element with minimal
classes/styling), versus components that contain one or many of those low
level components.

Currently I've named them "form *field*" (for a single field) and "form *element*"
for a composed set of fields. That naming isn't very clear, so I'll probably
change it when I think of something better.

The biggest issue here is that you want all your different components to
be taking in consistently named values, and emitting consistently named
events. In HTML `<input>` elements, it seems that the norm is naming the
value input `value`, and the native emitted change event is usually
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

(For example, I wrote a
[difference accumulator](https://github.com/saibotsivad/difference-accumulator)
that we use at work, and I'll demo in here.)

If it isn't clear why this design decision is powerful, it should
become clearer in some of the later sections.

## The Framework

With all the pieces described in the intro section, we are ready to begin
putting it all together into something useful and powerful. We will start
with building Svelte forms, including with error handling, then we will
look at a design for handling changes from those forms. With those ideas,
we can build any kind of view.

### The Framework: Form Fields

As I've said, I'm not real happy with the name, but a "form field" is an
individual field, like a single text input.

For something like a text input, there are a few properties that you will
almost always want to have, and where you have them you'll want them to
be consistent. You'll want to build up a library of these fields which are
built and styled (themed) for your site.

Since we are using Bootstrap, here's what a complete text input field looks like:

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

* The root element always has a `form-group` class, which is what
	Bootstrap uses to give it base styles.
* If the `state` of the component is set, it'll also have `has-STATE`,
	so e.g. `has-error`, which will apply some nice Bootstrap styles
	to indicate the input state.
* Sometimes we want to use Bootstrap form labels, so if those
	are passed in we'll use them.
* Inside the label, we have the option of some nice help text. In our
	framework, I've made the help text visible only when focus is set
	in that `input` element, using `on:focus` and `on:blur` events.
	We've found that this is a nice way to limit text on screen, so it
	doesn't look too crowded or busy with a bunch of help text. This
	works well with text input fields that have focus, but not so well
	with select or radio/checkbox inputs. In any case, you'll want to
	create these form-field components to have styling consistent with
	your overall site.
* For good page design, you'll want to tie the `label` to the
	`input` element, and you do that with the `for`/`id` attributes.
	I recommend using the Svelte default-data property to set a
	default data value for `id`. We use [this](https://www.npmjs.com/package/random-uuid-v4)
	to generate UUIDs, since it's so light.
* If the `placeholder` value isn't set, it'll actually show up as
	"undefined" in the input field. That's not pretty, so we use `|| ''`
	for a blank string default.

In addition, you'll notice that I am using two-way binding here, with
`bind:value="value"`, and then when the `on:change` event is fired,
I'm using `value` instead of `event`.

This is for simplicity: the `change` event fires an actual DOM/JS event,
so you would need `fire('change', event.target.value)` and there are some
lifecycle issues that I don't understand very well yet, so it ends up
being simpler to write it that way. (Svelte also runs code on the `onchange`
event, which handles updating the scope `value`, and then fires the
Svelte-flavored `on:change` event.)

Note also that we are watching for the `change` event. This means the
value will not update until that text input field loses focus, which
has worked well in almost all cases so far. There may be cases where
you want to watch for actual keypresses, but it's likely that you can
create a good user experience with `change` only.

You might compose this form-field component in a form like this:

```html
<!-- NameForm.html -->
<div class="row">
	<div class="col-xs-12 col-md-6">
		<FormFieldText
			label="First Name"
			placeholder="Jean"
			helptext="Must be 2-20 characters."
			value="{{firstname}}"
			on:change="fire('change', { firstname: event })"
		/>
	</div>
	<div class="col-xs-12 col-md-6">
		<FormFieldText
			label="Last Name"
			placeholder="Phillipe"
			helptext="Must be 2-20 characters."
			value="{{lastname}}"
			on:change="fire('change', { lastname: event })"
		/>
	</div>
</div>
```

Notice that this `NameForm.html` uses multiple components, and on a
change event for each component it fires that data structure discussed
in the intro: `{ key: value }`.

Using this data structure consistently means that you can use the `NameForm`
component inside a bigger form, listen for change events, and know the
emitted data is always consistent.

That brings me to the next section!

### The Framework: Forms

Each editable page view within the CMS can be thought of as a "form",
which (in this framework) is a component containing any number of
form-field components or form elements. After this we'll build a few
tools to make it easier to interact with these forms.

In general, you might think of a "form" as something that's a complete
component, not meant for re-use. Because of that, I've set the input
data on the property `form` instead of `value`, but consistency might
end up being better instead.

Here's a much-shortened example of a form within our app, used to
edit games (like football, soccer, etc.):

```html
<!-- GameEdit.html -->
<h1>{{form.title}}</h1>
<fieldset disabled="{{saving}}">
	<div class="row">
		<div class="col-xs-12 col-lg-6">
			<h2>Teams</h2>
			<FormFieldSelect
				label="Our Team"
				options="{{teams}}"
				selected="{{form.teamId}}"
				state="{{state.teamId}}"
				on:change="fire('change', { teamId: event })"
			/>
			<FormFieldText
				label="Their Team"
				value="{{form.opponentName}}"
				state="{{state.opponentName}}"
				on:change="fire('change', { opponentName: event })"
			/>
		</div>
		<div class="col-xs-12 col-lg-6">
			<h2>Images</h2>
			<ImagesBasic
				value="{{form}}"
				state="{{state}}"
				on:change="fire('change', event)"
			/>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<button on:click="fire('save', form)">Save Changes</button>
		</div>
	</div>
</fieldset>

<script>
import FormFieldSelect from './FormFieldSelect.html'
import FormFieldText from './FormFieldText.html'
import ImagesBasic from './ImagesBasic.html'

export default {
	components: { FormFieldSelect, FormFieldText, ImagesBasic },
	data() {
		return {
			// If `form` or `state` are ever undefined, this form
			// component will break and throw a null pointer exception,
			// so we set the defaults.
			form: {},
			state: {}
		}
	}
}
</script>
```

Note a couple things:

* When the `disabled` attribute is set on the `<fieldset>` element, it
	disables all the input fields, thanks to Bootstrap styles.
* The `form` object properties are passed in to the child components
	and we aren't using two-way binding to monitor their changes. In
	general this is a more maintainable approach, but in certain cases
	you may find that two-way binding makes the design easier to
	understand. Be cautious at all times--you probably don't need it.
* The components corresponding to `<select>` and `<input type="text">`
	elements are passed a single property (e.g. `form.teamId`), but
	the `ImagesBasic` component is passed the full form. Be cautious
	here as well--don't expose any more to the child component than
	you need to. In this case, the `ImagesBasic` component uses a
	handful of image properties on the form, common across our app.
	(For example, a thumbnail image and a larger image.) Since that
	component uses multiple properties on the `form` object, we just
	pass it in entirely.
* The `ImagesBasic` component still emits a `change` event, but since
	we've defined data structure to use for changes, we know that the
	change event here will be an object containing a "diff" as I
	talked about in the intro. That means we can put the `ImagesBasic`
	component in here and know that it will work just fine.

These form components are used, not inside other Svelte components, but
inside a [state router](https://joshduff.com/2015-06-why-you-need-a-state-router.md),
so we'll have something like this:

```js
// imagine that `component` is an already loaded and
// active Svelte component
function activateView(service, component) {
	// we keep track of the changes
	const changes = {}
	component.on('change', diff => {
		Object.assign(changes, diff)
	})
	// when the form is saved, disable the component form,
	// then call a service to save changes
	component.on('save', form => {
		component.set({ saving: true })
		service
			.call('save form', { diff, form })
			.then(updatedForm => {
				// when the form save is complete, update it
				// with the final updated form
				component.set({
					form: updatedForm,
					saving: false
				})
			})
	})
}
```

In practice, it gets more complicated than this, but that's the core principle.
For any field (and for the complete form) you should always be thinking about the
[possible states](http://scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack)
it can be in.

## Writing Tests

Testing Svelte components is a little tricky, because you'll probably need
to compile them before testing. I did that by using
[glob-module-file](https://www.npmjs.com/package/glob-module-file),
[browserify](https://www.npmjs.com/package/browserify), and
[tape-run](https://www.npmjs.com/package/tape-run). I name all the Svelte
tests like `*.test-svelte.js` and then have this in the `package.json`:

```json
{
	"scripts": {
		"test": "glob-module-file --pattern='./**/*.test-svelte.js' | browserify - | tape-run"
	}
}
```

This will glob up all your Svelte tests and execute them inside
[electron](https://electron.atom.io/). That's not exactly _fast_, but
I haven't found a better way that I like yet.

## Now What?

Of course there's a lot more to building a framework, and we've made many
architectural decisions within our app already that are custom to what
we want to accomplish.

Since I'm running out of steam writing this, I thought I'd list some
modules that we use, and some that I've personally found to be very
useful. I'd advise you to either use these tools/modules, or learn
enough to see the idea they are trying to solve, and see if those
concepts are worth integrating into your own app.

* You [definitely need](https://joshduff.com/2015-06-why-you-need-a-state-router.md)
	some sort of "state router" to control your views. I've personally got
	a lot of mileage out of the [abstract state router](https://github.com/TehShrike/abstract-state-router),
	and I recommend it highly. If you're familiar with the `ui-router`
	from AngularJS (the 1.x days) then you'll probably be familiar
	conceptually with this.
* You [really want a way](http://youtu.be/b5pFv9NB9fs) to decouple
	"calling functions" from "getting responses" (watch the video
	in the link). When I've used [mannish](https://www.npmjs.com/package/mannish)
	I have really enjoyed it. It doesn't enforce any naming conventions,
	so you'll probably want to come up with some and document them.
* To accumulate changes in a form, I wrote this
	[difference accumulator](https://www.npmjs.com/package/difference-accumulator).
	I think that whether you need it or not will be highly dependent
	on the architecture you build, but I've found it to be pretty valuable for us.
* Using Bootstrap gives a lot of pre-set opinions. That can be useful,
	since you get a pretty solid cross-browser experience out of the box.
	We actually compile the CSS from the Bootstrap LESS files on
	deploy, which gives us a lot more flexibility. If you copy the
	main LESS file (the one that imports everything) you can even
	leave out parts that you don't use (like glyphicons) and thus
	slim the built CSS file a bit. Using Bootstrap is a reasonable
	experience, so long as you build from LESS and get your head
	thinking in the "Bootstrap way".

## The End

That's all for now!

If you've got questions about any of this, or want to pick my
brain about ideas, don't hesitate to ask by
[opening a Github issue](https://github.com/saibotsivad/saibotsivad.github.io/issues).

Eventually I'd like to put together a demo of all this, and if
I do I'll update this document. You could open a Github
issue about it and that might be easier to track than this website.

## License

This article and all code herein, I release under the
[Very Open License](http://veryopenlicense.com).

{% endraw %}
