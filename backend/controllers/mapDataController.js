const mapDataService = require('../services/mapDataService');

const mapDataController = {
  async getMapData(req, res, next) {
    try {
      const mapData = await mapDataService.getMapData();
      res.status(200).json(mapData);
    } catch (error) {
      next(error);
    }
  },

  async updateMapData(req, res, next) {
    try {
      const mapData = await mapDataService.updateMapData(req.body);
      res.status(200).json(mapData);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mapDataController;
