var express = require('express');
var route = express.Router();

var postController = require('../controllers/postController');

route.get('/', postController.postsdisplay);

module.exports = route; 