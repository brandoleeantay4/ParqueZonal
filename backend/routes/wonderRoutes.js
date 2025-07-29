const express = require('express');
const wonderController = require('../controllers/wonderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', wonderController.getAllWonders);
router.get('/:id', wonderController.getWonderById);
router.post('/', auth, wonderController.createWonder);
router.put('/:id', auth, wonderController.updateWonder);
router.delete('/:id', auth, wonderController.deleteWonder);

module.exports = router;
