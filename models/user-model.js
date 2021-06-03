const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema for login/register
const userSchema = new Schema({
    username: String,
    password: String,
  });
  const User = mongoose.model("User", userSchema);

  module.exports = User;
  