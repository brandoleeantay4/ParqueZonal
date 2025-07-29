require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'chavin_huantar_park',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretjwtkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  env: process.env.NODE_ENV || 'development',
};
