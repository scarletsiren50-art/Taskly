import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TaskOverview = ({
  pending,
  inProgress,
  completed,
}) => {
  const data = [
    {
      name: "Pending",
      tasks: pending,
    },
    {
      name: "In Progress",
      tasks: inProgress,
    },
    {
      name: "Completed",
      tasks: completed,
    },
  ];

  return (
    <div className="dashboard-card task-overview">
      <div className="dashboard-card-header">
        <div>
          <h2>Task Overview</h2>
          <p>Current task status</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              radius={[8, 8, 0, 0]}
            >
              <Cell fill="#ffd23f" />
              <Cell fill="#ff8a3d" />
              <Cell fill="#ff2d8b" /> 
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskOverview;