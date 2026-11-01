import { AlertCircle } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        <AlertCircle size={26} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="error-state-button"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;