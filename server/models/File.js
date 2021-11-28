const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  filename: String,
  mimetype: String,
  path: String,
});

const File = model("File", fileSchema);

module.exports = File;