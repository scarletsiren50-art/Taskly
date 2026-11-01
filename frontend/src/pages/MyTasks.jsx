import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import TaskCard from "../components/tasks/TaskCard";
import ConfirmModal from "../components/common/ConfirmModal";
import { useToast } from "../context/ToastContext";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";

const MyTasks = () => {
  const [ searchParams ] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [limit] = useState(5);
  const navigate = useNavigate();
  const { showToast } = useToast();

  
  
  useEffect(() => {
  const urlSearch = searchParams.get("search") || "";

  setSearch(urlSearch);
}, [searchParams]);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks({
        search,
        status: statusFilter,
        category: categoryFilter,
        sortBy,
        page,
        limit,
      });

      setTasks(response.data.tasks || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalTasks(response.data.totalTasks || 0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [
  search,
  statusFilter,
  categoryFilter,
  sortBy,
  page,
  limit,
]);

useEffect(() => {
  setPage(1);
}, [
  search,
  statusFilter,
  categoryFilter,
  sortBy,
]);
  

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = (taskId) => {
  setDeleteTaskId(taskId);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  if (!deleteTaskId) {
    return;
  }

  try {
    await deleteTask(deleteTaskId);

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task._id !== deleteTaskId
      )
    );
    showToast("Task deleted successfully.");

    setShowDeleteModal(false);
    setDeleteTaskId(null);
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to delete task.",
      "error"
    );
  }
};

const cancelDelete = () => {
  setShowDeleteModal(false);
  setDeleteTaskId(null);
};

const handleEdit = (task) => {
  navigate(`/tasks/${task._id}/edit`);
};

const handleToggleComplete = async (task) => {
  const newStatus =
    task.status === "Completed"
      ? "Pending"
      : "Completed";

  try {
    setError("");

    const response = await updateTask(task._id, {
      status: newStatus,
    });

    if (response.data?.success) {
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === task._id
            ? {
                ...currentTask,
                ...response.data.task,
              }
            : currentTask
        )
      );
      showToast(
        newStatus === "Completed"
        ? "Task completed!"
        : "Task marked as pending."
      );
    }
  } catch (error) {
    console.error("Toggle task error:", error);

    setError(
      error.response?.data?.message ||
        "Failed to update task status."
    );
  }
};

  return (
  <div className="my-tasks-page">
    <div className="my-tasks-header">
      <div>
        <h1>My Tasks</h1>

        <p>
          Manage and organize all your tasks.
        </p>
      </div>

      <button
        className="my-tasks-add-button"
        onClick={() => navigate("/tasks/new")}
      >
        <Plus size={18} />
        Add Task
      </button>
    </div>

    <div className="task-controls">
    <div className="task-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        {search && (
          <button
            type="button"
            className="task-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            X
          </button>
        )}
      </div>
      <select
        value={categoryFilter}
        onChange={(event) =>
          setCategoryFilter(event.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

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

      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value)
        }
      >
        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="dueDate">
          Due Date
        </option>

        <option value="priority">
          Priority
        </option>
      </select>
    </div>

    <div className="status-tabs">
      {[
        "All",
        "Pending",
        "In Progress",
        "Completed",
      ].map((status) => (
        <button
          key={status}
          className={
            statusFilter === status
              ? "status-tab active"
              : "status-tab"
          }
          onClick={() =>
            setStatusFilter(status)
          }
        >
          {status}
        </button>
      ))}
    </div>

    <div className="task-list-header">
      <div>
        <h2>Tasks</h2>

        <span>
          Showing {tasks.length} of {totalTasks}
        </span>
      </div>

      <SlidersHorizontal size={19} />
    </div>

    {tasks.length === 0 ? (
      <div className="tasks-empty">
        <div className="tasks-empty-icon">
          <Search size={26} />
        </div>

        <h3>No tasks found</h3>

        <p>
          Try changing your filters or create a
          new task.
        </p>
      </div>
    ) : (
      <>
      <div className="task-list">
        {tasks.length === 0 ? (
          <EmptyState
            title={
              search ||
              statusFilter !== "All" ||
              categoryFilter !== "All"
                ? "No matching tasks"
                : "No tasks yet"
        }
        message={
          search ||
          statusFilter !== "All" ||
          categoryFilter !== "All" 
            ? "Try changing your search or filters."
            : "Create your first task to get started."
        }
      />
        ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        )))}
      </div>
      {totalPages > 1 && (
  <div className="pagination">
    <button
      className="pagination-button"
      disabled={page === 1}
      onClick={() =>
        setPage((currentPage) => currentPage - 1)
      }
    >
      Previous
    </button>

    <div className="pagination-pages">
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            page === pageNumber
              ? "pagination-number active"
              : "pagination-number"
          }
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>

    <button
      className="pagination-button"
      disabled={page === totalPages}
      onClick={() =>
        setPage((currentPage) => currentPage + 1)
      }
    >
      Next
    </button>
    
  </div>
)}
</>
    )}
    <ConfirmModal
    isOpen={showDeleteModal}
    title="Delete Task?"
    message="This task will be permanently deleted. This action cannot be undone."
    confirmText="Delete Task"
    cancelText="Cancel"
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
  />
  </div>
);
};

export default MyTasks;