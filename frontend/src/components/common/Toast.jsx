import {
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

import { useToast } from "../../context/ToastContext";

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) {
    return null;
  }

  const isError = toast.type === "error";

  return (
    <div
      className={`toast ${
        isError
          ? "toast-error"
          : "toast-success"
      }`}
    >
      <div className="toast-icon">
        {isError ? (
          <AlertCircle size={19} />
        ) : (
          <CheckCircle2 size={19} />
        )}
      </div>

      <span className="toast-message">
        {toast.message}
      </span>

      <button
        type="button"
        className="toast-close"
        onClick={hideToast}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;