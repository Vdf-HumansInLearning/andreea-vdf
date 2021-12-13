const { response } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  if(users){
    res.status(200).json(users);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
  
});

router.get('/:id', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  let user = users.find(user => user.id == req.params.id)
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.delete('/:id', function(req, res) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  let user = users.find(user => user.id == req.params.id)
  if(user){
    let updatedUsers = users.filter(user => user.id != req.params.id);
    try {
      fs.writeFileSync('./data/users.json', JSON.stringify(updatedUsers));
      res.status(200).send({ message: `Deleting user ${req.params.id}` });
    } catch (err) {
      throw err;
    }
  }

});

router.put('/:id', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  let usersIds = content.map(element => element.id);
  let index = usersIds.indexOf(Number(req.params.id));
  let user = users.find(user => user.id == req.params.id);
  if (user && req.body.name && req.body.username && req.body.email && req.body.password) {
    let updatedUser = {
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
    };

    if (validateUser(updatedUser)) {      
      users[index] = updatedUser;
      fs.writeFile('./data/users.json', JSON.stringify(users), function (err) { 
        if (err) {
          throw err;
        } else {
          res.send({ message: "Successfully updated" });
        }
      })
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
  
  
});

function validateUser(user) {
  let regexLetters = /(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})/;
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  let regexUsername = /^[a-z0-9_-]{3,16}$/igm;
  let isValid = false;
  if (
    user.name.match(regexLetters) &&
    user.name.match(regexUsername) &&
    user.email.match(regexEmail) &&
    user.password.match(regexPassword)
  )
    isValid = true;
  else isValid = false;
  return isValid;
}

module.exports = router;
