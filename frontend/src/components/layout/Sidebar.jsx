
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import BrandLogo from "../BrandLogo";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Tasks",
      path: "/my-tasks",
      icon: CheckSquare,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <BrandLogo className="sidebar-brand-logo" />
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/tasks/new"
          className="sidebar-add-task"
        >
          <Plus size={19} />
          <span>Add Task</span>
        </NavLink>

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
