var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    author: {type: String, required: true},
    time : { type : Date, default: Date.now }
})

module.exports = mongoose.model('post', postSchema);