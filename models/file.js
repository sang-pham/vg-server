const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  asset_id: {
    type: String,
  },
  public_id: {
    type: String,
  },
  version: {
    type: Number,
  },
  version_id: {
    type: String,
  },
  signature: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  format: {
    type: String,
  },
  resource_type: {
    type: String,
  },
  created_at: {
    type: String,
  },
  tags: {
    type: JSON,
  },
  bytes: {
    type: Number,
  },
  type: {
    type: String,
  },
  etag: {
    type: String,
  },
  placeholder: false,
  url: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  folder: {
    type: String,
  },
  original_filename: {
    type: String,
  },
});

const File = mongoose.model("files", fileSchema);
module.exports = File;
