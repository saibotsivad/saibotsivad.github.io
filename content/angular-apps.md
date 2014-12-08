title: Angular Apps
subtitle: The complete setup for an architecturally significant Angular.js app.
updated: 2014-12-08


# Introduction

This document describes [Angular.js](http://angularjs.org) "best practices"
for directory structure, directive/controller/factory/etc. layout, and testing.

These are based on our own internal experience creating and maintaining an
"architecturally significant" web app, taking into account many of the problems
we have encountered with:

* the build/development process
* browser caching/cache busting
* module/package upgrades (e.g. [bootstrap](http://getbootstrap.com) 1 to 3)
* migrating from a zero-test environment to unit and end-to-end (e2e) testing

By "architecturally significant" it is meant a project likely to be found within
a normal corporate environment, namely:

* it is at least a couple years old
* different developers have worked on it at different times
* the web application has additional content only available behind a login
* uses multiple third-party JavaScript and CSS modules
* the different modules may or may not be upgradable
* the deployed web application makes use of many technologies
* the application is built and deployed in many steps

# .init()

Talk about our general setup as it was. Don't talk much about specific company details though.

Talk about how we had huge controllers, directives with embedded factories, etc. and how
we didn't have tests.

Talk about how this motivation came from a new package being added.

# The first step: tests

Talk about the difficulty of testing, how we have incomplete tests, how the basic
test structure works.

Give concrete examples of tests for unit and e2e tests of content behind logins.

