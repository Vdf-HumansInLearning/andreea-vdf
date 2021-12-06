var express = require('express');
const axios = require('axios').default;
var router = express.Router();

router.get('/:phone', function(req, res, next) {
  let admin = false;
  let logged_in = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }


  let average, phone, id, content;
  axios.get(`http://localhost:3001/phones`)
  .then(function (response) {
    // handle success
    content = response.data;
    id = content.find(item => item["name"] === req.params.phone).id;
    return axios.get(`http://localhost:3001/phones/${id}`);
  }).then(function (response) {
    // handle success
    phone = response.data;
    average = parseFloat(content.filter(product => product.brand === phone.brand && product.rating > 0).reduce((previous,current,index,array) => {
      let calcSum = previous + current.rating;
      if(index === array.length - 1 ) {
          return calcSum/array.length;
      }
      return calcSum;
    },0).toFixed(1));
    
    res.render('details', { 
      title: 'Details',
      css: 'stylesheets/details-style.css',
      navHtml: '',
      phone : phone,
      average : average,
      admin: admin,
      logged_in: logged_in
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  
});

module.exports = router;
