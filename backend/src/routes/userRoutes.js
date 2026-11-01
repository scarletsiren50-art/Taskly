
const express = require("express");
const { body } = require("express-validator");

const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),

    body("email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email"),
  ],
  validationMiddleware,
  updateProfile
);

router.delete(
  "/profile",
  authMiddleware,
  deleteProfile
);

module.exports = router;
