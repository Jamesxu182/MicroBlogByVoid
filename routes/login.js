var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var flash = require('express-flash');
var User = require('../models/User');

/* GET login page. */
router.get('/', function(req, res, next) {
    var error = req.flash('error');
    var success = req.flash('success');

    res.locals.error = error.length ? error : null;
    res.locals.success = success.length? success : null;

    res.render('login', { title: 'Login' });
});

/* POST login page */
router.post('/', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if(!user) {
            req.flash('error', 'user does not exist');
            return res.redirect('/login');
        }

        if(user.password != password) {
            req.flash('error', 'wrong password');
            return res.redirect('/login')
        }

        req.session.user = user;
        req.flash('success', 'login sucessful');

        //return res.redirect('/u/' + user.name);
        return res.redirect('/u/' + user.name);
    });
});

module.exports = router;
