const mongoose = require('mongoose')
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const userSchema = new Schema({
  username : {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  user_info: {
    type: Object,
    required: false
  },
  created_by: {
    type: Object,
    required: false
  },
  created: {
    type: Date,
    default: new Date()
  },
  updated: {
    type: Date,
    default: new Date()
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'user'],
    default: 'user'
  },
  verified: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  email:{ 
    type: String,
  }
});

userSchema.pre('save', async function(next) {
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      this.updated = new Date()
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