var express = require('express');
var fs = require("fs");
var router = express.Router();

router.get('/', function(req, res, next) {
  // read the cookie
  let loggedIn = false;
  console.log(req.cookies);
  if (req.cookies.email) {
    let users = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf8' }));
    let loggedInUser = users.users.find(user => user.email.toLowerCase() === req.cookies.email.toLowerCase());
    loggedIn = true;
    // we should see the logged in user
    console.log(loggedInUser);
  }
  if(loggedIn) {
    res.render('home', { 
      title: 'Dashboard',
      loggedIn : loggedIn
    });
  } else {
    res.redirect('/auth/login');
  }
  
  
});

module.exports = router;