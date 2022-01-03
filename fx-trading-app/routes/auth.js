var express = require("express");
var fs = require("fs");
var router = express.Router();

router.get("/login", function (req, res, next) {
  let loggedIn = false;
  if (req.cookies.email) {
    loggedIn = true;
  }
  res.render("login", { title: "Login", register: req.query.register, error: req.query.error, loggedIn: loggedIn });
});

router.post("/login", function (req, res, next) {
  // read username and password
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  // validate that the username and email exists
  if (!email || !password) {
    res.redirect('/auth/login?error=true');
  }

  // get the users from file and parse the resulting string as a JSON
  let users = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf8' }));
  
  // check if credentials match any existing user
  let loggedInUser = users.users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
  console.log(loggedInUser);
  if (loggedInUser) {
    // create cookie with the user email
    res.cookie('email', email);

    res.redirect('/');
  } else {
    // redirect to login and show error message
    res.redirect('/auth/login?error=true');
  }
});

router.get('/logout', function (req, res, next) {
  // clear the cookie
  if (req.cookies.email) {
    res.clearCookie('email');
  }

  // redirect to homepage
  res.redirect('/');
});

router.get("/register", function (req, res, next) {
  let loggedIn = false;
  if (req.cookies.email) {
    loggedIn = true;
  }
  res.render("register", { title: "Register" ,loggedIn: loggedIn});
});

router.post("/register", function (req, res, next) {
  console.log(req.body);

  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // back-end validation!!!
  let isValid = validateUser(user, req.body.confirm_password);

  // register new user
  if (isValid) {
    let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    let user = {
      "id": users.users[users.users.length - 1].id + 1,
      "username": req.body.username,
      "password": req.body.password,
      "email": req.body.email
    };
    let verifyUser = users.users.find((item) => item.username == user.username || item.email == user.email);
    if (verifyUser) {
      res.redirect('/auth/register?error=true');
    } else {
      users.users.push(user);
      fs.writeFile('./data/users.json', JSON.stringify(users), function (err) {
        if (err) {
          throw err;
        } else {
          // redirect to login page
          res.redirect('/auth/login?register=true');
        }
      });
    }

    
  } else {
    res.redirect('/auth/register?error=true');
  }

});

function validateUser(user, confirmPassword) {
  let isValid = true;

  if (!user.username || user.username < 3 || user.username > 20) {
    isValid = false;
  }

  const pattern = /^\S+@\S+\.\S+$/;
  if (!pattern.test(user.email)) {
    isValid = false;
  }

  if (user.password <= 6 || user.password >= 20 || user.password !== confirmPassword) {
    isValid = false;
  }

  return isValid;
}

module.exports = router;