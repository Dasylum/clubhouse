var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    memberStatus: {type: Boolean, required: true},
    admin: {type: Boolean, required: true}
})

module.exports = mongoose.model('user', userSchema); 