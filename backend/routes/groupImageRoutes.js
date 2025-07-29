const express = require('express');
const groupImageController = require('../controllers/groupImageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', groupImageController.getAllGroupImages);
router.get('/:id', groupImageController.getGroupImageById);
router.post('/', auth, groupImageController.createGroupImage);
router.put('/:id', auth, groupImageController.updateGroupImage);
router.delete('/:id', auth, groupImageController.deleteGroupImage);

module.exports = router;
