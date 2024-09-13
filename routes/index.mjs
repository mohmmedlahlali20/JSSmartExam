import express from "express";
import { home } from "../controllers/homeController.mjs";
import { statique } from "../controllers/indexController.mjs";
import { login, logout } from "../controllers/authController/login.mjs";
import {
  getRegisterPage,
  register,
} from "../controllers/authController/register.mjs";
import studentsController from "../controllers/formateur/students.mjs";
import {
  showClasse,
  createClass,
} from "../controllers/classes/classController.mjs";
import { isAuthenticated } from "../middleware/authMiddleware.mjs";
import {
  createNiveauController,
  getNiveauxController,
  updateNiveauController,
  deleteNiveauController,
} from "../controllers/niveaux/niveauController.mjs";
import { getTests } from "../controllers/tests/testController.mjs";



const router = express.Router();
const app = express();

router.get("/", home);
router.get("/statique", isAuthenticated, statique);

router.get("/register", getRegisterPage);
router.post("/register", register);
router.get("/login", (req, res) =>
  res.render("auth/login", { title: "Login Page" })
);
router.post("/login", login);
router.get("/logout", logout);

router.get("/Add-classe", isAuthenticated, showClasse);
router.post("/create-class", isAuthenticated, createClass);
router
  .route("/add_etudiant")
  .get(studentsController.etudaints)
  .post(studentsController.addEtudiants);
router.post(
  "/add_etudiant/:id",
  isAuthenticated,
  studentsController.updateStudent
);
router.delete(
  "/delete_student/:id",
  isAuthenticated,
  studentsController.deleteStudent
);

//niveaux
router.get("/niveaux", getNiveauxController);
router.post("/create-niveau", createNiveauController);
router.post("/update-niveau", updateNiveauController);
router.post("/delete-niveau/:id", deleteNiveauController);

// tests
router.get("/tests", getTests);




app.use("/", router);

export default app;
