import { useState } from "react";
import { Eye } from "lucide-react";

const PasswordSetup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account with password:", password);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="w-full px-6 py-8">
        {/* Gradient bar at top */}
        <div className="h-1 w-full mb-8 bg-gradient-to-r from-gray-800 to-yellow-400"></div>

        <h1 className="text-2xl font-bold mb-1">Setup your password</h1>
        <p className="text-gray-500 mb-6">Create a password to secure your account</p>

        <div className="w-full">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400"
                onClick={toggleConfirmPasswordVisibility}
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">Must be at least 8 characters</p>

          <button
            onClick={handleCreateAccount}
            className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-black font-medium">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;