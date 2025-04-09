import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { MdWbSunny } from "react-icons/md";
import { WiMoonAltWaningCrescent5 } from "react-icons/wi";

export const NavBar = () => {
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <>
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        <div
          className={
            theme == "light"
              ? "flex items-center justify-center px-3 py-5 bg-white shadow-lg shadow-gray-500"
              : "flex items-center justify-center px-3 py-5 bg-black shadow-lg shadow-gray-500 text-white"
          }
        >
          <Link to={"/"}>
            <h1 className="text-center font-bold  text-2xl text-blue-400">
              Social Media
            </h1>
          </Link>
        </div>
      ) : (
        <div
          className={
            theme === "light"
              ? "flex items-center justify-between px-3 py-5 bg-white shadow-lg shadow-gray-500"
              : "flex items-center justify-between px-3 py-5 bg-black shadow-lg shadow-gray-500 text-white"
          }
        >
          <div>
            <Link to={"/"}>
              <h1 className="text-center font-bold  text-2xl text-blue-400">
                Social Media
              </h1>
            </Link>
          </div>
          <div className="flex items-center justify-center font-medium">
            <button
              className="py-2 px-3 hover:bg-blue-500 hover:text-white rounded cursor-pointer"
              onClick={handleThemeToggle}
            >
              {theme == "light" ? <WiMoonAltWaningCrescent5 size={20}/> : <MdWbSunny size={20}/>}
            </button>
            <Link
              to={"/login"}
              className="py-2 px-3 hover:bg-blue-500 hover:text-white rounded cursor-pointer"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="py-2 px-3 hover:bg-blue-500 hover:text-white rounded cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
