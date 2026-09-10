import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please Register First");
      navigate("/register");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {

      alert("Login Successful!");

      localStorage.setItem("isLoggedIn","true");
      
      navigate("/home");

    } else {

      alert("Invalid Email or Password");

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="auth-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="bottom-text">

          Don't have an account?

          <span onClick={() => navigate("/register")}>
            Register
          </span>

        </p>

      </div>

    </div>
  );
};

export default Login;