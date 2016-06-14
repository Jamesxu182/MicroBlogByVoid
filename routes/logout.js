var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.user = null;

    req.flash('success', 'logout successfully');

    return res.redirect('/');
});

module.exports = router;
