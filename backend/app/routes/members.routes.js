module.exports = app => {

    const members = require("../controllers/members.controller.js");

      var router = require("express").Router();
    
      // Create a new members
      router.post("/", members.create);
    
      // Retrieve all members
      router.get("/", members.findAll);
    
      // Retrieve a single members with id
      router.get("/:id", members.findOne);
    
      // Update a Member with id
      router.put("/:id", members.update);
    
      // Delete a members with id
      router.delete("/:id", members.delete);
    
      // Create a new members
      router.delete("/", members.deleteAll);
    
      app.use('/api/members', router);
    };