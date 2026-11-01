import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3 } from "lucide-react";
import EmptyState from "../common/EmptyState";

const TodayTasks = ({ tasks, ontoggleComplete }) => {
  const navigate = useNavigate();
  const today = new Date();

  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate);

    return (
      dueDate.getFullYear() === today.getFullYear() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getDate() === today.getDate()
    );
  });

  return (
    <div className="dashboard-card today-tasks">
      <div className="dashboard-card-header">
        <div>
          <h2>Today's Tasks</h2>
          <p>Tasks due today</p>
        </div>
        <Link
          to="/my-tasks"
          className="view-all-tasks"
        >
          View All →
        </Link>
      </div>

      {todayTasks.length === 0 ? (
        <EmptyState
          title="No tasks due today"
          message="You're all caught up! Enjoy your day."
        />
      ) : (
        <div className="today-task-list">
          {todayTasks.map((task) => (
            <div
              className="today-task-item"
              key={task._id}
              onClick={() => navigate(`/tasks/${task._id}/edit`)}
            >
              <div className="today-task-check">
                <input
                    type="checkbox"
                    checked={task.status === "Completed"}
                    onChange={() => ontoggleComplete(task)}
                    aria-label={`Mark ${task.title} as completed`}
                />
              </div>
              <div className="today-task-icon">
                <Clock3 size={18} />
              </div>

              <div className="today-task-info">
                <strong>{task.title}</strong>

                <span>{task.category}</span>
              </div>

              <span
                className={`today-status status-${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;