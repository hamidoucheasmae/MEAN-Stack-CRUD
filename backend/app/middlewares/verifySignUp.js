const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicatedUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err})
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use" })
      return;
    }

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err});
        return
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use" })
      }

      // This should be called further down the line of indentations right?
      next();
    });
  });
};

checkRolesExist = (req, res, next) => {
  if (req.body.roles){
    for (let i = 0; i < req.body.roles.length; i++){
      if (!ROLES.includes(req, body.roles[i])){
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicatedUsernameOrEmail,
  checkRolesExist
};

module.exports = verifySignUp;