const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const registerRouter = require("express").Router();

// Create and Save a new user
  registerRouter.post("/", async (request, response) => {
    const { username, email, password } = request.body;
    const checkUsername = (obj) => obj.username === username;
  
    if (!username) {
      return response.status(400).json({
        error: "username is required",
      });
    }
    if (!password) {
      return response.status(400).json({
        error: "password is required",
      });
    }
    const condt = await User.find({});
    if (condt.some(checkUsername)) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username,
      email,
      passwordHash,
    });
  
    const savedUser = await user.save();
  
    response.status(201).json(savedUser);
  });
  
  module.exports = registerRouter;
  