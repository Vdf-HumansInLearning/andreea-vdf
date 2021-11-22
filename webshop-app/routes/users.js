const { response } = require('express');
var express = require('express');
const axios = require('axios').default;
const fs = require('fs');
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
  // get users array
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    res.render('users', { 
      title: 'Users',
      css: 'stylesheets/users-style.css',
      navHtml: '',
      users: users,
      admin: admin,
      logged_in : logged_in
    });
});

router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  res.send(`Deleting user ${req.params.id}`);
  let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  let updatedUsers = users.filter(user => user.id !== Number(req.params.id));
  console.log(updatedUsers);
  try {
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers))
  } catch (err) {
    console.error(err)
  }

});

module.exports = router;
