const { response } = require('express');
var express = require('express');
const axios = require('axios').default;
var router = express.Router();

router.delete('/:id', function(req, res) {
    res.send(`Deleting user ${req.params.id}`);
    axios.delete(`http://localhost:3001/user/${req.params.id}`, { data: req.params.id }).then(
    )
  
});

module.exports = router;