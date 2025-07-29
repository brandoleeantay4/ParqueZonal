const express = require('express');
const animalController = require('../controllers/animalController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.get('/:id', animalController.getAnimalById);
router.post('/', auth, animalController.createAnimal);
router.put('/:id', auth, animalController.updateAnimal);
router.delete('/:id', auth, animalController.deleteAnimal);

module.exports = router;
