import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Save,
  Trash2,
  AlertTriangle,
  LogOut,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../services/userService";

import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/common/ConfirmModal";

const Settings = () => {
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Account");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();

        setProfile({
          name: response.data.user?.name || "",
          email: response.data.user?.email || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load account information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateProfile({
        name: profile.name,
        email: profile.email,
      });

      setProfile({
        name: response.data.user?.name || profile.name,
        email: response.data.user?.email || profile.email,
      });

      setSuccess("Account information updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update account information."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setError("");

      await deleteProfile();

      setShowDeleteModal(false);

      logout();
    } catch (error) {
      setShowDeleteModal(false);

      setError(
        error.response?.data?.message ||
          "Failed to delete your account."
      );
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-message">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your account and Taskly preferences.
          </p>
        </div>
      </div>

      {error && (
        <div className="settings-alert settings-error">
          {error}
        </div>
      )}

      {success && (
        <div className="settings-alert settings-success">
          {success}
        </div>
      )}

      <div className="settings-card">
        <div className="settings-tabs">
          <button
            type="button"
            className={
              activeTab === "Account"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() => setActiveTab("Account")}
          >
            Account
          </button>

          <button
            type="button"
            className={
              activeTab === "Danger Zone"
                ? "settings-tab active"
                : "settings-tab"
            }
            onClick={() =>
              setActiveTab("Danger Zone")
            }
          >
            Danger Zone
          </button>
        </div>

        {activeTab === "Account" && (
          <div className="settings-section">
            <div className="settings-section-header">
              <div>
                <h2>Account Information</h2>
                <p>
                  Update the basic information associated
                  with your Taskly account.
                </p>
              </div>
            </div>

            <form
              className="settings-form"
              onSubmit={handleSave}
            >
              <div className="settings-field">
                <label htmlFor="settings-name">
                  Name
                </label>

                <div className="settings-input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="settings-name"
                    name="name"
                    type="text"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="settings-field">
                <label htmlFor="settings-email">
                  Email
                </label>

                <div className="settings-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="settings-email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="settings-save-button"
                disabled={saving}
              >
                <Save size={17} />

                {saving
                  ? "Saving..."
                  : "Update Account"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "Danger Zone" && (
          <div className="settings-section">
            <div className="settings-danger">
              <div className="settings-danger-icon">
                <AlertTriangle size={22} />
              </div>

              <div className="settings-danger-content">
                <h2>Danger Zone</h2>

                <p>
                  Deleting your account is permanent. All
                  of your tasks and account information will
                  be removed and cannot be recovered.
                </p>

                <button
                  type="button"
                  className="settings-delete-button"
                  onClick={() =>
                    setShowDeleteModal(true)
                  }
                >
                  <Trash2 size={17} />
                  Delete Account
                </button>
              </div>
            </div>

            <div className="settings-logout-section">
              <div>
                <h3>Sign out</h3>
                <p>
                  Sign out of your current Taskly session.
                </p>
              </div>

              <button
                type="button"
                className="settings-logout-button"
                onClick={logout}
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete your account?"
        message="This action cannot be undone. Your account and all associated tasks will be permanently deleted."
        confirmText="Delete Account"
        cancelText="Cancel"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Settings;