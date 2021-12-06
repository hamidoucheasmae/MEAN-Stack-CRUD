'use strict';

const UsersModel = require('../model/model');
const bcrypt = require('bcrypt');

// create and save user
module.exports.create = (req, res) => {
    if (!req.body) {
        // validate request
        return res.status(400).send({
            message: 'Content can not be empty.'
        });
    }

    // new user
    const user = new UsersModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });


    //hash password
bcrypt.genSalt(10,(err,salt)=> 
bcrypt.hash(user.password,salt,
    (err,hash)=> {
        if(err) throw err;
            //save pass to hash
            user.password = hash;
        //save user
        user.save()
        .then((value)=>{
            console.log(value)
            req.flash('success_msg','You have now registered!')
        res.redirect('/add-user');
        })
        .catch(value=> console.log(value));
          
    }));

    // save data in the db
    // user
    //     .save()
    //     .then((data) => {
    //         // res.send(data);
    //         res.redirect('/add-user');
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating a create operation"
    //         });
    //     });
};

// return all users/ return a single user
module.exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        // const password = req.query.password;

        UsersModel.findById(id)
            .then((user) => {

                if (!user) {
                    res.status(404).send({
                        message: `Not found user with id: ${id}.`
                    });
                }

                res.send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Error retrieving user by id: ${id}.`
                });
            });
    }

    UsersModel.find()
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500);
        });
};

// update user by id
module.exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: 'Some error occurred during the update operation.'
            });
    }

    const id = req.params.id;
    UsersModel.findByIdAndUpdate(id, req.body)
        .then((data) => {

            if (!data) {
                res.status(404).send({
                    message: `Can not update user with id: ${id}.`
                });
            }

            res.send(data);

        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error update user.'
            });
        });
};

// delete user by id (delete reserved)
module.exports.deleteUser = (req, res) => {
    const id = req.params.id;

    UsersModel.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    message: `Error delete user with id: ${id}.`
                });
            }

            res.send({
                message: 'User was deleted.'
            });

        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete User with id: ${id}.`
            });
        });
};