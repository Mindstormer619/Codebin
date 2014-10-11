var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	console.log("Render blank page");
	// var db = req.db;
	// //console.log("Got this far")
	// var collection = db.get('usercollection');
	// //console.dir(collection);
	// collection.find({},{},
	//	function(e, docs) {
	//		console.dir(docs)
	//		res.render('index',{
	//			"userlist": docs
	//		});
	//	}
	// );
	res.render('index', {});
});

router.get('/:idx', function (req, res, next) {
	console.log("Id path called");
	//var multiline = require('multiline');
	//console.log();
	var db = req.db;
	var collection = db.get('codebinData');
	console.log("idpath: collection found");
	collection.findOne({'urlExt': req.params.idx}, function (err, doc) {
		console.log("We're in");
		if (err) throw err;
		if (!doc) {
			res.status(404).send('Not found!');
			return;
		}
		console.log("idpath: Doc=>");
		console.dir(doc);
		console.log("idpath: urlExt document found, I think");
		var fileUrl = doc['fileUrl'];
		console.log("idpath: fileUrl=>"+fileUrl);
		var mode = doc['mode'];
		var fileContents = "";
		console.log("About to read file");
		fs.readFile(fileUrl, function (err, data) {
			if (err) throw err;
			console.log("idpath: Reading file data");
			console.log(data.toString('utf8').replace(/\\n/g, "\\n"));
			console.log(data);
			//fileContents = data.toString('utf8').replace(/\u2028/g, '\\n').replace(/\u2029/g, '\\n');
			fileContents = data;
			//console.log("File contents: \n"+fileContents);
			res.render('index', {
				'contents' : fileContents,
				'mode' : mode
			});
			//res.end();
		});
		
	});
	//res.status(404).send('Not Found!');
	
});

module.exports = router;
