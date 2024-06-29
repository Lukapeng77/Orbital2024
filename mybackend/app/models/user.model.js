const mongoose = require('mongoose');
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Must be valid email adress"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    default: "",
    maxLength: [250, "Must be at most 250 characters long"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;
