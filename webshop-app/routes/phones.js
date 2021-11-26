var express = require('express');
const fs = require('fs');
const axios = require('axios').default;
var router = express.Router();

/* GET home page. */
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
  axios.get('http://localhost:3001/phones')
  .then(function (response) {
    // handle success
    var filters = {
      brand : [],
      os : []
    }
    
    var selectedFilters = {
      search : "",
      sort : "",
      brand : [],
      price_range : "",
      minimum_rating : 0,
      os : [],
      in_stock : 'false'
    
    }
  
    // get phones array
    let phones = response.data;
    // let phones = content.products;
  
    // get filters array
    filters.brand = Array.from(arrayCheckboxes("brand",phones));
    filters.os = Array.from(arrayCheckboxes("operating_system",phones));
    
    // filter phones array by query params
  
    var products;
     if(req.query.sort === "none"){
       products = filterProducts(phones,item => searchProducts(item,req.query.search) && getProductsByBrand(item,req.query.brand) && getProductsByPriceRange(item,req.query.price_range) && getProductsByOS(item,req.query.os) && getProductsByRating(item,req.query.minimum_rating) && getProductsByStock(item,req.query.stock_yes));
     } else {
       products = filterProducts(phones,item => searchProducts(item,req.query.search) && getProductsByBrand(item,req.query.brand) && getProductsByPriceRange(item,req.query.price_range) && getProductsByOS(item,req.query.os) && getProductsByRating(item,req.query.minimum_rating) && getProductsByStock(item,req.query.stock_yes), getSorted(req.query.sort));
     }
    // set selected filters from query
    if(req.query.search){
      selectedFilters.search = req.query.search;
    }
    if(req.query.sort){
      selectedFilters.sort = req.query.sort;
    }
    if(req.query.brand){
      selectedFilters.brand = req.query.brand;
    }
    if(req.query.price_range){
      selectedFilters.price_range = req.query.price_range;
    }
    if(req.query.minimum_rating){
      selectedFilters.minimum_rating = req.query.minimum_rating;
    }
    if(req.query.os){
      selectedFilters.os = req.query.os;
    }
    if(req.query.stock_yes){
      selectedFilters.in_stock = req.query.stock_yes;
    }
    
    // send phones and filters to render method
    res.render('phones', { 
      title: 'Phones',
      css: 'stylesheets/phones-style.css',
      products: products,
      filters : filters,
      selectedFilters : selectedFilters,
      admin : admin,
      logged_in : logged_in
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  
});

router.post("/", function(req, res, next) {
  res.send(`Adding phone ${req.query.name}`);
  axios.post('http://localhost:3001/phones', {
    name: req.query.name,
    brand: req.query.brand,
    operating_system : req.query.os,
    price : Number(req.query.price),
    discount : Number(req.query.discount),
    quantity : Number(req.query.quantity),
    availability_date :req.query.date,
    rating : Number(req.query.rating),
    image : req.query.imgUrl
  },{
  "headers": {
    "content-type": "application/json",
  }})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
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
