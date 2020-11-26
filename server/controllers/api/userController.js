const User = require('../../models/User');
const { comparePasswords, generateToken } = require('../../services/auth');

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(500).json({ message: 'Email is already registered' });
      }
      const newUser = await User.create({ name, email, password });

      return res.status(201).json({
        message: 'User registered',
        data: newUser,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Register failed', error: err });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and/or password missing' });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'User not found' });

      if (!(await comparePasswords(password, user.password))) {
        return res.status(401).json({ message: 'Password does not match' });
      }
      const token = generateToken(user);

      return res.status(200).json({
        token,
        message: 'The email and password are correct! 👍',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Login failed', error: err });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  deactivateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, { active: false });
      return res.status(200).json({ message: 'User deactivated', user });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
