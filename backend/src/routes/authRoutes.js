const express = require("express");
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validationMiddleware,
  registerUser
);

// Routes
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validationMiddleware,
  loginUser
);

router.post(
  "/forgot-password",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),
  ],
  validationMiddleware,
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body("resetToken")
      .notEmpty()
      .withMessage("Reset token is required"),

    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  validationMiddleware,
  resetPassword
);

module.exports = router;