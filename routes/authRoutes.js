const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
  loginValidate,
  registerValidate,
} = require("../validators/authValidator");

router.post("/login", loginValidate, authController.login);
router.post("/register", registerValidate, authController.register);
router.post("/refresh", authController.refreshToken);

module.exports = router;
