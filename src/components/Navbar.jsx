import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Navbar.css";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const isHome = location.pathname === "/";
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (

    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
    <div className="navbar-brand">
      <Link to="/">
          📝 Noto
        </Link>
        <button 
          onClick={toggleTheme}
          className="theme-btn"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="navbar-links">
        {isHome ? (
          <>
            <a href="#features">
              Features
            </a>
            <a href="#about">
              About
            </a>
          </>
        ) : (

          <Link to="/">
            Home
          </Link>
        )}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              Signup
            </Link>
          </>
       ) : (
          <>
            <Link to="/dashboard">
             My Notes
            </Link>
            <span className="navbar-greeting">
              Hi, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="navbar-logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


export default Navbar;