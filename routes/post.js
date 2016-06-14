var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.post('/', function(req, res, next) {
    var currentUser = req.session.user;

    if(!currentUser) {
        req.flash('error', 'no login, please login first');
        return redirect('/login');
    }

    var post = new Post(currentUser.name, req.body.post);

    post.save(function(err) {
        if(err) {
            req.flash('error', 'error');
            return redirect('/');
        }

        req.flash('success', 'post successfully');
        res.redirect('/u/' + currentUser.name);
    });
})

module.exports = router;
