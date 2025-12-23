import { User, Settings, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function ProfileDropdown() {
  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role") || "employee";

  const profilePath =
    role === "company"
      ? "/company/companyProfile"
      : "/employee/employeeProfile";

  const subscriptionPath =
    role === "company"
      ? "/company/subscription"
      : "/employee/subscription";
  return (
    <Dropdown
      trigger={
        <button className="h-9 w-9 rounded-full flex items-center justify-center bg-white/10 dark:bg-black/30 border border-white/10 backdrop-blur-md hover:ring-2 hover:ring-violet-400/40 transition">
          <User className="h-4 w-4 text-black dark:text-white" />
        </button>
      }
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold text-black dark:text-white">
          My Account
        </p>
        <p className="text-xs opacity-60">user@email.com</p>
      </div>

      {/* Items */}
      <div className="py-1">
         <Item to={profilePath} label="Profile" icon={User} />
        <Item to={subscriptionPath} label="Subscription" icon={CreditCard} />
        <Item to="/settings" label="Settings" icon={Settings} />

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </Dropdown>
  );
}

function Item({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
