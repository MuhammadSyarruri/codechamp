import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  function toggleTheme() {
    const isDark = !darkMode;
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  }

  return <RouterProvider router={router} context={{ darkMode, toggleTheme }} />;
}
