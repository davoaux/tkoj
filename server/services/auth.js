const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  comparePasswords: async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      return false;
    }
  },

  generateToken: (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 1 day
    }),

  decodeToken: (token) => jwt.verify(token, process.env.JWT_SECRET),
};
