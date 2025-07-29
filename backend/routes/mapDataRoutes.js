const express = require('express');
const mapDataController = require('../controllers/mapDataController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', mapDataController.getMapData);
router.put('/', auth, mapDataController.updateMapData);

module.exports = router;
