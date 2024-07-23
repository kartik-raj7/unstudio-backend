const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authenticateToken = require('../middleware/authentication');
router.post('/media', authenticateToken,mediaController.uploadMedia);
router.delete('/media', authenticateToken, mediaController.deleteMedia);
router.get('/media/:userId/:type', authenticateToken, mediaController.getUserMedia);

module.exports = router;
