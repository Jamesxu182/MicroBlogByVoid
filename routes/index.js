var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.user = req.session.user;

    var error = req.flash('error');
    var success = req.flash('success');

    res.locals.error = error.length ? error : null;
    res.locals.success = success.length? success : null;

    Post.get(null, function(err, posts) {
        res.render('index', { title: 'Express', posts: posts });
    });

    //res.render('index', { title: 'Express' });
});

module.exports = router;
