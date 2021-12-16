const db = require("../models");
const Member = db.users;
const Role = db.role;
var bcrypt = require("bcryptjs");


// Create and Save a new member
exports.create = (req, res) => {
  const member = new Member({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  member.save((err, member) => {
    if (err){
      res.status(500).send({ message: err});
      return
    }

    if (req.body.roles){
      Role.find(
        {
          name: { $in: req.body.roles}
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          member.roles = roles.map(role => role._id);
          member.save(err => {
            if (err){
              res.status(500).send({ message: err });
              return
            }

            res.send({ message: "Member was registered succefully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        member.roles = [role._id];
        member.save(err => {
          if (err){
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Member was registered succefully!" });
        });
      });
    }
  });

};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  Member.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving members."
      });
    });
};

// Find a single Member with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Member.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Member with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Member with id=" + id });
      });
};

// Update a Member by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Member with id=${id}. Maybe Member was not found!`
            });
          } else res.send({ message: "Member was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Member with id=" + id
          });
        });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Member.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
          });
        } else {
          res.send({
            message: "Member was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Member with id=" + id
        });
      });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Member.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Members were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Members."
      });
    });
};

// Find all published Members
exports.findAllMembers = (req, res) => {
  
};