const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  google_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  last_name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  birth_day: {
    type: Date,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: new Date()
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'user'],
    default: 'user'
  },
  sex: {
    type: String,
    enum: ['male', 'female']
  },
  verified: {
    type: Boolean,
    default: false
  }
});



const User = mongoose.model('users', userSchema);
module.exports = User