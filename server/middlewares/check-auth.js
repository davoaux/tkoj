const { decodeToken } = require('../services/auth');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decodedToken = decodeToken(token);
    req.user = decodedToken.id;
    next();
  } catch (error) {
    if (error) res.status(401).json({ message: 'Authorization denied' });
  }
};
