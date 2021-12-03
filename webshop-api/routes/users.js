const { response } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.json(users);
});

module.exports = router;
