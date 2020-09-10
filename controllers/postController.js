var post = require('../models/post');
var user = require('../models/user');

const { validationResult } = require('express-validator');

exports.postform = function(req, res, next) {
    res.render('createpost', {user: req.params.id});
}

exports.createpost = function(req, res, next) {
    user.findById(req.params.id)
        .then(result => {
            var instance = new post();

            instance.title = req.body.title;
            instance.text = req.body.text;
            instance.user = result._id;
            instance.author = result.username;

            instance.save((err, result) => {
                if(err) {
                    throw err;
                }

                else {
                    res.redirect('/');
                }
            })
        }) 
}

exports.postsdisplay = function(req, res, next) {
    post.find().then(result => {
        res.render('posts', {posts: result, user: req.user});
    })
}

exports.deletePost = function(req, res, next) {
    post.findByIdAndDelete(req.params.id).then(deleted => {
        res.redirect('/');
    })
}