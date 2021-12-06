'use strict';

//DB Schema
const {
    Schema,
    model
} = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true // not undefined
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
}, {
    versionKey: false,
    collection: 'users'
});

module.exports = model('UsersModel', UsersSchema);