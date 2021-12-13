var express = require('express');
const fs = require('fs');
var router = express.Router();

router.post('/login', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  let user = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.post('/register', function(req, res, next) {
  let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  if (req.body.name && req.body.username && req.body.email && req.body.password) {
    let user = {
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
    if (validateUser(user)) {
      let verifyUser = users.find((item) => item.username == user.username || item.email == user.email);
      if (verifyUser) {
        res.status(403).send({ message: "User already exist." });
      } else {
        users.push(user);
        fs.writeFile('./data/users.json', JSON.stringify(users), function (err) { 
          if (err) {
            throw err;
          } else {
            res.send({ message: "Successfully registered" });
          }
      })
      }
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
    user.username.match(regexUsername) &&
    user.email.match(regexEmail) &&
    user.password.match(regexPassword)
  )
    isValid = true;
  else isValid = false;
  return isValid;
}


module.exports = router;