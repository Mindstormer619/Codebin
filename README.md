Codebin
=======

A modern hackable, opensourced, userfriendly Pastebin for sharing text, codes, screen shots (images) with new features. The server is implemented in NodeJS, with a MongoDB database. I have coded this in the Windows environment, however, it should work splendidly on Linux/Mac. In case there are any problems, feel free to [email me](mailto:mindstormer619@gmail.com).

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
- Get the folder src-min-noconflict from the [ace-builds repository](https://github.com/ajaxorg/ace-builds/) and place it in public/javascripts
- Get jquery-1.11.1-min.js from jquery's page and place in public/javascripts
- Get bootstrap.min.js from bootstrap and place in public/javascripts
- Run `npm install`. This may take a while on slower internet connections. In case the installation did not occur properly, delete the node_modules folder before trying again.
- Run `mongod --dbpath ./data` (or on Windows, `mongod --dbpath .\data` )
- Run `npm start` in a new terminal (or cmd or PowerShell)
- Open `localhost:3000`
- Clicking the Save button sends the data to the server in post request, server modifies database and redirects to required page.