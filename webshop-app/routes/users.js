const { response } = require('express');
var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET users listing. */
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
  axios.get('http://localhost:3001/users')
  .then(function (response) {
    // handle success
    res.render('users', { 
      title: 'Users',
      css: 'stylesheets/users-style.css',
      navHtml: '',
      users: response.data,
      admin: admin,
      logged_in : logged_in
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
    
});



module.exports = router;
