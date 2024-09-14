import express from 'express';
import { home } from '../controllers/homeController.mjs';
import { statique } from '../controllers/indexController.mjs';
import { login, logout } from '../controllers/authController/login.mjs';
import { getRegisterPage, register } from '../controllers/authController/register.mjs';
import studentsController from '../controllers/formateur/students.mjs';
import { showClasse, createClass } from '../controllers/classes/classController.mjs';
import Middleware from '../middleware/authMiddleware.mjs'; 
import { createNiveauController, getNiveauxController, updateNiveauController, deleteNiveauController } from '../controllers/niveaux/niveauController.mjs';
import { getTests } from '../controllers/tests/testController.mjs';

const router = express.Router();
const app = express();

app.use(Middleware.alreadyHaveClasse);

router.get("/", home);
router.get("/statique", Middleware.isAuthenticated, statique);

router.get("/register", getRegisterPage);
router.post("/register", register);
router.get("/login", (req, res) => res.render("auth/login", { title: "Login Page" }));
router.post("/login", login);
router.get("/logout", logout);

router.get("/Add-classe", Middleware.isAuthenticated, showClasse);
router.post("/create-class", Middleware.isAuthenticated, createClass);
router
  .route("/add_etudiant")
  .get(studentsController.etudaints)
  .post(studentsController.addEtudiants);
router.post("/add_etudiant/:id", Middleware.isAuthenticated, studentsController.updateStudent);
router.delete("/delete_student/:id", Middleware.isAuthenticated, studentsController.deleteStudent);

// niveaux
router.get("/niveaux",Middleware.isAuthenticated, getNiveauxController);
router.post("/create-niveau", Middleware.isAuthenticated,createNiveauController);
router.post("/update-niveau",Middleware.isAuthenticated, updateNiveauController);
router.post("/delete-niveau/:id",Middleware.isAuthenticated, deleteNiveauController);

// tests
router.get("/tests", getTests);

app.use("/", router);

export default app;
