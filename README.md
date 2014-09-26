Codebin
=======

A modern hackable, opensourced, userfriendly Pastebin for sharing text, codes, screen shots (images) with new features.

At the moment the implementation is a simple test with post request and Ace Editor. Please feel free to fork and modify.
Please check database implementation on branch nodetest.

Usage
-----

Steps for usage are as follows, do exactly:

- Clone repo into folder of choice
- Get the folder src-min-noconflict from the [ace-builds repository](https://github.com/ajaxorg/ace-builds/) and place it in public/javascripts
- Get jquery-1.11.1-min.js from jquery's page and place in public/javascripts
- Get bootstrap.min.js from bootstrap and place in public/javascripts
- Run `npm install`. This may take a while on slower internet connections. In case the installation did not occur properly, delete the node_modules folder before trying again.
- Run `mongod --dbpath ./data` (or on Windows, `mongod --dbpath .\data` )
- Run `npm start` in a new terminal (or cmd or PowerShell)
- Open `localhost:3000`
- Clicking the Save button sends the data to the server in post request visible as console log on server side