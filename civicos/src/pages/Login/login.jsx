import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Custom Alert
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {

      setAlert({
        show: true,
        type: "account",
        message: "Please create an account before attempting to login."
      });

      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {

      localStorage.setItem("isLoggedIn", "true");

      setAlert({
        show: true,
        type: "success",
        message: "You have been securely authenticated."
      });

    } else {

      setAlert({
        show: true,
        type: "error",
        message: "The email or password you entered is incorrect."
      });

    }
  };


  const closeAlert = () => {

    const alertType = alert.type;

    setAlert({
      show: false,
      type: "",
      message: ""
    });

    if (alertType === "success") {
      navigate("/home");
    }

    if (alertType === "account") {
      navigate("/register");
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


      {/* =================================
          SECURITY ALERT
      ================================= */}

      {alert.show && (
        <div className="custom-alert-overlay">

          <div className={`custom-alert ${alert.type}`}>

            <div className="alert-icon">

              {alert.type === "success" && "🔐"}

              {alert.type === "error" && "🔒"}

              {alert.type === "account" && "👤"}

            </div>

            <div className="security-line">
              CIVIC GOVERNMENT PORTAL
            </div>

            <h2>

              {alert.type === "success" &&
                "Secure Login Successful"}

              {alert.type === "error" &&
                "Authentication Failed"}

              {alert.type === "account" &&
                "Account Not Found"}

            </h2>

            <p>
              {alert.message}
            </p>

            <button
              className="alert-btn"
              onClick={closeAlert}
            >
              {alert.type === "account"
                ? "Register Now"
                : alert.type === "success"
                  ? "Continue"
                  : "Try Again"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Login;