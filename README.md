Codebin
=======

A modern hackable, opensourced, userfriendly Pastebin for sharing text, codes, screen shots (images) with new features.  
The server is implemented in NodeJS, with a MongoDB database. I have coded this in the Windows environment, however, it should work splendidly on Linux/Mac. In case there are any problems, feel free to [email me](mailto:mindstormer619@gmail.com).

Currently, this code reflects the first fully functioning version v0.1.0.

Features
--------

Current features (v0.1.0) are:

- Syntax highlighting
- Support for 11 language sets
- Save and sharable short url capability

Lots more features are planned :D


Usage
-----

Steps for usage are as follows, do exactly:

- Install [NodeJS](http://nodejs.org/)
- Install [MongoDB](https://www.mongodb.org/)
- Clone repo into folder of choice, switch to that folder
- For developmental purposes, the app uses [nodemon](https://github.com/remy/nodemon) to run the server, so install that with `npm install -g nodemon` into the Terminal, or simply avoid it and use the standard node command by opening `package.json` and changing the following:

		"scripts": {
		  "start": "nodemon ./bin/www"
		}

	to

		"scripts": {
		  "start": "node ./bin/www"
		}

- Get the folder src-min-noconflict from the [ace-builds repository](https://github.com/ajaxorg/ace-builds/) and place it in public/javascripts
- Get jquery-1.11.1-min.js from jquery's page and place in public/javascripts
- Get bootstrap.min.js from bootstrap and place in public/javascripts
- Run `npm install` in the Terminal. This may take a while on slower internet connections and is only to be done for the first time setup. In case the installation did not occur properly, delete the node_modules folder before trying again.
- Run `mongod --dbpath ./data` (or on Windows, `mongod --dbpath .\data` ) and keep the terminal open. This is the database server and is required every time you want the site to run.
- Run `mongo` in a new terminal. (This is only for the first time setup) Type the following:

		> use nodetest1
		> db.createCollection('codebinData')
		> exit

- Run `npm start` and keep the terminal open. This IS the server and must be kept running in order to work.
- Open `localhost:3000` in the browser (Tested on the latest Chrome, though it should work as expected anywhere Ace Editor does)
- Clicking the Save button sends the data to the server in post request, server modifies database and redirects to required page.
