// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  cottage:{type:Boolean},
  glamp:{type:Boolean},
  contact: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
