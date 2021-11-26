var express = require('express');
const fs = require('fs');
const { ServerResponse } = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // get phones array
  let phones = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  res.json(phones);
});

router.post("/", function(req, res, next) {
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  content.push({
    "name": req.body.name,
    "brand": req.body.brand,
    "operating_system": req.body.operating_system,
    "price": Number(req.body.price),
    "discount": Number(req.body.discount),
    "quantity": Number(req.body.quantity),
    "availability_date":req.body.availability_date,
    "rating": Number(req.body.rating),
    "image": req.body.image
  });
  fs.writeFile('./phones.json', JSON.stringify(content), function (err) { 
    if (err){
      console.log(err);
      res.send(`Error`);
    } else{
      console.log('Write operation complete.');
      res.send(`Adding phone ${req.body.name}`);
    }
  })
})

//FUNCTIONS
function arrayCheckboxes(property, obj){
  let propertySet = new Set();
  obj.forEach(product => propertySet.add(product[property]));
  return propertySet;
}

function filterProducts(products,filterFunction,sortFunction){
  if (filterFunction) {
      products = products.filter(filterFunction);
  }
  if (sortFunction) {
      products = products.sort(sortFunction);
  }
  return products;
}

function searchProducts(item, searchValue) {
  if (searchValue){
    return item.brand.toLowerCase().includes(searchValue.toLowerCase()) || item.name.toLowerCase().includes(searchValue.toLowerCase())
  }
  return true;
}

// filter by brands
function getProductsByBrand(item,brands){
  if(brands){
      return brands.indexOf(item.brand) !== -1;
  }
  return true;
}

// filter by price range
function getProductsByPriceRange(item,range){
  let checkedPriceRange = [];
  if(range){
    checkedPriceRange.push(range);
    checkedPriceRange = checkedPriceRange[0].split("_");
  }
  if(checkedPriceRange.length > 0){
      if(checkedPriceRange.length === 1){
          return (item.price-item.discount) >= checkedPriceRange[0];
      } else {
          return (item.price-item.discount) >= checkedPriceRange[0] && (item.price-item.discount) <= checkedPriceRange[1];
      }
  }
  return true;
  
}

// filter by OS
function getProductsByOS(item,os) {
  if(os){
      return os.indexOf(item.operating_system) !== -1;
  }
  return true;
}

// filter by minimum rating
function getProductsByRating(item,rating){
  // let selectedRating = document.getElementById('minimum_rating').value;
  if(rating){
      return item.rating >= rating;
  }
  return true;
}

// filter by available stock (change stock to zero to see effects)
function getProductsByStock(item, stock){
  let isChecked;
  if(stock) {
    isChecked = true;
  }
  
  if(isChecked){
      return item.quantity > 0;
  }
  return true;
}

function getSorted(sort) {
  if(sort === "asc"){
    return (a,b) => {
      return a.price - b.price;
    };
  } else if(sort === "desc"){
    return (a,b) => {
      return b.price - a.price;
    };
  }
}


module.exports = router;
