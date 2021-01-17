const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  creation: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function onSave(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(this.password, salt);
    this.password = encrypted;
  }
  next();
});

userSchema.post('deleteOne', async function onRemove() {
  // TODO remove each not from this user
  console.log('deleteOne hook');
});

module.exports = mongoose.model('User', userSchema);
