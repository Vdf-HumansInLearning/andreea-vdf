const { response } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.json(users);
});

router.get('/:id', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let user = users.find(user => user.id == req.params.id)
  res.json(user);
});

router.delete('/:id', function(req, res) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  // verify if there is any user with id
  let updatedUsers = users.filter(user => user.id != req.params.id);
  try {
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers));
    res.send(`Deleting user ${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send(`Error`);
  }

});

module.exports = router;
