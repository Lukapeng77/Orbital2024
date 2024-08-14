module.exports = app => {
    const user = require("../controllers/Login.controller");
  
    var router = require("express").Router();
  
    // Retrieve a single User with username 
    router.get("/:username", user.findOne);
  
    app.use('/api/login', router);
  };