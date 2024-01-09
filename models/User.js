// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  facebookId: String,
});

module.exports = mongoose.model('User', userSchema);
