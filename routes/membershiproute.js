var express = require('express');
var route = express.Router();

var userController = require('../controllers/userController');

route.get('/:id', userController.membershipform);

route.post('/:id', userController.membershipUpdate);

module.exports = route;