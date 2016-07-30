title: Understanding AJAX requests
date: 2012-03-21 16:53

---

Have you ever written a post, started to type in a tag, and saw this sort of interface reaction:

[![](/content/2012/03/wordpress_tags_ajax.png)](/content/2012/03/wordpress_tags_ajax.png)

As you start to type in a tag, you'll see an auto-type show up. How does this work? One way is to pre-load the list within the DOM (either within the HTML or the JavaScript) and reference that list, but a cooler way, and a much more extensible way, is to use AJAX calls. Thankfully, WordPress supports them without much trouble!

Recently I needed to add functionality to take a given URL to an [Amazon](http://www.amazon.com) product, and retrieve the [ASIN](http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number) (Amazon unique ID) to store as information related to the post. Todays post shows one method to do this, using the AJAX callback.

**You can download the complete code [here](/content/2012/03/tl_amazonurl.zip).**

The example is relatively simple, and my preferred method is to put things inside a [PHP class](http://php.net/manual/en/language.oop5.php), so let's have a look at the first part:

## Hook actions:

<pre>$TL_AmazonURL = new TL_AmazonURL;
class TL_AmazonURL
{
	var $meta_key = 'amazonkey';
	function __construct()
	{
		add_action( 'add_meta_boxes', array( $this, 'MetaBoxSetup' ) );
		add_action( 'save_post', array( $this, 'SavePostMeta' ) );
		add_action( 'admin_head', array( $this, 'AdminHead' ) );
		add_action('wp_ajax_tl_amazonurl_ajax', array( $this, 'AjaxCallback' ) );
	}</pre>
If you aren't familiar with PHP classes within WordPress, just think of them this way: hook all the filters and actions inside the `__construct()` function, then you need to reference the functions for those hooks with an array referencing the class, `$this`, and the function `FunctionName`.

For this example, we'll store the ASIN as a post meta field, and put the interface in a metabox on the post view (more later), so we configure a metabox with `add_action( 'add_meta_boxes', array( $this, 'MetaBoxSetup' ) );`

When we add the ASIN, we'll put it in the post meta, therefore we want to verify the ASIN when the post is saved, so we register a function to run whenever a post is saved with `add_action( 'save_post', array( $this, 'SavePostMeta' ) );`

The AJAX requests require some custom JavaScript, so we'll need to enqueue some script (and CSS!), but only in the admin page loads, so we use `add_action( 'admin_head', array( $this, 'AdminHead' ) );`

Finally, AJAX requests are handled with specially registered AJAX callbacks that require the action `wp_ajax_` followed by your custom AJAX callback name, which needs to be distinct. In this example, our callback name is `tl_amazonurl_ajax` so we use `add_action('wp_ajax_tl_amazonurl_ajax', array( $this, 'AjaxCallback' ) );`

## Add Meta box:

Registering the metabox is as simple as calling [add_meta_box](http://codex.wordpress.org/Function_Reference/add_meta_box):
<pre>	function MetaBoxSetup()
	{
		add_meta_box(
			'tl_amazonurl',
			__( 'Amazon ASIN', 'tl_amazonurl_metaboxtitle' ),
			array( $this, 'MetaBox' ),
			'post',
			'side',
			'high'
		);
	}</pre>
Pick a unique label, it's part of the HTML for the meta box: `tl_amazonurl`

The title of the meta box, but thinking internationally we'll wrap it in the handy [translational](http://codex.wordpress.org/L10n) function `__();` which we won't take advantage of here, but it lets me point out lesser-known Best Practice: `__( 'Amazon ASIN', 'tl_amazonurl_metaboxtitle' )`

The function name, and metabox position are the remaining elements of the array. The final metabox, with no content, looks something like this:

[![](/content/2012/03/music1.png)](/content/2012/03/music1.png)

# Meta box contents:

There are two parts to the meta box contents, the HTML, and the CSS/JavaScript which we'll include in the admin-head function. The HTML looks like:
<pre>function MetaBox()
	{
		global $post;
		$asin = get_post_meta( $post-&gt;ID, $this-&gt;meta_key );
		$asin = ( $asin ? $asin[0] : "" );
		$nonce = wp_create_nonce( 'tl_amazonurl_nonce' );
		?&gt;
        &lt;div id="tl_amazonurl_div"&gt;
            &lt;p&gt;Paste in the URL from Amazon:&lt;/p&gt;
            &lt;input type="hidden" name="tl_amazonurl_checked" value="" /&gt;
            &lt;input type="hidden" name="tl_amazonurl_nonce" value="&lt;?php echo $nonce; ?&gt;" /&gt;
            &lt;input type="text" id="tl_amazonurl_link" name="tl_amazonurl_link" value="&lt;?php echo $asin; ?&gt;" /&gt;&lt;br /&gt;
            &lt;span id="tl_amazonurl_return"&gt;&lt;/span&gt;
            &lt;input type="button" id="tl_amazonurl_check" name="tl_amazonurl_check" value="Check URL" /&gt;
        &lt;/div&gt;
        &lt;?php
    }</pre>
The first few lines are the most important. We first look for the post meta by the defined key, using `$this-&gt;meta_key`, and for security we generate a [nonce](http://codex.wordpress.org/Function_Reference/wp_create_nonce) (read up on them!) with the name `tl_amazonurl_nonce`

The other important thing to notice is that there isn't any actual HTML form here. Instead, we'll call some JavaScript `onClick` to watch the `tl_amazonurl_check` button, and grab what's inside the input with the ID `tl_amazonurl_link`

The CSS and JavaScript is inside the `AdminHead` function, like this:
<pre>	function AdminHead()
	{
		?&gt;

		input#tl_amazonurl_link {
			width: 100%;
		}
		div#tl_amazonurl_div {
			text-align: right;
		}
		div#tl_amazonurl_div p {
			text-align: left;
		}
		input#tl_amazonurl_check {
			margin-top: 8px;
		}
		span#tl_amazonurl_return {
			float: left;
			height: 32px;
			margin-top: 6px;
			margin-left: 4px;
			padding-top: 6px;
			padding-left: 32px;
		}
		span#tl_amazonurl_return.success {
			background: url('') top left no-repeat;
		}
		span#tl_amazonurl_return.failure {
			background: url('') top left no-repeat;
		}

		jQuery(document).ready( function($) {
			$('#tl_amazonurl_check').click( function () {
				$('#tl_amazonurl_return').text('Checking...');
				$("#tl_amazonurl_return").removeClass("failure");
				$("#tl_amazonurl_return").removeClass("success");
				var data = {
					action: 'tl_amazonurl_ajax',
					amazonurl: $("#tl_amazonurl_link").val()
				};
				$.post(ajaxurl, data, function(response) {
					if ( response == 'fail' ) {
						$('#tl_amazonurl_link').val('');
						$('#tl_amazonurl_return').text('Invalid URL!');
						$("#tl_amazonurl_return").removeClass("success").addClass("failure");
					} else {
						$('#tl_amazonurl_link').val(response);
						$('#tl_amazonurl_return').text('Success!');
						$("#tl_amazonurl_return").removeClass("failure").addClass("success");
					}
				});
			});
		});

		&lt;?php
	}</pre>
The CSS is, I hope, mostly straightforward. If the AJAX call returns success we will use a green check-mark to give the user visual feedback, and a red x-mark if it fails. The rest of the CSS is small styling bits.

The real magic is in the JavaScript. Any WordPress page in the wp-admin area already queues up [jQuery](http://jquery.com/), so we can use that to do what we want, which is:

When you click the button to verify a URL in the text input box, we let the user know the computer is thinking by adding text to the span `$('#tl_amazonurl_return').text('Checking...');` and we remove the CSS class that defines the green or red visual response using the jQuery `removeClass`.

The stuff we pass into the AJAX call is JSON data, which contains the action name, `tl_amazonurl_ajax` (Note! This is what decides which AJAX callback function to run, from the `add_action('wp_ajax_tl_amazonurl_ajax'...` very early on!) and the data, which is what was in the input box.

If the response is `fail` we'll add the red x-mark and tell the user "Invalid URL!". Otherwise, we'll print the ASIN and give the green check mark to indicate success. (Check and x marks are done via CSS.)

## The AJAX callback function:

There's not much here:
<pre>	function AjaxCallback()
	{
		$key = $this-&gt;ValidateASIN( $_POST['amazonurl'] );
		if ( $key ) echo $key;
		else echo 'fail';
		die();
	}</pre>
We pass the Amazon URL into another function (that way we can use the same validation inside the `save_post` action) which will either give us the ASIN or fail, then we either echo out the ASIN or a failure message.

**Note!** You _must_ use `die();` at the end of the callback function! At this point, the headers have been sent, the text you made (the ASIN or "fail") are output, and you need to end the rest of any WordPress code from running!

So, given an Amazon URL that looks like [this](http://www.amazon.com/Kindle-Keyboard-Free-Wi-Fi-Display/dp/B004HZYA6E/ref=kin3w_ddp_compare_title3_2?pf_rd_p=1350442122&amp;pf_rd_s=center-18&amp;pf_rd_t=201&amp;pf_rd_i=B0051QVESA&amp;pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_r=1N0PJEZ2RCZW86NM2894), you'd get back the ASIN, which would look like this: B004HZYA6E

## Saving the ASIN to the post

When we save the post meta field, it'll look something like this:
<pre>	function SavePostMeta()
	{
		if ( current_user_can( 'edit_posts' ) &amp;&amp; isset( $_POST['tl_amazonurl_nonce'] ) &amp;&amp; wp_verify_nonce( $_POST['tl_amazonurl_nonce'], 'tl_amazonurl_nonce' ) )
		{
			global $post;
			// if the amazon url field is set, we'll check it
			if ( isset( $_POST['tl_amazonurl_link'] ) &amp;&amp; $_POST['tl_amazonurl_link'] != '' )
			{
				// we'll double check the link, based on it's size
				if ( strlen( $_POST['tl_amazonurl_link'] ) &gt;= 22 )
				{
					$key = $this-&gt;ValidateASIN( $_POST['tl_amazonurl_link'] );
					if ( $key )
					{
						update_post_meta( $post-&gt;ID, $this-&gt;meta_key, $key );
					}
					else $error = "The ASIN failed to validate with Amazon, please try again.";
				}
				else
				{
					$url = "http://www.amazon.com/dp/" . $_POST['tl_amazonurl_link'];
					$key = $this-&gt;ValidateASIN( $url );
					if ( $key )
					{
						update_post_meta( $post-&gt;ID, $this-&gt;meta_key, $key );
					}
					else $error = "The link failed to validate with Amazon. Please try copying and pasting again.";
				}
			}
			// if no asin was included, we'll delete the post meta (delete returns false if meta key not found, in this case it's okay)
			else
			{
				delete_post_meta( $post-&gt;ID, $this-&gt;meta_key );
			}
		}
		// if security checks fail, generate an error message
		else
		{
			$error = "You don't have permission to edit this field.";
		}

	}</pre>
The first line is a security check, using the WordPress nonce feature. If there is text inside the ASIN input box, we really should re-check it, in case the user modified it but didn't click the button.

The Amazon API specifies that the ASIN will be 22 or less characters, so we'll skip any potentially complicated logic and assume that strings shorter than 23 characters are in the final ASIN form already, and if they are longer we'll assume they are proper URLs.

If there's no text, we'll clean things up by deleting the post meta field entirely. (As opposed to just removing the text, we want to remove the text and key entirely.)

(Note also that the error variables aren't actually used anywhere, I just put them there to make it more clear to you what the error was.)

## Validating the Amazon URL/ASIN

When I was trying to solve this problem, I read many solutions that used regex to try disassembling the URL, either by counting characters between `/`s, or some other method. All of these will fail, due to Amazon changing their URL scheme, so I wanted a better solution. This one is not as fast as a regex, but is stronger.

First, after a little exploration, I found that Amazon pages all contain (in the HTML) the following line: &lt;link rel="canonical" href="http://www.amazon.com/{product name}/dp/{ASIN} /&gt;

So, what we want to do is load the Amazon page given in the link, then extract the {ASIN} field:
<pre>	function ValidateASIN( $url )
	{

		// to easily retrieve the HTML element, we'll use the parser here: http://simplehtmldom.sourceforge.net/
		include( 'simple_html_dom.php' );

		// for some reason some servers won't work without an explicit "http://"
		$link = strpos( $url, "http://" );
		if ( $link === false ) $link = "http://".$url;
		else $link = $url;

		// you can go ahead and grab the HTML from the given URL
		$html = @file_get_html( $link );

		// if there was a failure to get the HTML, return false immediately
		if ( !$html ) return false;

		// now you need to grab this element from the HTML:
		//
		$element = $html-&gt;find('link[rel=canonical]');

		// if $html-&gt;find returns an array you have to go in and get it
		if ( $element )
		{
			// grab the url
			$element = $element[0];
			$element = $element-&gt;attr['href'];

			// split the url to get the code
			$pieces = explode( "/", $element );
			$key = $pieces[ count( $pieces ) - 1 ];

			// for the above example, the function returns this string: 0596102356
			return $key;
		}
		// the parser didn't find the element
		else
		{
			return false;
		}

	}</pre>
The way I am going to parse the HTML is using the very excellent [Simple HTML DOM](http://simplehtmldom.sourceforge.net/) class. Note that you don't need to use this class, but if you write your own HTML parser I will probably shun you forever.

Anyway, the rest is implementation of grabbing the ASIN from the HTML document. The only notable part is that it returns the ASIN key by itself, as text, which is important for the `AjaxCallback` function.

## The end!

That's really all there is to it! Here's what the meta box should look like without anything in it:

[![](/content/2012/03/music2.png)](/content/2012/03/music2.png)

Here's what it looks like when I put in a URL and click the button, but before the server can respond (note the user feedback, so they can tell that it's actually doing something):

[![](/content/2012/03/screenshot1.png)](/content/2012/03/screenshot1.png)

Here's what it looks like when the server responds with a success:

[![](/content/2012/03/screenshot2.png)](/content/2012/03/screenshot2.png)

And here's what a failure looks like:

[![](/content/2012/03/screenshot3.png)](/content/2012/03/screenshot3.png)

## Final thoughts:

The above code is incomplete, there are ways certain technically-correct URLs could fail, and there are better ways to give the user feedback, so be sure to think that stuff through before using this publicly.

However, the main takeaway is this: When you want an AJAX call (which can do anything!) you need to add an action for your custom named callback, so it looks of the form `add_action('wp_ajax_CALLNAME'` where your CALLNAME is a unique and custom name, referenced also in the AJAX call, which uses JSON data of the form `{ action: 'CALLNAME', KEY: VALUE }` where the KEY and VALUE are any number of key/value paired, JSON-valid information.

Let me know in the comments if you have questions!