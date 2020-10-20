const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  creation: { type: Date, default: Date.now() },
});

module.exports = userSchema;
