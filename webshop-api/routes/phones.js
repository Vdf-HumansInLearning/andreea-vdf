var express = require('express');
const fs = require('fs');
const { ServerResponse } = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // get phones array
  let phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
  if(phones){
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
  
    // get filters array
    filters.brand = Array.from(arrayCheckboxes("brand",phones));
    filters.os = Array.from(arrayCheckboxes("operating_system",phones));
  
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
    // filter phones array by query params
    var products;
     if(req.query.sort === "none"){
       products = filterProducts(phones,item => searchProducts(item,req.query.search) && getProductsByBrand(item,req.query.brand) && getProductsByPriceRange(item,req.query.price_range) && getProductsByOS(item,req.query.os) && getProductsByRating(item,req.query.minimum_rating) && getProductsByStock(item,req.query.stock_yes));
     } else {
       products = filterProducts(phones,item => searchProducts(item,req.query.search) && getProductsByBrand(item,req.query.brand) && getProductsByPriceRange(item,req.query.price_range) && getProductsByOS(item,req.query.os) && getProductsByRating(item,req.query.minimum_rating) && getProductsByStock(item,req.query.stock_yes), getSorted(req.query.sort));
     }
    let response = {
      products : products,
      filters : filters,
      selectedFilters : selectedFilters
    }
    res.status(200).json(response);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.get('/:id', function(req, res, next) {
  
  let content = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
  let phone = content.find(item => item["id"] == req.params.id);
  if(phone){
    res.status(200).json(phone);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.post("/", function(req, res, next) {
  let content = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
  if (req.body.name && req.body.brand && req.body.operating_system && req.body.price && req.body.quantity && req.body.availability_date && req.body.image) {
    let product = {
      "id": content[content.length-1].id + 1,
      "name": req.body.name,
      "brand": req.body.brand,
      "operating_system": req.body.operating_system,
      "price": Number(req.body.price),
      "discount": Number(req.body.discount),
      "quantity": Number(req.body.quantity),
      "availability_date":req.body.availability_date,
      "rating": Number(req.body.rating),
      "image": req.body.image
    };

    if (validateProduct(product)) {
      let verifyProduct = content.find((item) => item.name == product.name && item.brand == product.brand);
      if (verifyProduct) {
        res.status(403).send({ message: "Product already exist." });
      } else {
        content.push(product);
        fs.writeFile('./data/phones.json', JSON.stringify(content), function (err) { 
          if (err){
            throw err;
          } else{
            res.status(200).send({ message : `Adding phone ${req.body.name}`});
          }
        })
      }
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
  
});

// delete
router.delete('/:id', function(req, res) {
  console.log(req.params.id);
  let phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
  let phone = phones.find(phone => phone.id == req.params.id)
  console.log(phone);
  if(phone){
    let updatedPhones = phones.filter(phone => phone.id != req.params.id);
    try {
      fs.writeFileSync('./data/phones.json', JSON.stringify(updatedPhones));
      res.status(200).send({ message: `Deleting phone ${req.params.id}` });
    } catch (err) {
      throw err;
    }
  }

});

// update
router.put("/:id", function(req, res, next) {
  let content = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
  let contentIds = content.map(element => element.id);
  let index = contentIds.indexOf(Number(req.params.id));
  let phone = content.find(phone => phone.id == req.params.id);
  console.log(phone);
  if (phone && req.body.name && req.body.brand && req.body.operating_system && req.body.price && req.body.quantity && req.body.availability_date && req.body.image) {
    let updatedProduct = {
      "id": phone.id,
      "name": req.body.name,
      "brand": req.body.brand,
      "operating_system": req.body.operating_system,
      "price": Number(req.body.price),
      "discount": Number(req.body.discount),
      "quantity": Number(req.body.quantity),
      "availability_date":req.body.availability_date,
      "rating": Number(req.body.rating),
      "image": req.body.image
    };
    console.log(updatedProduct);
    if (validateProduct(updatedProduct)) {
        content[index] = updatedProduct;
        fs.writeFile('./data/phones.json', JSON.stringify(content), function (err) { 
          if (err){
            throw err;
          } else{
            res.status(201).send({ message : `Updating phone ${req.body.name}`});
          }
        })
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
  
});


function validateProduct(product) {
  let regexProductName = /(^[A-Za-z0-9]{1,16})([ ]{0,1})([A-Za-z0-9]{1,16})?([ ]{0,1})?([A-Za-z0-9]{1,16})/
  let regexLetters = /^[a-zA-Z]+$/;
  let isValid = false;
  if (
    product.name.match(regexProductName) &&
    product.name.length >= 1 &&
    product.name.length <= 30 &&
    product.brand.match(regexLetters) &&
    product.brand.length >= 1 &&
    product.brand.length <= 30 &&
    product.operating_system.match(regexLetters) &&
    product.price > 0 &&
    product.discount >= 0 &&
    product.quantity >= 0 &&
    product.rating >= -1 &&
    product.rating <= 5 &&
    product.availability_date.length > 0
  )
    isValid = true;
  else isValid = false;
  return isValid;
}

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

module.exports = {router,getProductsByBrand};
