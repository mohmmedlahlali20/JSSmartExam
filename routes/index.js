const express = require("express");
const router = express.Router();

const registerController = require('../controllers/authController/register');
const homeController = require('../controllers/homeController');
const indexController = require("../controllers/indexController");
const loginController = require('../controllers/authController/login');
const classeControler = require('../controllers/classes/classController')
const formateurController = require('../controllers/formateur/classe_Etudant');
const EtudaintController = require('../controllers/formateur/students')
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
  };
  

router.get('/', homeController.home);
router.get('/statique', isAuthenticated, indexController.statique);
//auth
router.get('/register', registerController.getRegisterPage);
router.post('/register', registerController.register);
router.get("/login", loginController.login);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);


//formateur
router.get('/Add-classe',isAuthenticated, classeControler.classe);
router.post('/create-class',isAuthenticated, classeControler.createClass);
router.get('/add_etudiant', isAuthenticated, formateurController.etudaints);
router.post('/add_etudiant', isAuthenticated, formateurController.addEtudaints);
router.get('/add_etudiant', isAuthenticated, EtudaintController.getEtudiant);

module.exports = router;
