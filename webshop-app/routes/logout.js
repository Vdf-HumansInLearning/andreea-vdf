var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.clearCookie('user_id');
    res.clearCookie('user_role');
    res.render("logout",{});
});

module.exports = router;