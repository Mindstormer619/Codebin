var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
	//console.log(req.body.values)
	//console.log(req.body.mode)
	console.log("Referer: "+req.headers.referer);
	var mode = req.body.mode;
	var valText = req.body.values;
	var urlVal = Date.now().toString(36); //or other function here
	var encType = req.body.mode;
	var dateCreated = Date.now();
	var urlParts = req.headers.referer.split('/');
	var prevVer = urlParts[urlParts.length - 1];
	console.log("Prev Version: "+prevVer);

	var db = req.db;
	var collection = db.get('codebinData');
	console.log("Got collection");
	// console.log(process.env.PWD);
	// console.log("Supposed path: "+require('path').join(process.env.PWD, 'files', urlVal)+".txt");
	fs.writeFile(require('path').join(__dirname, "..", 'files', urlVal)+".txt", valText, function(err) {
		if (err) throw err;
		//logging
		console.log("Basically wrote file");
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
				console.log("Inserted new object, redirect");
				console.log("Redirection urlVal=>"+doc.urlExt);
				res.send({
					'redirectTo': '/' + doc.urlExt
				});
			});
		}

		if (prevVer.length>0) {
			console.log("Exists prev version");
			collection.findOne({'urlExt': prevVer}).on('success', function (doc) {
				console.log("Got current prev version object");
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
			console.log("No prev version");
			dbInsertObj();
		}
		
	});
	console.log("Reached end, for some reason");
	//res.end();
	//next()
});

module.exports = router;