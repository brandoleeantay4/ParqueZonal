const MapData = require('../models/MapData');

const mapDataService = {
  async getMapData() {
    // Siempre habrá un solo registro de MapData, o se creará si no existe
    let mapData = await MapData.findOne();
    if (!mapData) {
      mapData = await MapData.create({ image: '/placeholder.svg', active: true });
    }
    return mapData;
  },

  async updateMapData(data) {
    let mapData = await MapData.findOne();
    if (!mapData) {
      mapData = await MapData.create(data);
    } else {
      await mapData.update(data);
    }
    return mapData;
  },
};

module.exports = mapDataService;
