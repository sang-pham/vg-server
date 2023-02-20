const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created: Date.now,
  role: {
    type: String,
    default: 'user'
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User