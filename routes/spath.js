var fs = require('fs');
var express = require('express');
var router = express.Router();
var shortid = require('shortid');

/* GET users listing. */
router.post('/', function(req, res) {
	//console.log("spath.js:"+req.body.values)
	//console.log("spath.js:"+req.body.mode)
	console.log("spath.js:"+"Referer: "+req.headers.referer);
	var mode = req.body.mode;
	var valText = req.body.values;
	var urlVal = shortid.generate(); //or other function here
	var encType = req.body.mode;
	var dateCreated = Date.now();
	var urlParts = req.headers.referer.split('/');
	var prevVer = urlParts[urlParts.length - 1];
	console.log("spath.js:"+"Prev Version: "+prevVer);

	var db = req.db;
	var collection = db.get('codebinData');
	console.log("spath.js:"+"Got collection");
	// console.log("spath.js:"+process.env.PWD);
	// console.log("spath.js:"+"Supposed path: "+require('path').join(process.env.PWD, 'files', urlVal)+".txt");
	fs.writeFile(require('path').join(__dirname, "..", 'files', urlVal)+".txt", valText, function(err) {
		if (err) throw err;
		//logging
		console.log("spath.js:"+"Basically wrote file");
		var dataObject = {
			'urlExt': urlVal,
			'dateCreated': dateCreated,
			'fileUrl': require('path').join(__dirname, "..", 'files', urlVal)+".txt",
			'mode': mode,
			'active': 1
		};

		function dbInsertObj() {
			collection.insert(dataObject, function (err, doc) {
				if (err) throw err;
				//inserted obj, redirect
				console.dir(dataObject);
				console.log("spath.js:"+"Inserted new object, redirect");
				console.log("spath.js:"+"Redirection urlVal=>"+doc.urlExt);
				res.send({
					'redirectTo': '/' + doc.urlExt
				});
			});
		}

		if (prevVer.length>0) {
			console.log("spath.js:"+"Exists prev version");
			collection.findOne({'urlExt': prevVer}).on('success', function (doc) {
				console.log("spath.js:"+"Got current prev version object");
				var revisions = [];
				if (doc['revisions']) {
					revisions = doc['revisions'];
				}
				revisions.unshift(prevVer);
				dataObject['revisions'] = revisions;
				dbInsertObj();
			});
		}
		else {
			console.log("spath.js:"+"No prev version");
			dbInsertObj();
		}

	});
	console.log("spath.js:"+"Reached end, for some reason");
	//res.end();
	//next()
});

module.exports = router;