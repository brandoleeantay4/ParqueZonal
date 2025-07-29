const { DataTypes } = require('sequelize');
const { sequelize } = require('../loaders/db');

const MapData = sequelize.define('MapData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = MapData;
