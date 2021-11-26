const { response } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let user = users.find(user => user.id === Number(req.params.id));
  res.json(user);
});

router.post('/login', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let user = users.find(user => user.email === req.body.email && user.password === req.body.password);
  res.json(user);
});

router.post('/register', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  users.push({
      "id": users[users.length-1].id + 1,
      "name": req.body.name,
      "username": req.body.username,
      "email": req.body.email,
      "password": req.body.password,
      "role": "user",
      "loggedin": false,
      "address": {
        "street": "",
        "suite": "",
        "city": "",
        "zipcode": "",
        "geo": {
          "lat": "",
          "lng": ""
        }
      },
      "phone": "",
      "website": "",
      "company": {
        "name": "",
        "catchPhrase": "",
        "bs": ""
      }
    });
  fs.writeFile('./users.json', JSON.stringify(users), function (err) { 
      if (err){
        console.log(err);
        res.send(err);
      } else{
        console.log('Write operation complete.');
        res.send("Successfully registered");
      }
  })
  
  
});

router.delete('/:id', function(req, res) {
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let updatedUsers = users.filter(user => user.id !== Number(req.params.id));
  try {
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers));
    res.send(`Deleting user ${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send(`Error`);
  }

});

module.exports = router;
