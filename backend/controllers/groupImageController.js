const groupImageService = require('../services/groupImageService');

const groupImageController = {
  async getAllGroupImages(req, res, next) {
    try {
      const images = await groupImageService.getAllGroupImages();
      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  },

  async getGroupImageById(req, res, next) {
    try {
      const image = await groupImageService.getGroupImageById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: 'Imagen de grupo no encontrada' });
      }
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  },

  async createGroupImage(req, res, next) {
    try {
      const image = await groupImageService.createGroupImage(req.body);
      res.status(201).json(image);
    } catch (error) {
      next(error);
    }
  },

  async updateGroupImage(req, res, next) {
    try {
      const image = await groupImageService.updateGroupImage(req.params.id, req.body);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  },

  async deleteGroupImage(req, res, next) {
    try {
      const result = await groupImageService.deleteGroupImage(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = groupImageController;
