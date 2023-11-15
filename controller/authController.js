// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils.js');

const UserAuthentication = async (req, res) => {
  const { username, password } = req.body;

  // Verifique as credenciais no banco de dados ou em alguma fonte de dados
  //const user = { username, password: '$2b$10$123456789012345678901uuI5E5J5qKlRCaXgTkYwGBjD/5bz/E.' }; // Senha já criptografada
  const user = await findUserByUserName()

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gere um token JWT
  const token = jwtUtils.generateToken(user);

  res.json({ token });
};

module.exports = {
    UserAuthentication,
};
