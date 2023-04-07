const mongoose = require("mongoose");
const { Schema } = mongoose;

const configSchema = new Schema({
  key: {
    type:String
  },
  description:{
    type:String
  },
  name:{
    type:String
  },
  configs: {
    type:JSON
  },
});

const Config = mongoose.model("configs", configSchema);
module.exports = Config;
