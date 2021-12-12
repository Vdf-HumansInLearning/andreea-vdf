const { response } = require('express');
var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
    res.status(400).send("404 Not Found");
  });
    
});

router.delete('/:id', function(req, res) {
  res.send(`Deleting user ${req.params.id}`);
  axios.delete(`http://localhost:3001/users/${req.params.id}`, { data: req.params.id }).then(
  )

});

module.exports = router;
