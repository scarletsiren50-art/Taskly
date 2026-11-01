import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  getProfile,
} from "../../services/userService";
import {
  getTasks,
} from "../../services/taskService";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskReminderEnabled, setTaskReminderEnabled] =
    useState(true);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notificationPermission, setNotificationPermission] =
    useState(
      typeof Notification !== "undefined"
        ? Notification.permission
        : "default"
    );

  const today = new Date();

  const isToday = (date) => {
    if (!date) {
      return false;
    }

    const taskDate = new Date(date);

    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  };

  const todayTasks = tasks.filter(
    (task) =>
      isToday(task.dueDate) &&
      task.status !== "Completed"
  );

  useEffect(() => {
    const loadNotificationData = async () => {
      try {
        const [profileResponse, tasksResponse] =
          await Promise.all([
            getProfile(),
            getTasks({
              limit: 100,
            }),
          ]);

        setTaskReminderEnabled(
          profileResponse.data.user?.notifications
            ?.taskReminder ?? true
        );

        setTasks(
          tasksResponse.data.tasks || []
        );
      } catch (error) {
        console.error(
          "Failed to load notification data:",
          error
        );
      }
    };

    loadNotificationData();
  }, []);

  useEffect(() => {
    if (!taskReminderEnabled) {
      return;
    }

    const checkTaskReminders = () => {
      if (
        typeof Notification === "undefined" ||
        Notification.permission !== "granted"
      ) {
        return;
      }

      const currentDate = new Date();

      tasks.forEach((task) => {
        if (
          !task.dueDate ||
          task.status === "Completed"
        ) {
          return;
        }

        const dueDate = new Date(task.dueDate);

        const dueToday =
          dueDate.getFullYear() ===
            currentDate.getFullYear() &&
          dueDate.getMonth() ===
            currentDate.getMonth() &&
          dueDate.getDate() ===
            currentDate.getDate();

        if (!dueToday) {
          return;
        }

        const notificationKey =
          `taskly-notified-${currentDate
            .toISOString()
            .slice(0, 10)}-${task._id}`;

        if (
          localStorage.getItem(notificationKey)
        ) {
          return;
        }

        new Notification("Taskly Reminder 🔔", {
          body: `${task.title} is due today.`,
          icon: "/vite.svg",
        });

        localStorage.setItem(
          notificationKey,
          "true"
        );
      });
    };

    checkTaskReminders();

    const interval = setInterval(
      checkTaskReminders,
      60 * 1000
    );

    return () => clearInterval(interval);
  }, [tasks, taskReminderEnabled]);

  const handleNotificationClick = async () => {
    setShowNotifications(
      (currentValue) => !currentValue
    );

    if (
      typeof Notification === "undefined"
    ) {
      return;
    }

    if (Notification.permission === "default") {
      const permission =
        await Notification.requestPermission();

      setNotificationPermission(permission);
    }
  };

  return (
    <header className="top-navbar">
      <form
  className="navbar-search"
  onSubmit={(event) => {
    event.preventDefault();

    if (!search.trim()) {
      navigate("/my-tasks");
      return;
    }

    navigate(
      `/my-tasks?search=${encodeURIComponent(
        search.trim()
      )}`
    );
  }}
>
  <Search size={19} />

  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(event) =>
      setSearch(event.target.value)
    }
  />
</form>

      <div className="navbar-right">
        <div className="navbar-notification-wrapper">
          <button
            type="button"
            className="notification-button"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />

            {todayTasks.length > 0 && (
              <span className="notification-count">
                {todayTasks.length > 9
                  ? "9+"
                  : todayTasks.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                <div>
                  <h3>Notifications</h3>

                  <span>
                    {todayTasks.length} task
                    {todayTasks.length !== 1
                      ? "s"
                      : ""}{" "}
                    due today
                  </span>
                </div>
              </div>

              {todayTasks.length === 0 ? (
                <div className="notification-empty">
                  <CheckCircle2 size={30} />

                  <strong>
                    You're all caught up!
                  </strong>

                  <span>
                    No pending tasks are due today.
                  </span>
                </div>
              ) : (
                <div className="notification-list">
                  {todayTasks.map((task) => (
                    <div
                      className="notification-item"
                      key={task._id}
                    >
                      <div className="notification-item-icon">
                        <Clock3 size={17} />
                      </div>

                      <div className="notification-item-info">
                        <strong>
                          {task.title}
                        </strong>

                        <span>
                          {task.category} ·{" "}
                          {task.priority} priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="notification-dropdown-footer">
                {taskReminderEnabled ? (
                  <span className="notification-enabled">
                    Task reminders are ON
                  </span>
                ) : (
                  <span className="notification-disabled">
                    Task reminders are OFF
                  </span>
                )}

                {notificationPermission ===
                  "denied" && (
                  <span className="notification-permission-warning">
                    Browser notifications are blocked
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="navbar-profile">
          <div className="navbar-avatar">
            {user?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="navbar-user">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;