import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetToken = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!resetToken) {
      setError("Invalid or missing password reset link.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({
        resetToken,
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        setMessage(
          "Your password has been reset successfully."
        );

        setFormData({
          newPassword: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="forgot-password-card">
        <div className="forgot-password-icon">
          {message ? (
            <CheckCircle2 size={24} />
          ) : (
            <LockKeyhole size={24} />
          )}
        </div>

        <div className="forgot-password-heading">
          <h1>
            {message
              ? "Password Reset!"
              : "Reset Password"}
          </h1>

          <p>
            {message
              ? "Your password has been updated successfully. Redirecting you to login..."
              : "Create a new password for your Taskly account."}
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {message ? (
          <div className="forgot-password-success">
            {message}
          </div>
        ) : (
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-form-group">
              <label htmlFor="newPassword">
                New password
              </label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={17} />

                <input
                  id="newPassword"
                  name="newPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={17} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>
          </form>
        )}

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <Link
          to="/login"
          className="back-to-login"
        >
          <ArrowLeft size={15} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;