var express = require('express');
const fs = require('fs');
const axios = require('axios').default;
var router = express.Router();

// router.get('/', function(req, res, next) {
//   let admin = false;
//   let logged_in = false;
//   if(req.cookies.user_role === "admin"){
//     admin = true;
//   }
//   if(req.cookies.user_role && req.cookies.user_id){
//     logged_in = true;
//   }
// });

router.post("/", function(req, res, next) {
    axios.post('http://localhost:3001/orders', {
      data : req.body
    },{
    "headers": {
      "content-type": "application/json",
    }})
    .then(function (response) {
      console.log(response);
      res.status(200).send(`Adding order`);
    })
    .catch(function (error) {
      res.status(400).send({ message: "Bad request" });
    });
    
  })

module.exports = router;