import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Landing.css";

function Landing() {
  return (
    <div>
      <Navbar />
      <section className="landing">
        <div className="logo">
          <span>📝</span>
          <h1>Noto</h1>
          </div>
        <h2>
          Organize your thoughts beautifully
        </h2>
        <p>
          Create, edit and manage your notes easily.
        </p>
        <div className="landing-buttons">
          <Link to="/signup">

            <button>
              Get Started
            </button>

          </Link>
          <Link to="/login">

            <button className="secondary-btn">
              Login
            </button>

          </Link>
        </div>
      </section>
      <section 
        id="features"
        className="features"
      >
        <h2>
          Features
        </h2>
        <div className="feature-list">
          <div>
            ✨ Create Notes
          </div>
          <div>
            🔍 Search Notes
          </div>
          <div>
            ⭐ Pin Important Notes
          </div>
          <div>
            🌙 Dark Mode
          </div>
        </div>
      </section>
      <section 
        id="about"
        className="about"
      >
        <h2>
          About Noto
        </h2>
        <p>
          Noto helps you capture your ideas,
          organize your thoughts and keep
          your important notes in one place.
        </p>
      </section>
    </div>
  );}
export default Landing;