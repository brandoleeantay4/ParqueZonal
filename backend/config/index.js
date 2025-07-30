require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    name: process.env.MYSQLDATABASE || 'chavin_huantar_park',
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretjwtkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  env: process.env.NODE_ENV || 'development',
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
