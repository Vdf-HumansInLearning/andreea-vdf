var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/:phone', function(req, res, next) {
  console.log('Cookies: ', req.cookies);
  let admin = false;
  let logged_in = false;
  if(req.cookies.user_role === "admin"){
    admin = true;
  }
  if(req.cookies.user_role && req.cookies.user_id){
    logged_in = true;
  }
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  let phone = content.filter(item => item["name"] === req.params.phone);
  let avgRating = getAverageRatingBySelectedBrand(phone[0].brand);
  res.render('details', { 
    title: 'Details',
    css: 'stylesheets/details-style.css',
    navHtml: '',
    phone : phone[0],
    average : avgRating,
    admin: admin,
    logged_in: logged_in
  });
});

// show average rating by brand - for selected brands
function getAverageRatingBySelectedBrand(brand){
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  let average = parseFloat(content.filter(product => product.brand === brand && product.rating > 0).reduce((previous,current,index,array) => {
    let calcSum = previous + current.rating;
    if(index === array.length - 1 ) {
        return calcSum/array.length;
    }
    return calcSum;
  },0).toFixed(1));
  return average;
  
}

module.exports = router;
