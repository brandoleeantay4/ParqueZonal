const animalService = require('../services/animalService');

const animalController = {
  async getAllAnimals(req, res, next) {
    try {
      const animals = await animalService.getAllAnimals();
      res.status(200).json(animals);
    } catch (error) {
      next(error);
    }
  },

  async getAnimalById(req, res, next) {
    try {
      const animal = await animalService.getAnimalById(req.params.id);
      if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
      }
      res.status(200).json(animal);
    } catch (error) {
      next(error);
    }
  },

  async createAnimal(req, res, next) {
    try {
      const animal = await animalService.createAnimal(req.body);
      res.status(201).json(animal);
    } catch (error) {
      next(error);
    }
  },

  async updateAnimal(req, res, next) {
    try {
      const animal = await animalService.updateAnimal(req.params.id, req.body);
      res.status(200).json(animal);
    } catch (error) {
      next(error);
    }
  },

  async deleteAnimal(req, res, next) {
    try {
      const result = await animalService.deleteAnimal(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = animalController;
