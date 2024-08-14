//const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = require("express").Router();

// Find the existing user
loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;
  
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }
  
    const userForToken = {
      userId: user._id,
      isAdmin: user.isAdmin,
    };
    
    // Check if the SECRET is available
    const SECRET= process.env.TOKEN_KEY;
    const token = jwt.sign(userForToken, SECRET);
  
    response
      .status(200)
      .send({ token, username: user.username, userId: user._id, isAdmin: user.isAdmin });
  });
  
  module.exports = loginRouter;
  