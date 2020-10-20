const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
const saltRounds = 10;

module.exports = {
  menu: (req, res) => {
    res.sendFile(path.join(__dirname, '../form.html'));
  },

  signUp: async (req, res) => {
    const { email, password } = req.body;

    await User.find({ email: req.body.email }, async (err, user) => {
      if (err) return res.status(500).send(err);

      if (user.length != 0)
        return res.status(500).send('Email is already registered');

      const hash = await bcrypt.hash(password, 10);

      User.create({
        email: email,
        password: hash,
      });

      res.send(`New user added to the database!`);
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    await User.findOne({ email }, async (err, user) => {
      if (err) return res.status(500).send(err);

      if (!user) return res.status(500).send('User not found');

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.send('Incorrect password');

      res.send('The email and password are correct! 👍');
    });
  },

  deactivateUser: (req, res) => {
    User.updateOne({ id: req.params.id }, { active: false });
    res.send('TEST: user deactivated');
  },
};
