const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/googleauth', userController.authenticateUser);
module.exports = router;
