import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {setUser}=useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      const url=import.meta.env.VITE_API_URL;
      const response = await axios.post(`${url}/api/users/login`, formData);
      setUser({...response.data.userObj, token: response.data.token});
      
      console.log("Server Response:", response.data);

      // Simulate login success:
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div
      className="
      margin-0
      flex
      flex-col 
      items-center 

        min-h-screen 
        flex 
        items-center 
        justify-center 
      "
    >
      {!isLoggedIn ? (
        <div
          className="
            bg-white 
            rounded-xl 
            shadow-2xl 
            p-8 
            max-w-md 
            w-full 
            transform 
            transition-all 
            duration-300
            hover:scale-105
          "
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email or Username
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-purple-500
                  transition
                "
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-gray-700 font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-purple-500
                  transition
                "
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="
                  absolute 
                  right-3 
                  top-9 
                  text-gray-500 
                  hover:text-purple-500
                  focus:outline-none
                "
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3c-3.866 0-7 3.582-7 7s3.134 7 7 7 7-3.582 7-7-3.134-7-7-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 3.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-1.86-1.86A8.962 8.962 0 0110 19c-4.97 0-9-4.03-9-9 0-1.97.635-3.786 1.707-5.293L3.293 3.293zm2.829 2.829C5.038 7.317 5 8.147 5 9c0 3.866 3.134 7 7 7 .853 0 1.683-.038 2.462-.122l-8.34-8.34z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="
                    rounded 
                    text-purple-600 
                    focus:ring-purple-500 
                    transition 
                    duration-300
                  "
                />
                <span>Remember Me</span>
              </label>
              <Link
                to="/forgot-password"
                className="
                  text-purple-600 
                  hover:text-purple-800 
                  text-sm 
                  transition
                "
              >
                Forgot Password?
              </Link>
              
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full 
                py-3 
                rounded-lg 
                bg-gradient-to-r 
                from-purple-600 
                to-purple-800 
                text-white 
                font-semibold 
                hover:from-purple-700 
                hover:to-purple-900 
                shadow-md 
                transition
                duration-300
                transform 
                hover:scale-105
              "
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div
          className="
            bg-white 
            rounded-xl 
            shadow-2xl 
            p-8 
            max-w-md 
            w-full 
            text-center 
            transform 
            transition-all 
            duration-500
            hover:scale-105
          "
        >
          <div className="flex justify-center mb-4">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4 -4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Login Successful!
          </h2>
          <p className="text-gray-600">
            Welcome back! You are now logged in.
          </p>
          <Link
            to="/"
            className="
              inline-block
              mt-6
              bg-gradient-to-r
              from-green-500
              to-green-700
              text-white
              font-semibold
              py-3
              px-6
              rounded-lg
              hover:from-green-600
              hover:to-green-800
              transition
              duration-300
              shadow-lg
            "
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
