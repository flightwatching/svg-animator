[![Build Status](https://travis-ci.org/flightwatching/svg-animator.svg?branch=master)](https://travis-ci.org/flightwatching/svg-animator) [![dependencies Status](https://david-dm.org/flightwatching/svg-animator/status.svg)](https://david-dm.org/flightwatching/svg-animator) [![devDependencies Status](https://david-dm.org/flightwatching/svg-animator/dev-status.svg)](https://david-dm.org/flightwatching/svg-animator?type=dev)

master: [![Coverage Status](https://coveralls.io/repos/github/flightwatching/svg-animator/badge.svg?branch=master)](https://coveralls.io/github/flightwatching/svg-animator?branch=master)

develop: [![Coverage Status](https://coveralls.io/repos/github/flightwatching/svg-animator/badge.svg?branch=develop)](https://coveralls.io/github/flightwatching/svg-animator?branch=develop)

[![Build Status](https://saucelabs.com/buildstatus/NotBad4U?saucy)](https://saucelabs.com/beta/builds/7344c15222174971a5b5ed2359b66ca3)

[![Build Status](https://saucelabs.com/browser-matrix/NotBad4U.svg)](https://saucelabs.com/beta/builds/7344c15222174971a5b5ed2359b66ca3)

# svg-animator

	Do not use commercial or GPL license. The aim is to become open-source and free to commercialize when the features are coded

Install instructions for local development
======

`sudo apt install git curl`

`curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -`

`sudo apt install nodejs`

`git clone https://github.com/flightwatching/svg-animator.git 
(if you use SSH : git@github.com:flightwatching/svg-animator.git)`

`cd svg-animator`

`npm install`

`npm start`

These install instructions have been tested with Ubuntu 16.04

####Then you need a backend like this one : https://github.com/NotBad4U/svg-animator-backend

Example of working version : 
* npm version (`npm --version` : 3.10.10
* node version (`node --version`) : v6.10.0

#### If you got an error like "EACCES : permission denied" using npm then follow these instructions : https://docs.npmjs.com/getting-started/fixing-npm-permissions

## Instructions to test this front-end : `npm test`

#### If you have a problem with CHROME_ENV variable, fix it this way for example (you need chromium-browser : `sudo apt install chromium-browser`) :

`cd ~`

`gedit .bashrc` (you can also do it via vi, vim or nano)

Add this line at the end of the opened file : "export CHROME_BIN=/usr/bin/chromium-browser"

Then save and quit gedit.

Close and open the terminal and the problem is solved.


Development pipe
======

We work with scrum method
* 2 week sprint (monday to monday)
* from January 8rd to May 1st 2017.
* Then, we'll see...
* Meetings on Monday (review, retrospective)

Tasks are tracked with ZenBoard

Technologies
===
* Angular2
* D3.JS (manipulate SVG)


Continouus integration
====
Travis
TODO
