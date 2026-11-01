import { ClipboardList } from "lucide-react";

const EmptyState = ({
  title = "No tasks found",
  message = "You don't have any tasks here yet.",
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <ClipboardList size={26} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>
    </div>
  );
};

export default EmptyState;