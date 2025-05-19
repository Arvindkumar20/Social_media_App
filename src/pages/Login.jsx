import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );
console.log(res)
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/"); // Redirect to home page
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center mx-auto my-20">
      <form
        onSubmit={handleSubmit}
        className={
          theme === "light"
            ? "flex flex-col items-center justify-center gap-5 py-10 px-5 bg-gray-50 shadow-2xl shadow-gray-500 rounded w-1/3"
            : "flex flex-col items-center justify-center gap-5 py-10 px-5 bg-gray-700 text-white shadow-2xl shadow-gray-500 rounded w-1/3"
        }
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="Enter your Email..."
            name="email"
            className="py-2 px-3 outline-none border-2 rounded w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Enter your password..."
            name="password"
            className="py-2 px-3 outline-none border-2 rounded w-full"
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <div className="flex items-center justify-center mx-auto w-full">
          <button
            className="py-2 px-3 bg-blue-500 font-semibold text-white rounded cursor-pointer w-1/2"
            type="submit"
          >
            Submit
          </button>
        </div>

        <Link to="/signup" className="text-blue-600 font-semibold">
          I don't have an account? SignUp here
        </Link>
      </form>
    </div>
  );
};
