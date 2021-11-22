var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
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

router.post('/:user/:password', function(req, res, next) {
  let username = req.params.user;
  let password = req.params.password;
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let user = users.filter(user => user.username === username && user.password === password);
  if(user.length > 0){
    res.cookie('user_id', user[0].id).cookie('user_role', user[0].role).send('cookie set');
  } else {
    res.clearCookie('user_id');
    res.clearCookie('user_role');
    res.send('cookie user cleared');
  }
});

module.exports = router;