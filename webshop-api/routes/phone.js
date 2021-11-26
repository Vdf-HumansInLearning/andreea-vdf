var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/:phone', function(req, res, next) {
  
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  let phone = content.find(item => item["name"] === req.params.phone);
  // let avgRating = getAverageRatingBySelectedBrand(phone.brand);
  res.json(phone);
});

// show average rating by brand - for selected brands
// function getAverageRatingBySelectedBrand(brand){
//   let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
//   let average = parseFloat(content.filter(product => product.brand === brand && product.rating > 0).reduce((previous,current,index,array) => {
//     let calcSum = previous + current.rating;
//     if(index === array.length - 1 ) {
//         return calcSum/array.length;
//     }
//     return calcSum;
//   },0).toFixed(1));
//   return average;
  
// }

module.exports = router;
