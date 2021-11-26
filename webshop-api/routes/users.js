const { response } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.json(users);
});

router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  res.send(`Deleting user ${req.params.id}`);
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let updatedUsers = users.filter(user => user.id !== Number(req.params.id));
  console.log(updatedUsers);
  try {
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers))
  } catch (err) {
    console.error(err)
  }

});

module.exports = router;
