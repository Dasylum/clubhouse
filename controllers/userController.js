var bcrypt = require('bcryptjs');
var user = require('../models/user');

const {validationResult} = require('express-validator');

exports.signupform = function(req, res, next) {
    res.render('signupform');
}

exports.adduser = function(req, res, next) {
    const { firstName, lastName, username, password } = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.render('signupform');
        return;
    }

    else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            const userinstance = new user({
                firstName,
                lastName,
                username,    
                password: hashedPassword,    
                memberStatus: false,
                admin: false,
            });
            
            userinstance.save({}, (err, result) => {
                if(err) {
                    throw err
                }
        
                else {
                    res.redirect('/');
                }
            })
        })
    }
}

exports.loginform = function(req, res, next) {
    res.render('loginform', {errors: req.flash('error')});
}


exports.membershipform = function(req, res, next) {
    res.render('membershipform', {user: req.params.id});
}

exports.membershipUpdate = function(req, res, next) {
    if(req.body.password == 'hellyeah') {
        user.findByIdAndUpdate({_id: req.params.id}, {memberStatus: true}, (err, result) => {
            res.redirect('/');
        })  
    }
}

exports.adminform = function(req, res, next) {
    res.render('adminform', {user: req.params.id});
}

exports.adminUpdate = function(req, res, next) {
    if(req.body.password == 'adminmyman') {
        user.findByIdAndUpdate({_id: req.params.id}, {admin: true}, (err, result) => {
            res.redirect('/');
        })
    }
}