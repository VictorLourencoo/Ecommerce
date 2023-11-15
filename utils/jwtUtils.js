// src/utils/jwtUtils.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.API_KEY

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '2h' });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
