const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  comparePasswords: async (password, hashedPassword) => {
    await bcrypt.compare(password, hashedPassword);
  },

  generateToken: (user) =>
    jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 1 day
    }),

  decodeToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
