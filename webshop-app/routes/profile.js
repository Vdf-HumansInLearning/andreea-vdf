var express = require('express');
const axios = require('axios').default;
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
    
    axios.get(`http://localhost:3001/user/${req.cookies.user_id}`)
    .then(function (response) {
      // handle success
      const user = response.data;
      console.log(user);
      username = user.username;

      res.render('profile', { 
        title: 'Profile',
        css: 'stylesheets/profile-style.css',
        navHtml: '',
        logged_in : logged_in,
        user : user,
        admin : admin
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  } else {
    res.render('profile', { 
      title: 'Profile',
      css: 'stylesheets/profile-style.css',
      navHtml: '',
      logged_in : logged_in,
      user : user,
      admin : admin
    });
  }
  
});

module.exports = router;