import {
  ListTodo,
  Clock3,
  Timer,
  CircleCheck,
} from "lucide-react";

const iconMap = {
  total: ListTodo,
  pending: Clock3,
  progress: Timer,
  completed: CircleCheck,
};

const StatCard = ({
  title,
  value,
  type,
}) => {
  const Icon = iconMap[type];

  return (
    <div className={`stat-card stat-${type}`}>
      <div className="stat-card-content">
        <div>
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;