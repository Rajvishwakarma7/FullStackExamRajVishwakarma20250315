const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  AuthController.register
);

router.post("/login", AuthController.login);

module.exports = router;
