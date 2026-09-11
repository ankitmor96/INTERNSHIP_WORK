import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Custom Alert State
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        show: true,
        type: "error",
        message: "Password does not match"
      });
      return;
    }

    const user = {
      email: email,
      password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    setAlert({
      show: true,
      type: "success",
      message: "Registration Successful!"
    });
  };

  const closeAlert = () => {
    setAlert({
      show: false,
      type: "",
      message: ""
    });

    if (alert.type === "success") {
      navigate("/login");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Register to get started
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

          <div className="input-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

          </div>

          <button className="auth-btn" type="submit">
            Register
          </button>

        </form>

        <p className="bottom-text">

          Already have an account?

          <span onClick={() => navigate("/login")}>
            Login
          </span>

        </p>

      </div>


      {/* ================================
          CUSTOM ALERT
      ================================= */}

      {alert.show && (
        <div className="custom-alert-overlay">

          <div className={`custom-alert ${alert.type}`}>

            <div className="alert-icon">
              {alert.type === "success" ? "✓" : "!"}
            </div>

            <h2>
              {alert.type === "success"
                ? "Registration Successful"
                : "Registration Error"}
            </h2>

            <p>
              {alert.message}
            </p>

            <button
              className="alert-btn"
              onClick={closeAlert}
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Register;