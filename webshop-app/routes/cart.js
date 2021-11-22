var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  let admin = false;
  let logged_in = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }
  res.render('cart', { 
    title: 'Cart',
    css: 'stylesheets/cart-style.css',
    navHtml: '',
    logged_in : logged_in,
    admin : admin
  });
});

module.exports = router;