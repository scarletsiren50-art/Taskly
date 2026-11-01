const Task = require("../models/Task");
const AppError = require("../utils/AppError");



const getTasks = async (req, res) => {
  try {
    const {
      search = "",
      status = "All",
      category = "All",
      sortBy = "newest",
      page = 1,
      limit = 5,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.max(Number(limit), 1);

    const query = {
      user: req.user.userId,
    };

    // Search by title
    if (search.trim()) {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Filter by status
    if (status !== "All") {
      query.status = status;
    }

    // Filter by category
    if (category !== "All") {
      query.category = category;
    }

    // Sorting
    let sortOption = {};

    if (sortBy === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sortBy === "dueDate") {
      sortOption = { dueDate: 1 };
    } else if (sortBy === "priority") {
      sortOption = {
        priority: 1,
      };
    } else {
      sortOption = { createdAt: -1 };
    }

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(
      totalTasks / itemsPerPage
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      totalTasks,
      currentPage,
      totalPages,
      limit: itemsPerPage,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      category,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      dueDate,
      priority,
      status,
      category,
    } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await Task.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;
    task.category = category ?? task.category;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
      next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};