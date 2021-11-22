var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function(req, res, next) {
  console.log('Cookies: ', req.cookies);
  let admin = false;
  let logged_in = false;
  let username = "";
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
    let content = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    let user = content.find(item => item["id"] === Number(req.cookies.user_id));
    console.log(user);
    username = user.username;
  }
  res.render('index', { 
    title: 'Home',
    css: 'stylesheets/home-style.css',
    navHtml: '',
    admin : admin,
    logged_in : logged_in,
    username : username
  });
});

module.exports = router;
