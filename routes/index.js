const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController/register')
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/statique', indexController.statique);
router.get('/register', authController.register);
module.exports = router;
