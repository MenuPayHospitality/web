import { useState } from "react";
import { Eye } from "lucide-react";
import Image from "next/image";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with:", email, password);
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic
    console.log("Signing in with Google");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-yellow-200 min-h-screen">
      <div className="w-full px-6 py-8">
        <h1 className="text-2xl font-bold mb-1 text-center mt-8">Welcome Back</h1>
        <p className="text-gray-600 mb-8 text-center">Login in to continue</p>

        <div className="w-full mb-6">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">Must be at least 8 characters</p>

        <button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors mb-4"
        >
          Login
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <Image 
            src="/api/placeholder/20/20" 
            alt="Google logo" 
            width={300}
                height={300}
            className="w-5 h-5 mr-2" 
          />
          Sign In with Google
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-black font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;