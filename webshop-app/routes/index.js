var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('Cookies: ', req.cookies);
  let admin = false;
  let logged_in = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }
  res.render('index', { 
    title: 'Home',
    css: 'stylesheets/home-style.css',
    navHtml: '',
    admin : admin,
    logged_in : logged_in
  });
});

module.exports = router;
