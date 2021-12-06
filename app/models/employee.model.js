const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    username: String,
    email: String,
    password: String,

}, {
        timestamps: true
    });

module.exports = mongoose.model('Employee', Employee);