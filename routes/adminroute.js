var express = require('express');
var route = express.Router();

var userController = require('../controllers/userController');

route.get('/:id', userController.adminform);

route.post('/:id', userController.adminUpdate);

module.exports = route;