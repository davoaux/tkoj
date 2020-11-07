const User = require('../../models/User');

module.exports = {
  getAllUsers: (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(users);
    });
  },

  getUserById: (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(user);
    });
  },

  getUserByEmail: (req, res) => {
    User.findOne({ email: req.params.email }, (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(user);
    });
  },

  deactivateUser: (req, res) => {
    User.findByIdAndUpdate(req.params.id, { active: false }, (err, user) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ msg: 'User deactivated', user });
    });
  },
};
