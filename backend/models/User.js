const { DataTypes } = require('sequelize');
const { sequelize } = require('../loaders/db'); // Renombrado de mongoose.js a db.js

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(191),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(191),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin', // Por defecto, los usuarios creados serán administradores
  },
});

module.exports = User;
