---
title: Some security issues with Google Wave
date: 2009-11-05 21:04
layout: article
published: true
---

A few days ago I received my invitation to Google Wave and the first thing I noticed was how few people were available to talk with: One.

Google gave me a few invitations to give away, which I gave to people I would like to talk to online, and I was finally able to talk with some people. This led me to note an interesting user interface issue: I can't delete a wave very well.


### Trying (without success) to remove a wave

I first noticed the issue when I got an empty blip (message) in my wave-box. After some poking around, I realized it was from an ping (instant message) that a friend had started.

[![](/article/images/google-wave/wave-selected.jpg)](/article/images/google-wave/wave-selected.jpg)

As you can see, there is no message there, so my first instinct was to delete it. However, clicking on the trash button in the inbox bar did not remove it from my inbox, but instead just cleared the wave from the right column, like so:

[![](/article/images/google-wave/wave-selected2.jpg)](/article/images/google-wave/wave-selected2.jpg)

After a search on the inter-webs, I found some [good comments][comments] about why the delete option may not be a good idea.

Essentially, the problem can be summarized like this: Since the Wave Protocol is essentially a shared inbox, if you could fully delete a wave it would be removed from the server and the other people who added to the wave would not be able to view it any longer. This would be analogous to being able to delete a message in someone else's inbox, an obvious privacy concern.

What this means, essentially, is that once someone sends you a wave, it is stuck forever in your inbox. A partial solution is to remove yourself from the list of participants--Google says they will implement this option, but the button with this option is disabled so they probably haven't implemented it yet. It is, after all, still in preview mode. Google also says they will implement a full delete option if all participants remove themselves from a wave, but the implementation of this is non-verifiable, since you wouldn't be able to see the wave anyway.


### Removing yourself from a wave

So I think there are two ways that we could remove a message from the inbox:

1. Archive a wave, which would remove it from your inbox but keep you as a part of the wave.
2. remove yourself from the conversation, which would remove it from your inbox, just as though you hadn't been invited at all.

Now this brings up a question: If I start a wave and add someone as a participant, and later want to remove the wave, what happens? Suppose I remove myself from the list of participants, then suppose the other person removes them self from the participants. Who owns the message? Should it just sit on the server as dead weight, or should it be fully removed?


### Adding and removing wave participants

I tested out some wave features with a few friends and noted that, like forwarding an e-mail, if I add a participant to a wave, they can add another participant themselves, who has equal rights.

So far I have not been able to remove anyone, either myself, an added participant, or a secondarily added participant, from the wave. As stated before, it's possible that this feature hasn't been implemented, since Google Wave is still in preview. However, does it even make sense to be able to remove someone from a wave?

If I send you an e-mail and I delete it, does it make sense that it will also be deleted from your e-mail box? If I send it and after you read it decide I didn't want to let you read it, does it make sense that I can access your account and delete it from your inbox? I don't think so.

### The security risk

This brings up the security issue I realized: I spent a little time reading through the [Google Wave Terms](http://wave.google.com/help/wave/privacy.html), and noted a few observations that are security risks.

One of the handy things about the Wave Protocol is the extensions, which are basically programs who you can add as participants to the wave. For example, in the hour plus video I linked to when Google Wave was first introduced, they showed a spell checker as a participant, which checked the spelling *in context*, so it would know the difference between base and bass. Neat!

According to the Google Wave Terms, and by basic logic, since an extension is added as a participant, it has as many rights as anyone else would who was a participant. This also means it can *add other participants*.

Of course, you will be able to see who is participating in the conversation, but you (so far, at least) won't be able to remove them from the conversation. So if you added an extension to a conversation and were not paying attention, it could add a secondary participant to the conversation, and everything you write would then be compromised.

What would be even worse is if you were able to add an extension and it were to be "hidden" in some way. Right now I can add the voting extension, which allows anyone who is a participant to the conversation to vote on something. At the top of the page, I have no way of knowing that the voting extension is an active participant in the wave.


### A possible security intrusion

Suppose I were to be communicating company secrets via wave. I start a wave, type up some secrets, and add my boss and a few co-workers as participants. Somewhere in there, we decide to vote on something, so we add a voting extension.

However, suppose the voting extension had a security flaw which was used by a cracker to insert a bit of malicious code. The cracker inserts a code that adds his extension as a participant, which gives him the ability to read the whole wave conversation.


### Another possible security intrusion

The first example may not be quite so likely, since extensions (I believe) have to be hosted on the wave server, which would limit a persons ability to crack the extension code directly.

However, suppose an extension were used to add content from another server. Or suppose the implementation of the extension was insecure in general, allowing XSS cracks, or other similar things.

Are the extensions formed using Java Script which is loaded by the browser? This represents another security risk.


### Conclusion and thought

The addition of extensions to the implementation of the Wave Protocol poses a serious security threat, in my opinion, and should be carefully considered.


[comments]: http://www.google.com/support/forum/p/wave/thread?tid=482a9eb5ccd7b9a8&amp;hl=en "Comments about deleting things"
