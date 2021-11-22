var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  let registered = false;
  if(req.cookies.user_role && req.cookies.user_id){
    registered = true;
  }
  res.render('register', { 
    title: 'Register',
    css: 'stylesheets/register-style.css',
    registered : registered
  });
});

router.post('/', function(req, res, next) {
  
  console.log(req.query);
  res.send("Succesfully registered");

  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  users.push({
    "id": users[users.length-1].id + 1,
    "name": req.query.first_name + " " + req.query.last_name,
    "username": req.query.username,
    "email": req.query.email,
    "password": req.query.password,
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
  console.log(users);
  fs.writeFile('./users.json', JSON.stringify(users), function (err) { 
    if (err){
      console.log(err);
    } else{
      console.log('Write operation complete.');
    }
  })
});

module.exports = router;