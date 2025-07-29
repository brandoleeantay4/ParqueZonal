const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = config.database.url
  ? new Sequelize(config.database.url, {
      dialect: 'mysql',
      logging: false,
    })
  : new Sequelize(
      config.database.name,
      config.database.user,
      config.database.password,
      {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mysql',
        logging: false,
      }
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos MySQL establecida correctamente.');
    // Sincronizar modelos (crea las tablas si no existen)
    await sequelize.sync({ alter: true }); // 'alter: true' para actualizar tablas existentes
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1); // Salir del proceso con error
  }
};

module.exports = { sequelize, connectDB };
