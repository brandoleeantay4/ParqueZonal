const express = require('express');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const uploadToCloudinary = require('../services/uploadService'); // Importar el nuevo middleware

const router = express.Router();

// Ruta para subir una imagen. Protegida por autenticación.
router.post('/', auth, uploadToCloudinary, uploadController.uploadImage);

module.exports = router;
