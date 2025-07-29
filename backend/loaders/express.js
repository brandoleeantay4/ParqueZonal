const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
const uploadRoutes = require('../routes/uploadRoutes');
const heroSlideRoutes = require('../routes/heroSlideRoutes');
const wonderRoutes = require('../routes/wonderRoutes');
const animalRoutes = require('../routes/animalRoutes');
const priceOptionRoutes = require('../routes/priceOptionRoutes');
const groupImageRoutes = require('../routes/groupImageRoutes');
const mapDataRoutes = require('../routes/mapDataRoutes');

const errorHandler = require('../middleware/errorHandler');

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Servir archivos estáticos desde la carpeta 'uploads'
  app.use('/uploads', express.static('uploads'));

  // Rutas
  app.use('/api/upload', uploadRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/hero-slides', heroSlideRoutes);
  app.use('/api/wonders', wonderRoutes);
  app.use('/api/animals', animalRoutes);
  app.use('/api/price-options', priceOptionRoutes);
  app.use('/api/group-images', groupImageRoutes);
  app.use('/api/map-data', mapDataRoutes);


  // Manejo de errores centralizado
  app.use(errorHandler);

  return app;
};
