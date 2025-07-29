const PriceOption = require('../models/PriceOption');

const priceOptionService = {
  async getAllPriceOptions() {
    return await PriceOption.findAll();
  },

  async getPriceOptionById(id) {
    return await PriceOption.findByPk(id);
  },

  async createPriceOption(data) {
    return await PriceOption.create(data);
  },

  async updatePriceOption(id, data) {
    const option = await PriceOption.findByPk(id);
    if (!option) {
      throw new Error('Opción de precio no encontrada');
    }
    return await option.update(data);
  },

  async deletePriceOption(id) {
    const option = await PriceOption.findByPk(id);
    if (!option) {
      throw new Error('Opción de precio no encontrada');
    }
    await option.destroy();
    return { message: 'Opción de precio eliminada exitosamente' };
  },
};

module.exports = priceOptionService;
