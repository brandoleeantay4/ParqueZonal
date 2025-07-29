const heroSlideService = require('../services/heroSlideService');

const heroSlideController = {
  async getAllHeroSlides(req, res, next) {
    try {
      const slides = await heroSlideService.getAllHeroSlides();
      res.status(200).json(slides);
    } catch (error) {
      next(error);
    }
  },

  async getHeroSlideById(req, res, next) {
    try {
      const slide = await heroSlideService.getHeroSlideById(req.params.id);
      if (!slide) {
        return res.status(404).json({ message: 'Slide no encontrado' });
      }
      res.status(200).json(slide);
    } catch (error) {
      next(error);
    }
  },

  async createHeroSlide(req, res, next) {
    try {
      const slide = await heroSlideService.createHeroSlide(req.body);
      res.status(201).json(slide);
    } catch (error) {
      next(error);
    }
  },

  async updateHeroSlide(req, res, next) {
    try {
      const slide = await heroSlideService.updateHeroSlide(req.params.id, req.body);
      res.status(200).json(slide);
    } catch (error) {
      next(error);
    }
  },

  async deleteHeroSlide(req, res, next) {
    try {
      const result = await heroSlideService.deleteHeroSlide(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = heroSlideController;
