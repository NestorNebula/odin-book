const jwt = require('jsonwebtoken');

const getToken = (user) => {
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1m' });
  return token;
};

module.exports = { getToken };
