const express = require('express');
const heroSlideController = require('../controllers/heroSlideController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', heroSlideController.getAllHeroSlides);
router.get('/:id', heroSlideController.getHeroSlideById);
router.post('/', auth, heroSlideController.createHeroSlide);
router.put('/:id', auth, heroSlideController.updateHeroSlide);
router.delete('/:id', auth, heroSlideController.deleteHeroSlide);

module.exports = router;
