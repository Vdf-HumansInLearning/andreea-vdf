var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/:phone', function(req, res, next) {
  
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  let phone = content.find(item => item["name"] === req.params.phone);
  res.json(phone);
});


module.exports = router;
