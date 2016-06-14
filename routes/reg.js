var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/User')

/* GET reg page */
router.get('/', function(req, res, next) {
    var error = req.flash('error');
    var success = req.flash('success');

    res.locals.error = error.length ? error : null;
    res.locals.success = success.length? success : null;

    res.render('reg', {title: 'Register'});
});

router.post('/', function(req, res, next) {
    /* if password and password repeat is different */
    if(req.body['password'] != req.body['password-repeat']) {
        req.flash('error', 'The passwords that you input is different');
        /* redirect to /reg */
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({name: req.body.username, password: password});

    User.get(newUser.name, function(err, user) {
        if(user) {
            err = "user name has been exist";
        }

        if(err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        newUser.save(function(err, user) {
            if(err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }

            req.session.user = user;
            res.locals.user = req.session.user;
            req.flash('success', 'register successfully');
            res.redirect('/u/' + user.name);
        })
    })
});

module.exports = router;
