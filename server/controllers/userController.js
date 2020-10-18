const path = require("path");

const createUser = (req, res) => {
  res.sendFile(path.join(__dirname, "../form.html"));
};

const processCreateUser = (req, res) => {
  const { User } = require("../models/index");

  new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
  }).save((err) => {
    if (err)
      console.log("Error! New user could not be addded to the db: " + err);
  });

  res.send(`New user ${req.body.name} added to the database!`);
};

module.exports = { createUser, processCreateUser };
