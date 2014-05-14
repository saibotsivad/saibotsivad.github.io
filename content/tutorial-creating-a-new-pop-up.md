title: WordPress Tutorial: Creating a new pop-up
date: 2011-04-14 08:06
excerpt: 
categories: wordpress

Have you ever wondered how to make your own pop-up I-Frame in WordPress, like the one used in blogs? Something that looks like this, but with custom interior HTML?
[![](http://www.tobiaslabs.com/media/2011/04/thickboxpopup-300x101.jpg)](http://www.tobiaslabs.com/media/2011/04/thickboxpopup.jpg)

You can probably think of about a billion uses for something like this, but there are probably very few uses that I would consider legitimate. Using the approach I outline below gives great power, but with it, as Uncle Ben says, comes great responsibility.

I'll be outlining the code used, and describing each section carefully, but you can download the final code from [this link](http://www.tobiaslabs.com/media/2011/04/tobiaslabs-addthickbox.zip) (a zip file, installable directly as a plugin).

There are two files here, the first one is the core code for the plugin, and the second is what creates the pages within the pop-up page. Here's what's in the first file:

## Core Plugin File

Most plugins that I write are enclosed inside a PHP class, to avoid namespacing issues. PHP now supports proper namespaces, but may not be supported on older version of PHP. For this example, we'll create the basic class:
<pre>$MyThing = new MyThing_Class;
class MyThing_Class {</pre>
Now, you don't need to put the following information as variables, but for the purpose of this tutorial I think it will be helpful:
<pre>private $html_name = 'myupload';
private $page_name = 'mynewpage';
private $title_name = 'My Sweet Pop-Up';
private $popup_width = '600';
private $popup_height = '400';
private $link;</pre>

*   `$html_name` is the name used by the pop-up link, and is part of the `add_action` used to add the pop-up.
*   `$page_name` is part of the URL as `$_GET['paged']`
*   `$title_name` is the title of the pop-up box
*   `$popup_width` and `$popup_height` are the size parameters for the pop-up box
*   `$link` holds the link to the thickbox page
Inside PHP classes, the function `__construct()` is run whenever the class is initialized with `$var = new MyClass` so the function is used to place all the `add_action` and similar hooks:
<pre>
function __construct()
{
add_action( 'admin_menu', array( $this, 'MyMenu' ) );
add_action( 'media_upload_'.$this-&gt;html_name, array( $this, 'MyFrameAdder' ) );
add_action( 'admin_init', array( $this, 'AdminInit' ) );
$this-&gt;link = get_bloginfo('url')."/wp-admin/media-upload.php?tab={$this-&gt;html_name}&amp;TB_iframe=1&amp;width={$this-&gt;popup_width}&amp;height={$this-&gt;popup_height}";
}
</pre>
The `add_action` sets should be familiar, the second paramater is the function name, but inside a class it is stored as an array, with `$this` being a reserved PHP variable, and the second element of the array as the function name.

Let's look at the functions listed:
<pre>
function MyMenu()
{
add_options_page(
	'My Thing Options',
	'My Thing',
	'manage_options',
	$this-&gt;page_name,
	array( $this, 'MyDisplay' )
);
}
</pre>
The function `MyMenu` is called when WordPress creates the admin menus. In this example we'll just add a menu item in "Settings". The first two lines are the two labels used, the second one, `My Thing` in this case, is the label that will show up in the "Settings" menu. The third element, `manage_options` is a test that determines which users will be able to see the menu item. See the [Roles and Capabilities](http://codex.wordpress.org/Roles_and_Capabilities) section for more tests.

<pre>
function AdminInit()
{
if ( isset( $_GET['page'] ) &amp;&amp; $_GET['page'] == $this-&gt;page_name )
{
wp_enqueue_script( 'thickbox' );
wp_enqueue_style( 'thickbox' );
}
}
</pre>
It's bad practice to just queue up scripts everywhere, so we limit it to just the settings page made in the `MyMenu` function.

<pre>
function MyDisplay()
{
echo "

<a id='my_thickbox' class='button-secondary thickbox'>title_name}' href='{$this-&gt;link}'&gt;Click Here!</a>
";
}
</pre>
The function `MyDisplay` would normally display settings, and you would want to work out a way to show and save them, but here all we are doing is adding a link which will call the Thickbox pop-up when clicked.

<pre>
function MyFrameAdder()
{
	wp_iframe( array( $this, 'MyUploadForm' ) );
}
</pre>
We need to use `wp_iframe` (defined in /wp-admin/includes/media.php) to register the frame used to display our new pop-up HTML. The Thickbox pop-up is actually just an embedded [iframe](http://en.wikipedia.org/wiki/HTML_element#Frames), styled to look like a pop-up.

<pre>
function MyUploadForm()
{
	include( 'popuppage.php' );
}
</pre>
All this does is call in the pop-up display PHP. Depending on how big your setup is, you might find it just as handy to print out the HTML right here, of course.

All that's remaining for this file is to end the class with a `}`

## The Pop-Up File

The pop-up file is the file included in the previous `MyUploadForm` function. It basically just spits out HTML, but you'll want at least one security check, this is the start of the file:
<pre>
&lt; ?php
if ( !current_user_can(&#039;upload_files&#039;) ) :
wp_die(__(&#039;You do not have permission to upload files.&#039;));
else:
</pre>
We can just wrap the whole file in this `if` statement, to secure it a little more. Now the rest of the output is just whatever HTML you want. Here's a sample that shows how a simple two-paged pop-up could be constructed:
</pre><pre>
if ( isset( $_GET['paged'] ) &amp;&amp; $_GET['paged'] == '2' )
{
echo '

This is page 2.
';
}
else
{
echo "

<a>link}&amp;paged=2'&gt;Click to go to page 2.</a>
";
}
</pre>
That's really it! Here's what it looks like right now:
[![](http://www.tobiaslabs.com/media/2011/04/thickboxpopup_new-300x104.jpg)](http://www.tobiaslabs.com/media/2011/04/thickboxpopup_new.jpg)

## Final Notes

The variable `$_GET['page']` is reserved by WordPress, and if you use it in your pop-up you'll end up with a broken page, usually it dies saying "You don't have sufficient permission" or similar.

Obviously you'll need to use some [wp_nonce](http://codex.wordpress.org/Function_Reference/wp_nonce_field) security checks inside your pop-up window.

For media management, check out the file at /wp-admin/media-upload.php for a little inspiration.

I don't think I ever would have figured this out without the help of jameslafferty, so a big thanks to him!

Again, here's the [full code download](http://www.tobiaslabs.com/media/2011/04/tobiaslabs-addthickbox.zip).