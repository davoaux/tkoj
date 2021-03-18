const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Note = require('./Note');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, minlength: 5, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  creation: { type: Date, default: Date.now() },
});

// Encrypt password when creating a new user
schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(this.password, salt);
    this.password = encrypted;
  }
  next();
});

// When deleting a user, delete each of its notes
schema.pre('deleteOne', { document: false, query: true }, async function () {
  const doc = await this.model.findOne(this.getFilter());
  await Note.deleteMany({ userId: doc._id });
});

module.exports = mongoose.model('User', schema);
