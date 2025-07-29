const Wonder = require('../models/Wonder');

const wonderService = {
  async getAllWonders() {
    return await Wonder.findAll();
  },

  async getWonderById(id) {
    return await Wonder.findByPk(id);
  },

  async createWonder(data) {
    return await Wonder.create(data);
  },

  async updateWonder(id, data) {
    const wonder = await Wonder.findByPk(id);
    if (!wonder) {
      throw new Error('Maravilla no encontrada');
    }
    return await wonder.update(data);
  },

  async deleteWonder(id) {
    const wonder = await Wonder.findByPk(id);
    if (!wonder) {
      throw new Error('Maravilla no encontrada');
    }
    await wonder.destroy();
    return { message: 'Maravilla eliminada exitosamente' };
  },
};

module.exports = wonderService;
