/*

DiffPath: diffpath.js
=====================

router.post('/'):

	- Handles a post request that takes in a request containing a string and a URL, from the client.
	- Accesses database and finds file from the URL.
	- Accesses file and takes contents as second string.
	- Compares the two strings and returns diff object to client

*/

var fs = require('fs');
var express = require('express');
var router = express.Router();
var jsdiff = require('diff');

router.post('/', function(req, res) {
	/*
		req is the request object. req sends the current text value and the selected previous version URL
		req {
			body {
				contents: string // user contents currently
				urlVal: string // value of url to be referenced by db
			}
		}

		Take req's values into variables
		Query db with urlVal
		Get filecontents using fs
		Run diff, send diff object
	*/

	var currentContents = req.body.contents;
	var urlCompare = req.body.urlVal;

	console.log( __basename + ": Obtained request variables");

	var db = req.db;
	var dbCollection = db.get('codebinData');

	console.log( __basename + ": Set collection from db");

	// Query database for file name

	dbCollection.findOne ({'urlExt': urlCompare}, function (err, doc) {
		// doc contains database return object
		// err contains, error. Duh.
		console.log ( __basename + ": db find callback");
		if (err) throw err;

		// Get filename from doc
		var fName = doc['fileUrl'];

		//query file read now
		fs.readFile(fName, function (err, data) {
			console.log( __basename + ": fs read callback");
			if (err) throw err;

			var prevContents = data.toString();

			//do the diffing
			var diffObj = jsdiff.diffLines (prevContents, currentContents);

			console.log( __basename + ": Done diffing. Sending response now");
			res.send(diffObj);
		});
	});

});