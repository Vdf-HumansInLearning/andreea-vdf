var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/login', function(req, res, next) {
  let logged_in = false;
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }
  res.render('login', { 
    title: 'Login',
    css: 'stylesheets/login-style.css',
    logged_in : logged_in
  });
});

router.post('/login', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(typeof email, typeof password);
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let user = users.find(user => user.email === email && user.password === password);
  console.log(user);
  if(user){
    res.cookie('user_id', user.id).cookie('user_role', user.role).send('cookie set');
  } else {
    res.clearCookie('user_id');
    res.clearCookie('user_role');
    res.send('cookie user cleared');
  }
});

router.get('/register', function(req, res, next) {
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
  
router.post('/register', function(req, res, next) {
    
    console.log(req.body);
    
  
    let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    users.push({
      "id": users[users.length-1].id + 1,
      "name": req.body.first_name + " " + req.body.last_name,
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
    console.log(users);
    fs.writeFile('./users.json', JSON.stringify(users), function (err) { 
      if (err){
        console.log(err);
      } else{
        console.log('Write operation complete.');
      }
    })
  
    res.send("Successfully registered");
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('user_id');
    res.clearCookie('user_role');
    res.render("logout",{});
});

module.exports = router;