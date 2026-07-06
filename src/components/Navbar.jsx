import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BETIY</Link>
      </div>

      <div className="navbar-links">
        {isHome ? (
          <>
            <a href="#about">About Us</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact Us</a>
          </>
        ) : (
          <Link to="/">Home</Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <span className="navbar-greeting">Hi, {user?.name}</span>

            <button onClick={handleLogout} className="navbar-logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;