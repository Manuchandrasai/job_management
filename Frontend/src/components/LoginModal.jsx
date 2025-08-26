import React, { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../utils/api";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Try API login first
      const user = await login(formData);
      authLogin(user);
      onClose();
    } catch (error) {
      console.error("API login failed, trying demo login:", error);
      
      // Fallback to demo login if API fails
      const demoUser = {
        id: Date.now(),
        name: formData.email.split('@')[0] || "Demo User",
        email: formData.email
      };
      
      authLogin(demoUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Quick demo login function
  const handleDemoLogin = () => {
    const demoUser = {
      id: Date.now(),
      name: "John Doe",
      email: "john.doe@example.com"
    };
    
    authLogin(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Login to Your Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Demo Login (No Password Required)
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button type="button" onClick={onSwitchToSignup} className="text-purple-600 hover:text-purple-700 font-medium">
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
