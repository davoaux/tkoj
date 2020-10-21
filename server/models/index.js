const mongoose = require('mongoose');

const UserSchema = require('./User');
const NoteSchema = require('./Note');

module.exports = {
  User: mongoose.model('User', UserSchema),
  Note: mongoose.model('Note', NoteSchema),
};
