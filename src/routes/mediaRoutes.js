const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authenticateToken = require('../middleware/authentication');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });
router.post('/media', authenticateToken,mediaController.uploadMedia);
router.delete('/media', authenticateToken, mediaController.deleteMedia);
router.get('/media/:userId/:type', authenticateToken, mediaController.getUserMedia);
router.post('/upload', upload.single('media'),mediaController.uploadMedias);

module.exports = router;
