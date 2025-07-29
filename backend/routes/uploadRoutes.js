const express = require('express');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

const router = express.Router();

// Ruta para subir una imagen. Protegida por autenticación.
router.post('/', auth, uploadController.uploadImage);

module.exports = router;
