const express = require('express');
const router = express.Router();
const nightmareController = require('../controllers/nightmareController');

router.post('/generate', nightmareController.generateNightmare);
router.get('/history', nightmareController.getDreamHistory);

module.exports = router;
