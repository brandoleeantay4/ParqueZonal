const HeroSlide = require('../models/HeroSlide');

const heroSlideService = {
  async getAllHeroSlides() {
    return await HeroSlide.findAll();
  },

  async getHeroSlideById(id) {
    return await HeroSlide.findByPk(id);
  },

  async createHeroSlide(data) {
    return await HeroSlide.create(data);
  },

  async updateHeroSlide(id, data) {
    const slide = await HeroSlide.findByPk(id);
    if (!slide) {
      throw new Error('Slide no encontrado');
    }
    return await slide.update(data);
  },

  async deleteHeroSlide(id) {
    const slide = await HeroSlide.findByPk(id);
    if (!slide) {
      throw new Error('Slide no encontrado');
    }
    await slide.destroy();
    return { message: 'Slide eliminado exitosamente' };
  },
};

module.exports = heroSlideService;
