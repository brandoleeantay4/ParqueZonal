const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.memoryStorage();
const uploadMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadToCloudinary = (req, res, next) => {
  uploadMulter.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Error de Multer:', err.message);
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha seleccionado ningún archivo.' });
    }

    try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'parque_chavin',
      });

      req.cloudinaryUrl = result.secure_url;
      next();
    } catch (cloudinaryError) {
      console.error('Error al subir a Cloudinary:', cloudinaryError);
      return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary.' });
    }
  });
};

module.exports = uploadToCloudinary;