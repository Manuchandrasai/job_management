import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Download } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ onCreateJob, onLogin, refreshJobs }) => {
  const { isLoggedIn, currentUser, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const handleExportJobs = () => {
    const jobs = JSON.parse(localStorage.getItem("jobPortalJobs") || "[]");
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `jobs_${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleLogout = () => {
    logout();
    if (refreshJobs) refreshJobs();
  };

  return (
    <header className="w-full flex justify-center py-4">
      <div className="w-[90%] max-w-7xl bg-white shadow-md border rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Left Section: Logo + Nav */}
        <div className="flex items-center space-x-10">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/icons/logo.png"
              alt="CyberMinds Works Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="w-8 h-8 bg-purple-600 rounded-lg hidden"></div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link to="/find-jobs" className="text-gray-600 hover:text-purple-600 font-medium">
              Find Jobs
            </Link>
            <Link to="/find-talents" className="text-gray-600 hover:text-purple-600 font-medium">
              Find Talents
            </Link>
            <Link to="/about-us" className="text-gray-600 hover:text-purple-600 font-medium">
              About us
            </Link>
            <Link to="/testimonials" className="text-gray-600 hover:text-purple-600 font-medium">
              Testimonials
            </Link>
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Export Button */}
              <button
                onClick={handleExportJobs}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium"
                title="Export Jobs to JSON"
              >
                <Download size={20} />
                <span className="hidden md:inline">Export</span>
              </button>

              {/* Create Job Button - ONLY VISIBLE WHEN LOGGED IN */}
              <button
                onClick={onCreateJob}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full font-medium shadow hover:opacity-90 transition"
              >
                Create Jobs
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {getInitials(currentUser?.name)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Button - ONLY VISIBLE WHEN NOT LOGGED IN */}
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium"
              >
                <User size={20} />
                <span>Login</span>
              </button>
              {/* NO CREATE JOBS BUTTON HERE */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
