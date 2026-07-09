import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";
import "./SignUp.css";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");




  const validate = () => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  if (!email.includes("@")) {
    return "Invalid email format";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

 const handleSignup = async (e) => {
  e.preventDefault();

  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }


  const success = await signup(
    name,
    email,
    password
  );


  if (success) {
    navigate("/login");
  } else {
    setError("Signup failed");
  }
};

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Signup</h2>

          <form onSubmit={handleSignup} className="auth-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit-btn">
              Signup
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;