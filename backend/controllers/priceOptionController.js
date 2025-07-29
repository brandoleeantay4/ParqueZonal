const priceOptionService = require('../services/priceOptionService');

const priceOptionController = {
  async getAllPriceOptions(req, res, next) {
    try {
      const options = await priceOptionService.getAllPriceOptions();
      res.status(200).json(options);
    } catch (error) {
      next(error);
    }
  },

  async getPriceOptionById(req, res, next) {
    try {
      const option = await priceOptionService.getPriceOptionById(req.params.id);
      if (!option) {
        return res.status(404).json({ message: 'Opción de precio no encontrada' });
      }
      res.status(200).json(option);
    } catch (error) {
      next(error);
    }
  },

  async createPriceOption(req, res, next) {
    try {
      const option = await priceOptionService.createPriceOption(req.body);
      res.status(201).json(option);
    } catch (error) {
      next(error);
    }
  },

  async updatePriceOption(req, res, next) {
    try {
      const option = await priceOptionService.updatePriceOption(req.params.id, req.body);
      res.status(200).json(option);
    } catch (error) {
      next(error);
    }
  },

  async deletePriceOption(req, res, next) {
    try {
      const result = await priceOptionService.deletePriceOption(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = priceOptionController;
