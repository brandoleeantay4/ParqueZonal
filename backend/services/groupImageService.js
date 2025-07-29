const GroupImage = require('../models/GroupImage');

const groupImageService = {
  async getAllGroupImages() {
    return await GroupImage.findAll();
  },

  async getGroupImageById(id) {
    return await GroupImage.findByPk(id);
  },

  async createGroupImage(data) {
    return await GroupImage.create(data);
  },

  async updateGroupImage(id, data) {
    const image = await GroupImage.findByPk(id);
    if (!image) {
      throw new Error('Imagen de grupo no encontrada');
    }
    return await image.update(data);
  },

  async deleteGroupImage(id) {
    const image = await GroupImage.findByPk(id);
    if (!image) {
      throw new Error('Imagen de grupo no encontrada');
    }
    await image.destroy();
    return { message: 'Imagen de grupo eliminada exitosamente' };
  },
};

module.exports = groupImageService;
