var express = require('express');
var app = express();
var route = express.Router();

var userController = require('../controllers/userController');
var user = require('../models/user');

module.exports = function(passport) {
    route.get('/', userController.loginform);

    route.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));

    return route;
}