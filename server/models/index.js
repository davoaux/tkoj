const mongoose = require("mongoose");

const UserSchema = require("./User");

module.exports = {
  User: mongoose.model("User", UserSchema),
};
