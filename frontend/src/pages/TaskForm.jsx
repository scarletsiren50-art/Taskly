import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import LoadingState from "../components/common/LoadingState";

import {
  createTask,
  getTask,
  updateTask,
} from "../services/taskService";

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    category: "Other",
  });
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTask(id);
        const task = response.data.task;

        setFormData({
          title: task.title || "",
          description: task.description || "",
          dueDate: task.dueDate
            ? task.dueDate.split("T")[0]
            : "",
          priority: task.priority || "Medium",
          status: task.status || "Pending",
          category: task.category || "Other",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load task."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (isEditMode) {
  await updateTask(id, formData);

  showToast("Task updated successfully.");
} else {
  await createTask(formData);

  showToast("Task created successfully.");
}

navigate("/my-tasks");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save task."
      );
      showToast(
        error.response?.data?.message || 
          "Failed to save task.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="task-form-page">
        <div className="task-form-card">
          <LoadingState message="Loading your tasks..." />
        </div>
      </div>
    );
  }

  return (
    <div className="task-form-page">
      <div className="task-form-header">
        <button
          className="task-form-back"
          onClick={() => navigate("/my-tasks")}
        >
          <ArrowLeft size={18} />
          Back to My Tasks
        </button>

        <h1>
          {isEditMode ? "Edit Task" : "Add New Task"}
        </h1>

        <p>
          {isEditMode
            ? "Update your task details."
            : "Create and organize a new task."}
        </p>
      </div>

      <form
        className="task-form-card"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="task-form-error">
            {error}
          </div>
        )}

        <div className="form-field full-width">
          <label htmlFor="title">
            Task Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter task title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-field full-width">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Describe your task..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="task-form-grid">
          <div className="form-field">
            <label htmlFor="dueDate">
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Academic">Academic</option>
              <option value="Design">Design</option>
              <option value="Development">
                Development
              </option>
              <option value="Documentation">
                Documentation
              </option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="task-form-actions">
          <button
            type="button"
            className="task-form-cancel"
            onClick={() => navigate("/my-tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="task-form-save"
            disabled={saving}
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : isEditMode
              ? "Update Task"
              : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;