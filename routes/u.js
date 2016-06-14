var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Post = require('../models/Post');

router.get('/:user', function(req, res, next) {
    res.locals.user = req.session.user;

    var error = req.flash('error')
    var success = req.flash('success');

    res.locals.error = error.length ? error : null;
    res.locals.success = success.length ? success : null;

    User.get(req.params.user, function(err, user) {
        if(!user) {
            req.flash('error', 'The user is not existed');
            return res.redirect('/');
        }

        Post.get(user.name, function(err, posts) {
            if(err) {
                req.flash('error', err);
                return redirect('/');
            }

            res.render('user', {title: user.name, posts: posts})
        });
    });
});

module.exports = router;
