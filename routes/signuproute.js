var express = require('express');

var route = express.Router();

var userController = require('../controllers/userController');

route.get('/', userController.signupform);

route.post('/', userController.adduser);

module.exports = route;