import express from 'express';
import { home } from '../controllers/homeController.mjs';
import { statique } from '../controllers/indexController.mjs';
import { login, logout } from '../controllers/authController/login.mjs';
import { getRegisterPage, register } from '../controllers/authController/register.mjs';
import studentsController from '../controllers/formateur/students.mjs'; // Check this import
import { showClasse, createClass } from '../controllers/classes/classController.mjs';

const router = express.Router();
const app = express();

function isAuthenticated(req, res, next) {
    console.log('Session:', req.session.user);
  
    if (req.session.user) {
        req.user = req.session.user;
        return next();
    }
    res.redirect('/login');
}

// console.log(home);
// console.log(statique);
// console.log(login);
// console.log(logout);
// console.log(getRegisterPage);
// console.log(register);
// console.log(studentsController);
// console.log(studentsController.etudaints);
// console.log(studentsController.addEtudiants);
// console.log(showClasse);
// console.log(createClass);

router.get('/', home);
router.get('/statique', isAuthenticated, statique);

router.get('/register', getRegisterPage);
router.post('/register', register);
router.get('/login', (req, res) => res.render('auth/login', { title: 'Login Page' }));
router.post('/login', login);
router.get('/logout', logout);

router.get('/Add-classe', isAuthenticated, showClasse);
router.post('/create-class', isAuthenticated, createClass);
// router.post('/add_etudiant', studentsController.addEtudiants);

router.route('/add_etudiant')
    .get(studentsController.etudaints)  
    .post(studentsController.addEtudiants);

app.use('/', router);

export default app;
