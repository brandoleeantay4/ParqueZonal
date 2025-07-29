const authService = require('../services/authService');

const authController = {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
