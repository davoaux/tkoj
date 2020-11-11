const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

noteSchema.pre('save', async function onSave(next) {
  if (this.category.length === 0) this.category.push('general');
  next();
});

module.exports = mongoose.model('Note', noteSchema);
