const uploadController = {
  uploadImage: (req, res, next) => {
    if (!req.cloudinaryUrl) {
      return res.status(500).json({ message: 'URL de Cloudinary no disponible después de la subida.' });
    }
    res.status(200).json({ filePath: req.cloudinaryUrl });
  },
};

module.exports = uploadController;