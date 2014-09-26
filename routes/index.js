var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var db = req.db;
	//console.log("Got this far")
	var collection = db.get('usercollection');
	//console.dir(collection);
	collection.find({},{},
		function(e, docs) {
			//console.dir(docs)
			res.render('index',{
				"userlist": docs
			});
		}
	);
	//res.render('index', {});
});

module.exports = router;
