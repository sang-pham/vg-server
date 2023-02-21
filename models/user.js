const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
  google_id: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
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
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function(next) {
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(encryptPass) {
  return bcrypt.compare(encryptPass, this.password)
};

const User = mongoose.model('users', userSchema);
module.exports = User