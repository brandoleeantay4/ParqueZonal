const Animal = require('../models/Animal');

const animalService = {
  async getAllAnimals() {
    return await Animal.findAll();
  },

  async getAnimalById(id) {
    return await Animal.findByPk(id);
  },

  async createAnimal(data) {
    return await Animal.create(data);
  },

  async updateAnimal(id, data) {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      throw new Error('Animal no encontrado');
    }
    return await animal.update(data);
  },

  async deleteAnimal(id) {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      throw new Error('Animal no encontrado');
    }
    await animal.destroy();
    return { message: 'Animal eliminado exitosamente' };
  },
};

module.exports = animalService;
