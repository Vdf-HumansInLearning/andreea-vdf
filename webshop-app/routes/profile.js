var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  let admin = false;
  let logged_in = false;
  console.log(req.cookies);
  let user = [];
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
    let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    user = users.filter(user => user.id === Number(req.cookies.user_id));
  }
  res.render('profile', { 
    title: 'Profile',
    css: 'stylesheets/profile-style.css',
    navHtml: '',
    logged_in : logged_in,
    user : user[0],
    admin : admin
  });
});

module.exports = router;