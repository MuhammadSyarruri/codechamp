import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import UserProfile from "../components/UserProfile";
import Navigation from "../components/Navigation";

export default function Homepage() {
  const [openSetting, setOpenSetting] = useState(false);
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

  async function logout() {
    await signOut(auth);
  }

  return (
    <div className="homepage">
      <header>
        <h1>CodeChamp</h1>
        <img
          src={`/img/setting-icon${darkMode ? "-light" : ""}.png`}
          alt="setting"
          onClick={() => setOpenSetting((open) => !open)}
          className="icon"
        />
        {openSetting && (
          <div className="setting">
            <button onClick={logout}>Logout</button>
            <button onClick={toggleTheme}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </header>

      <UserProfile />
      <Navigation />
    </div>
  );
}
