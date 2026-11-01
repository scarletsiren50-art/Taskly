import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <button
          className="modal-close"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={19} />
        </button>

        <div className="confirm-icon">
          <AlertTriangle size={26} />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-actions">
          <button
            className="confirm-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="confirm-delete"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;