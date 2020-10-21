const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'todo',
  },
  urgency: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
  },
  listId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = taskSchema;
