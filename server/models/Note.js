const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  links: { type: String },
  category: { type: String },
  userId: { type: Schema.Types.ObjectId },
});

module.exports = noteSchema;
