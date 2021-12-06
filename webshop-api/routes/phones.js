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

router.get('/:id', function(req, res, next) {
  
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  let phone = content.find(item => item["id"] == req.params.id);
  res.json(phone);
});

router.post("/", function(req, res, next) {
  let content = JSON.parse(fs.readFileSync('./phones.json', 'utf8'));
  content.push({
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




module.exports = router;
