var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let admin = false;
  let logged_in = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }
  axios.get('http://localhost:3001/phones', { params: req.query })
  .then(function (response) {
    // send phones and filters to render method
    res.render('phones', { 
      title: 'Phones',
      css: 'stylesheets/phones-style.css',
      products: response.data.products,
      filters : response.data.filters,
      selectedFilters : response.data.selectedFilters,
      admin : admin,
      logged_in : logged_in
    });
  })
  .catch(function (error) {
    // handle error
    res.status(404).send("404 Not Found");
  });
  
});

router.post("/", function(req, res, next) {
  axios.post('http://localhost:3001/phones', {
    name: req.body.name,
    brand: req.body.brand,
    operating_system : req.body.os,
    price : Number(req.body.price),
    discount : Number(req.body.discount),
    quantity : Number(req.body.quantity),
    availability_date :req.body.date,
    rating : Number(req.body.rating),
    image : req.body.imgUrl
  },{
  "headers": {
    "content-type": "application/json",
  }})
  .then(function (response) {
    res.status(200).send(`Adding phone ${req.body.name}`);
  })
  .catch(function (error) {
    res.status(400).send({ message: "Bad request" });
  });
  
})

router.put("/:id", function(req, res, next) {
  axios.put(`http://localhost:3001/phones/${req.params.id}`, {
    name: req.body.name,
    brand: req.body.brand,
    operating_system : req.body.os,
    price : Number(req.body.price),
    discount : Number(req.body.discount),
    quantity : Number(req.body.quantity),
    availability_date :req.body.date,
    rating : Number(req.body.rating),
    image : req.body.imgUrl
  },{
  "headers": {
    "content-type": "application/json",
  }})
  .then(function (response) {
    res.status(200).send(`Updating phone ${req.body.name}`);
  })
  .catch(function (error) {
    res.status(400).send({ message: "Bad request" });
  });
  
})

router.delete('/:id', function(req, res) {
  console.log(req.params.id);
  res.send(`Deleting user ${req.params.id}`);
  axios.delete(`http://localhost:3001/phones/${req.params.id}`, { data: req.params.id }).then()

});

module.exports = router;
