const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  links: [
    {
      type: String,
    },
  ],
  category: [
    {
      type: String,
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = noteSchema;
