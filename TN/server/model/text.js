const mongoose = require('mongoose');

const textSchema = new mongoose.Schema(
  {
    textInput: String,
    textOutput: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Text', textSchema);
