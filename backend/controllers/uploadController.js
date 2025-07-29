const upload = require('../services/uploadService');

const uploadController = {
  uploadImage: (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha seleccionado ningún archivo.' });
      }
      // Devolver la ruta relativa de la imagen
      res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
    });
  },
};

module.exports = uploadController;
