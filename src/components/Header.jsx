import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Header({ page }) {
  const [openSetting, setOpenSetting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

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

  async function logout() {
    await signOut(auth);
  }

  return (
    <header>
      <h1>CodeChamp</h1>
      <div className="navbar-menu">
        {page === "leaderboard" && (
          <button onClick={() => navigate("/home")}>Kembali ke beranda</button>
        )}
        <img
          src={`img/setting-icon${darkMode ? "-light" : ""}.png`}
          alt="setting"
          onClick={() => setOpenSetting((open) => !open)}
          className="icon"
        />
      </div>
      {openSetting && (
        <div className="setting">
          <button onClick={logout}>Logout</button>
          <button onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}
