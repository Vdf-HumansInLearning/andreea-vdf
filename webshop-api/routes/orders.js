var express = require('express');
const fs = require('fs');
const { ServerResponse } = require('http');
var router = express.Router();

router.get('/', function(req, res, next) {
  let orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf8'));
  if(orders){
    res.status(200).json(orders);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.get('/:id', function(req, res, next) {
    let orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf8'));
    let order = orders.find(order => order.id == req.params.id)
    if(order){
      res.status(200).json(order);
    } else {
      res.status(404).send({ message: "404 Not Found" });
    }
});

router.post('/', function(req, res, next) {
    let orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf8'));
    let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    let user = users.find(user => user.email === req.body.email);
    if (user && req.body.name && req.body.email && req.body.products && req.body.quntity && req.body.payment) {
      let order = {
        "id": orders[orders.length-1].id + 1,
        "user-id": user.id,
        "name": req.body.name,
        "email": req.body.email,
        "address": {
          "street": "",
          "suite": "",
          "city": "",
          "zipcode": ""
        },
        "phone": "",
        "order": [
            {
                "product": req.body.product,
                "quantity": req.body.quantity
            }
        ],
        "payment": req.body.payment
      };
  
      
        orders.push(order);
        fs.writeFile('./data/orders.json', JSON.stringify(orders), function (err) { 
            if (err) {
                throw err;
            } else {
                res.send({ message: "Successfully registered" });
            }
        })
    } else {
      res.status(400).send({ message: "Please complete all fields" });
    }
    
});


router.delete('/:id', function(req, res) {
    let orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf8'));
    let order = orders.find(order => order.id == req.params.id)
    if(order){
      let updatedOrders = orders.filter(order => order.id != req.params.id);
      try {
        fs.writeFileSync('./data/orders.json', JSON.stringify(updatedOrders));
        res.status(200).send({ message: `Deleting order ${req.params.id}` });
      } catch (err) {
        throw err;
      }
    }
  
});

module.exports = router;