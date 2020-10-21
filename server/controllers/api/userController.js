const { User } = require('../../models/index');

module.exports = {
  getAllUsers: (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(users);
    });
  },

  getUser: (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(user);
    });
  }
};
