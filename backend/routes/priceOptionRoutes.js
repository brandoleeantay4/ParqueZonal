const express = require('express');
const priceOptionController = require('../controllers/priceOptionController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', priceOptionController.getAllPriceOptions);
router.get('/:id', priceOptionController.getPriceOptionById);
router.post('/', auth, priceOptionController.createPriceOption);
router.put('/:id', auth, priceOptionController.updatePriceOption);
router.delete('/:id', auth, priceOptionController.deletePriceOption);

module.exports = router;
