import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Pencil,
  Save,
  LogOut,
  Camera,
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

import { getTasks } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

const Profile = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, tasksResponse] =
          await Promise.all([
            getProfile(),
            getTasks({ limit: 100 }),
          ]);

        const user = profileResponse.data.user;

        setProfile(user);
        setTasks(tasksResponse.data.tasks || []);

        setFormData({
          name: user.name || "",
          email: user.email || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateProfile(formData);


      const updatedUser = response.data.user;

      setProfile((currentProfile) => ({
        ...currentProfile,
        ...updatedUser,
      }));

      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      showToast("Profile updated successfully.");
      setIsEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
      showToast(
        error.response?.data?.message ||
          "Failed to update profile.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationToggle = async (
  setting
) => {
  try {
    setError("");
    setSuccess("");

    const currentValue =
      profile?.notifications?.[setting];

    const newValue = !currentValue;

    const response = await updateProfile({
      notifications: {
        [setting]: newValue,
      },
    });

    setProfile((currentProfile) => ({
      ...currentProfile,
      notifications:
        response.data.user?.notifications ||
        currentProfile.notifications,
    }));

    setSuccess(
      `${setting === "email"
        ? "Email notifications"
        : "Task reminders"} ${
        newValue ? "enabled" : "disabled"
      }.`
    );
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to update notification settings."
    );
  }
};
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const productivity =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const streakDays = useMemo(() => {
    const completedDates = tasks
      .filter(
        (task) =>
          task.status === "Completed" &&
          task.updatedAt
      )
      .map((task) => {
        const date = new Date(task.updatedAt);

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      });

    return new Set(completedDates).size;
  }, [tasks]);

  const chartData = [
    {
      name: "Pending",
      value: pendingTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Completed",
      value: completedTasks,
    },
  ];

  const chartColors = [
    "#FFD23F",
    "#FF8A3D",
    "#FF2D8B",
  ];

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 4);

  const formatActivityTime = (task) => {
    const date = new Date(
      task.updatedAt || task.createdAt
    );

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p className="profile-message">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="profile-page">
        <p className="profile-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-top-card">
        <div className="profile-identity">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <User size={30} />
            </div>

            <button
              className="profile-photo-button"
              title="Change photo"
            >
              <Camera size={12} />
            </button>
          </div>

          <div className="profile-identity-info">
            <h1>{profile?.name}</h1>

            <p>
              <Mail size={14} />
              {profile?.email}
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            className="profile-edit-button"
            onClick={() => {
              setIsEditing(true);
              setSuccess("");
            }}
          >
            <Pencil size={15} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-header-actions">
            <button
              className="profile-save-button"
              onClick={handleSave}
              disabled={saving}
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              className="profile-cancel-button"
              onClick={() => {
                setFormData({
                  name: profile.name,
                  email: profile.email,
                });

                setIsEditing(false);
                setError("");
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="profile-error">{error}</p>
      )}

      {success && (
        <p className="profile-success">{success}</p>
      )}

      {isEditing && (
        <div className="profile-edit-panel">
          <div className="profile-field">
            <label>Name</label>

            <div className="profile-input-wrapper">
              <User size={16} />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile-field">
            <label>Email</label>

            <div className="profile-input-wrapper">
              <Mail size={16} />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="profile-productivity-cards">
        <div className="profile-productivity-card yellow">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="profile-productivity-card orange">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="profile-productivity-card pink">
          <span>Productivity</span>
          <strong>{productivity}%</strong>
        </div>

        <div className="profile-productivity-card baby">
          <span>Streak Days</span>
          <strong>{streakDays}</strong>
        </div>
      </div>

      <div className="profile-tabs">
        {[
          "Overview",
          "Account Info",
          "Preferences",
          "Notifications",
        ].map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab
                ? "profile-tab active"
                : "profile-tab"
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="profile-overview-grid">
          <div className="profile-section-card">
            <div className="profile-section-header">
              <div>
                <h2>Task Statistics</h2>
                <p>Your current task distribution</p>
              </div>
            </div>

            <div className="profile-chart-area">
              {totalTasks === 0 ? (
                <div className="profile-chart-empty">
                  <Circle size={34} />
                  <p>No task statistics yet.</p>
                </div>
              ) : (
                <>
                  <div className="profile-donut">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={58}
                          outerRadius={82}
                          paddingAngle={3}
                          stroke="none"
                        >
                          {chartData.map(
                            (entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={
                                  chartColors[index]
                                }
                              />
                            )
                          )}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="profile-donut-center">
                      <strong>{totalTasks}</strong>
                      <span>Total</span>
                    </div>
                  </div>

                  <div className="profile-chart-legend">
                    <div>
                      <span className="legend-dot yellow-dot" />
                      <span>Pending</span>
                      <strong>{pendingTasks}</strong>
                    </div>

                    <div>
                      <span className="legend-dot orange-dot" />
                      <span>In Progress</span>
                      <strong>{inProgressTasks}</strong>
                    </div>

                    <div>
                      <span className="legend-dot pink-dot" />
                      <span>Completed</span>
                      <strong>{completedTasks}</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-section-card">
            <div className="profile-section-header">
              <div>
                <h2>Recent Activity</h2>
                <p>Your latest task activity</p>
              </div>
            </div>

            <div className="profile-activity-list">
              {recentTasks.length === 0 ? (
                <div className="profile-activity-empty">
                  No recent activity.
                </div>
              ) : (
                recentTasks.map((task) => (
                  <div
                    className="profile-activity-item"
                    key={task._id}
                  >
                    <div className="activity-icon">
                      {task.status === "Completed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Clock3 size={16} />
                      )}
                    </div>

                    <div className="activity-info">
                      <strong>{task.title}</strong>

                      <span>
                        {task.status} ·{" "}
                        {formatActivityTime(task)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Account Info" && (
        <div className="profile-section-card profile-tab-content">
          <h2>Account Information</h2>

          <div className="profile-account-info">
            <div>
              <span>Name</span>
              <strong>{profile?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{profile?.email}</strong>
            </div>

            <div>
              <span>Account Created</span>
              <strong>
                {profile?.createdAt
                  ? new Date(
                      profile.createdAt
                    ).toLocaleDateString()
                  : "—"}
              </strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Preferences" && (
        <div className="profile-section-card profile-tab-content">
          <h2>Preferences</h2>
          <p>
            Theme and application preferences can be
            managed here.
          </p>

          <div className="profile-preference-item">
            <div className="profile-preference-info">
              <strong>Theme</strong>
              <span>
                Choose how Taskly should appear.
              </span>
            </div>
            <div className="theme-options">
              <button
                type="button"
                className={
                  theme === "system"
                  ? "theme-option active"
                  : "theme-option"
                }
                onClick={() => setTheme("system")}
              >
                System Default
              </button>
              <button
                type="button"
                className={
                  theme === "light"
                  ? "theme-option active"
                  : "theme-option"
                }
                onClick={() => setTheme("light")}
              >
                Light
              </button>
              <button
                type="button"
                className={
                  theme === "dark"
                  ? "theme-option active"
                  : "theme-option"
                }
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="profile-section-card profile-tab-content">
          <h2>Notifications</h2>
          <p>
            Manage how Taskly keeps you updated.
          </p>

          <div className="profile-preference-row">
  <div>
    <strong>Email Notifications</strong>

    <span>
      Receive account updates by email
    </span>
  </div>

  <button
    type="button"
    className={`notification-toggle ${
      profile?.notifications?.email
        ? "active"
        : ""
    }`}
    onClick={() =>
      handleNotificationToggle("email")
    }
    aria-label="Toggle email notifications"
    aria-pressed={
      profile?.notifications?.email
    }
  >
    <span className="notification-toggle-thumb" />
  </button>
</div>

<div className="profile-preference-row">
  <div>
    <strong>Task Reminders</strong>

    <span>
      Receive reminders for your tasks
    </span>
  </div>

  <button
    type="button"
    className={`notification-toggle ${
      profile?.notifications?.taskReminder
        ? "active"
        : ""
    }`}
    onClick={() =>
      handleNotificationToggle(
        "taskReminder"
      )
    }
    aria-label="Toggle task reminders"
    aria-pressed={
      profile?.notifications?.taskReminder
    }
  >
    <span className="notification-toggle-thumb" />
  </button>
</div>
        </div>
      )}

      <div className="profile-account-footer">
        <button
          className="profile-logout-button"
          onClick={logout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;