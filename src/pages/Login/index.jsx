import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const validate = () => {

  if (!email.trim()) {
    return "Email is required";
  }

  if (!email.includes("@")) {
    return "Invalid email format";
  }

  if (!password) {
    return "Password is required";
  }

  return "";
};
const handleLogin = async (e) => {
  e.preventDefault();


  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }
const success = await login(
    email,
    password
  );

 if (success) {
    navigate("/dashboard");
  } else {
    setError("Invalid email or password");
  }
};

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>

          <form onSubmit={handleLogin} className="auth-form">
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
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;