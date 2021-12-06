'use strict';

const axios = require('axios');

// render templates
module.exports.homeRoute = (req, res) => {
    // get req to /api/users
    axios.get('http://localhost:8080/api/users')
        .then((response) => {
            return res.render("index", {
                users: response.data
            });
        })
        .catch((err) => {
            res.send(err);
        });
};

module.exports.addUserRoute = (req, res) => {
    return res.render("add_user");
};

module.exports.updateUserRoute = (req, res) => {
    axios.get('http://localhost:8080/api/users', {
            params: {
                id: req.query.id
            }
        })
        .then((userdata) => {
            return res.render('update_user', {
                user: userdata.data
            });
        })
        .catch((err) => {
            res.send(err);
        });
};