var express = require('express');
const axios = require('axios').default;
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('404', { 
    title: 'Error'
  });
});

module.exports = router;