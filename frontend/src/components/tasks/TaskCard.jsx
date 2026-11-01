import {
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div
      className={`task-card ${
        task.status === "Completed"
          ? "task-card-completed"
          : ""
      }`}
    >
      <div className="task-card-check">
        <input
          type="checkbox"
          checked={task.status === "Completed"}
          onChange={() => onToggleComplete(task)}
          onClick={(event) => event.stopPropagation()}
          aria-label={`Mark ${task.title} as completed`}
        />
      </div>

      <div className="task-card-main">
        <div className="task-card-title-row">
          <h3>{task.title}</h3>

          <span
            className={`priority-badge priority-${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-card-meta">
          <span
            className={`task-status status-${task.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {task.status}
          </span>

          <span className="task-category">
            {task.category}
          </span>

          {task.dueDate && (
            <span className="task-due-date">
              <CalendarDays size={15} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="task-card-actions">
        <button
          className="task-edit-button"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Pencil size={17} />
        </button>

        <button
          className="task-delete-button"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;