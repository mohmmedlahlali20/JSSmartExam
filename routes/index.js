const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController/register");
const loginController = require("../controllers/authController/login");
router.get("/statique", indexController.statique);
router.get("/register", authController.register);
router.get("/login", loginController.login);
module.exports = router;
