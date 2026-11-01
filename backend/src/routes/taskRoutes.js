const express = require("express");
const { body } = require("express-validator");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);

router.post(
  "/",
  authMiddleware,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Task title is required"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid priority"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid status"),

    body("category")
      .optional()
      .isIn([
        "Academic",
        "Design",
        "Development",
        "Documentation",
        "Personal",
        "Other",
      ])
      .withMessage("Invalid category"),

    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  validationMiddleware,
  createTask
);

router.put(
  "/:id",
  authMiddleware,
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Task title cannot be empty"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid priority"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid status"),

    body("category")
      .optional()
      .isIn([
        "Academic",
        "Design",
        "Development",
        "Documentation",
        "Personal",
        "Other",
      ])
      .withMessage("Invalid category"),

    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  validationMiddleware,
  updateTask
);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;