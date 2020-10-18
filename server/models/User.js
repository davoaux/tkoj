const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  active: { type: Boolean, default: true },
  creation: { type: Date, default: Date.now() },
});

module.exports = userSchema;
