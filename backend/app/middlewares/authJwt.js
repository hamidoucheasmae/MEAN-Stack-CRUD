const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  // Check if token exists
  if (!token) {
    return res.status(403).send({ message: "No token provided!"});
  }

  // verify token using JWT
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  })
}

isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err){
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
        }

        for (let i = 0; i < roles.length; i++){
          if (roles[i].name === "user"){
            next();
            return;
          }
        }

        res.status(403).send({ message: "Restricted to user role!" });
        return;
      }
    )
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err){
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
        }

        for (let i = 0; i < roles.length; i++){
          if (roles[i].name === "admin"){
            next();
            return;
          }
        }

        res.status(403).send({ message: "Restricted to admin role!" });
        return;
      }
    )
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isUser
}

module.exports = authJwt;
