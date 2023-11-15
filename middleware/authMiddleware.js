// src/middleware/authMiddleware.js
const jwtUtils = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401); // Não autorizado
  }

  jwtUtils.verifyToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => res.sendStatus(403)); // Proibido
};

module.exports = {
  authenticateToken,
};
