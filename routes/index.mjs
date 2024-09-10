// index.mjs

import express from 'express';
import { home } from '../controllers/homeController.mjs'; // Updated to named import
import { statique } from '../controllers/indexController.mjs';
import { login, logout } from '../controllers/authController/login.mjs';
import { getRegisterPage, register } from '../controllers/authController/register.mjs';
import studentsController from '../controllers/formateur/students.mjs';
import { showClasse, createClass } from '../controllers/classes/classController.mjs';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Define routes
router.get('/', home);
router.get('/statique', statique);

// Auth routes
router.get('/register', getRegisterPage);
router.post('/register', register);
router.get('/login', (req, res) => res.render('auth/login', { title: 'Login Page' }));
router.post('/login', login);
router.get('/logout', logout);

// Formateur routes
router.get('/Add-classe',isAuthenticated, showClasse);
router.post('/create-class',isAuthenticated, createClass);

router.route('/add_etudiant')
    .get(isAuthenticated, studentsController.etudaints)
    .post(isAuthenticated, studentsController.addEtudiants);

router.get('/add_etudiant', isAuthenticated, studentsController.getEtudiants);

export default router;
