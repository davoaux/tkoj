const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  comparePasswords: async (password, hashedPassword) => {
    await bcrypt.compare(password, hashedPassword);
  },

  generateToken: (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 1209600, // 2 weeks
  }),
};
