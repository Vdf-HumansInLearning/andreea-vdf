var express = require('express');
var router = express.Router();
const axios = require('axios').default;

router.get('/', function(req, res, next) {
  let admin = false;
  let logged_in = false;
  let username = "";
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
    
    axios.get(`http://localhost:3001/users/${req.cookies.user_id}`)
    .then(function (response) {
      // handle success
      const user = response.data;
      username = user.username;

      res.render('index', { 
        title: 'Home',
        css: 'stylesheets/home-style.css',
        navHtml: '',
        admin : admin,
        logged_in : logged_in,
        username : username
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });
  } else {
    res.render('index', { 
      title: 'Home',
      css: 'stylesheets/home-style.css',
      navHtml: '',
      admin : admin,
      logged_in : logged_in,
      username : username
    });
  }
  
});

module.exports = router;
