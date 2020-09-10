var express = require('express');
var route = express.Router();

var postController = require('../controllers/postController');

route.get('/:id', postController.deletePost);

module.exports = route;