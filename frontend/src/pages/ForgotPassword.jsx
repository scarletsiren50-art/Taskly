
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await forgotPassword({
        email,
      });

      if (response.data.success) {
        setMessage(
          "If an account exists with this email, a password reset link will be sent."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="forgot-password-card">
        {/* Icon */}
        <div className="forgot-password-icon">
          <LockKeyhole size={24} />
        </div>

        {/* Heading */}
        <div className="forgot-password-heading">
          <h1>Forgot Password?</h1>

          <p>
            No worries! Enter your email address and
            we'll send you a link to reset your password.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="forgot-password-success">
            {message}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="auth-form-group">
            <label htmlFor="forgot-email">
              Email address
            </label>

            <div className="auth-input-wrapper">
              <Mail size={17} />

              <input
                id="forgot-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Back */}
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

export default ForgotPassword;
