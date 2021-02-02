const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  category: [
    {
      type: String,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

schema.pre('save', async function (next) {
  if (this.category.length === 0) this.category.push('general');
  next();
});

module.exports = mongoose.model('Note', schema);
