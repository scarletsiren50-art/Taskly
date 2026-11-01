import { useEffect, useState } from "react";
import { getTasks, updateTask  } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/dashboard/StatCard";
import TaskOverview from "../components/dashboard/TaskOverview";
import TodayTasks from "../components/dashboard/TodayTasks";
import ErrorState from "../components/common/ErrorState";

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTasks({
          limit: 100,
        });

        setTasks(response.data.tasks || []);
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
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const handleToggleComplete = async (task) => {
  try {
    const newStatus =
      task.status === "Completed"
        ? "Pending"
        : "Completed";

    const response = await updateTask(task._id, {
      status: newStatus,
    });

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
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to update task status."
    );
  }
};
  return (
  <div className="dashboard-page">
    <div className="dashboard-header">
      <h1>Welcome back, {user?.name}!</h1>

      <p>
        Here's an overview of your tasks.
      </p>
    </div>

    {loading && (
      <p className="dashboard-message">
        Loading tasks...
      </p>
    )}

    {error && (
      <ErrorState
        title="Unable to load dashboard"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )}

    {!loading && !error && (
      <>
        <div className="dashboard-stats">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            type="total"
          />

          <StatCard
            title="Pending"
            value={pendingTasks}
            type="pending"
          />

          <StatCard
            title="In Progress"
            value={inProgressTasks}
            type="progress"
          />

          <StatCard
            title="Completed"
            value={completedTasks}
            type="completed"
          />
        </div>

        <div className="dashboard-grid">
          <TaskOverview
            pending={pendingTasks}
            inProgress={inProgressTasks}
            completed={completedTasks}
          />

          <TodayTasks 
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
           />
        </div>
      </>
    )}
  </div>
);
};

export default Dashboard;