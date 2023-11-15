// src/routes/authRoutes.js
const express = require('express');
const authController = require('../authController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.UserAuthentication);
router.get('/protected-resource', authMiddleware.authenticateToken, (req, res) => {
  res.json({ message: 'Este é um recurso protegido' });
});

module.exports = router;
