const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTokenSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  refresh_token: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  expire_time: {
    type: Number
  }
})

const UserToken = mongoose.model('user_token', userTokenSchema)
module.exports = UserToken