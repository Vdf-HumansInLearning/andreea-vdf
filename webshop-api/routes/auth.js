var express = require('express');
const fs = require('fs');
var router = express.Router();

router.post('/register', function(req, res, next) {
    
    console.log(req.body);
    let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    users.push({
      "id": users[users.length-1].id + 1,
      "name": req.body.first_name + " " + req.body.last_name,
      "username": req.body.username,
      "email": req.body.email,
      "password": req.body.password,
      "role": "user",
      "loggedin": false,
      "address": {
        "street": "",
        "suite": "",
        "city": "",
        "zipcode": "",
        "geo": {
          "lat": "",
          "lng": ""
        }
      },
      "phone": "",
      "website": "",
      "company": {
        "name": "",
        "catchPhrase": "",
        "bs": ""
      }
    });
    console.log(users);
    fs.writeFile('./users.json', JSON.stringify(users), function (err) { 
      if (err){
        console.log(err);
      } else{
        console.log('Write operation complete.');
      }
    })
  
    res.send("Successfully registered");
});


module.exports = router;