var express = require('express');
var route = express.Router();

var postController = require('../controllers/postController');

route.post('/:id', postController.createpost);

route.get('/:id', postController.postform);

route.get('/', postController.postsdisplay);

module.exports = route; 