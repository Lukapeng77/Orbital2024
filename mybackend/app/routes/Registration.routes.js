module.exports = app => {
    const user = require("../controllers/");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    app.use('/api/register', router);
  };