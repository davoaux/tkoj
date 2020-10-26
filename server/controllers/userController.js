const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  menu: (req, res) => {
    res.sendFile(path.join(__dirname, '../form.html'));
  },

  signUp: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) return res.status(500).json({ msg: 'Email is already registered' });

      return User.create({ email, password }, (err, savedUser) => {
        if (err) return res.status(500).json({ msg: 'Something went wrong saving user', err });
        return res.status(200).json({ msg: 'User created', user: savedUser });
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email and/or password missing' });

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(200).json({ msg: 'User not found' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(200).json({ msg: 'Incorrect password' });

      return res.status(200).json({ msg: 'The email and password are correct! 👍', user });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
