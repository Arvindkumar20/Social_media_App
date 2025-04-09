import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { NavBar } from "./components/NavBar";
import { ThemeContext } from "./context/ThemeContext";
import { useEffect, useState } from "react";

export const App = () => {
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   let currentTheme = theme == "light" ? "dark" : "light";
  //   localStorage.setItem("theme", currentTheme);
  // }, [setTheme, theme]);
  
  return (
    <>
      <Router>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ThemeContext.Provider>
      </Router>
    </>
  );
};
