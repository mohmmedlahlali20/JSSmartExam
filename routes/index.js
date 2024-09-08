const express = require("express");
const router = express.Router();

const registerController = require('../controllers/authController/register');
const homeController = require('../controllers/homeController');
const indexController = require("../controllers/indexController");
const loginController = require('../controllers/authController/login');
const classeControler = require('../controllers/classes/classController')


router.get('/', homeController.home);
router.get('/statique', indexController.statique);
//auth
router.get('/register', registerController.getRegisterPage);
router.post('/register', registerController.register);
router.get("/login", loginController.login);
router.post('/login', loginController.login);


//formateur
router.get('/Add-classe', classeControler.classe);
router.post('/create-class', classeControler.createClass);

module.exports = router;
