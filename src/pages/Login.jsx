import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { theme } = useContext(ThemeContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submmited");
    console.log(loginData);
  };

  const handleChange = (e) => {
    setLoginData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  
  return (
    <>
      <div className="flex items-cente justify-center mx-auto my-20">
        <form
          onSubmit={handleSubmit}
          className={
            theme == "light"
              ? "flex flex-col items-center justify-center gap-5  py-10 px-5 bg-gray-50 shadow-2xl  shadow-gray-500  rounded w-1/3"
              : "flex flex-col items-center justify-center gap-5  py-10 px-5 bg-gray-700 text-white shadow-2xl shadow-gray-500  rounded w-1/3"
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
          <div className="flex  items-cente justify-center mx-auto w-full">
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
    </>
  );
};
