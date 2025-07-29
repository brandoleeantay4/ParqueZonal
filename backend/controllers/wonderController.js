const wonderService = require('../services/wonderService');

const wonderController = {
  async getAllWonders(req, res, next) {
    try {
      const wonders = await wonderService.getAllWonders();
      res.status(200).json(wonders);
    } catch (error) {
      next(error);
    }
  },

  async getWonderById(req, res, next) {
    try {
      const wonder = await wonderService.getWonderById(req.params.id);
      if (!wonder) {
        return res.status(404).json({ message: 'Maravilla no encontrada' });
      }
      res.status(200).json(wonder);
    } catch (error) {
      next(error);
    }
  },

  async createWonder(req, res, next) {
    try {
      const wonder = await wonderService.createWonder(req.body);
      res.status(201).json(wonder);
    } catch (error) {
      next(error);
    }
  },

  async updateWonder(req, res, next) {
    try {
      const wonder = await wonderService.updateWonder(req.params.id, req.body);
      res.status(200).json(wonder);
    } catch (error) {
      next(error);
    }
  },

  async deleteWonder(req, res, next) {
    try {
      const result = await wonderService.deleteWonder(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = wonderController;
