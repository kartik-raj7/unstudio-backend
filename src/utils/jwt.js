const jwt = require('jsonwebtoken');

const generateToken = (userUuid) => {
  return jwt.sign({ uuid: userUuid }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
