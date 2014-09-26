var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body.values)
  res.end()
  //next()
});

module.exports = router;
