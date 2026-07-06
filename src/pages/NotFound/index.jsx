import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./NotFound.css";

function NotFound() {
  return (
    <div>
      <Navbar />

      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-message">Page Not Found</h2>

        <Link to="/" className="notfound-link">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;