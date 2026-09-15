
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAlert({
      type: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setAlert({
        type: "error",
        message: "Please enter your email and password.",
      });

      return;
    }

    if (!formData.email.includes("@")) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address.",
      });

      return;
    }

    console.log("Admin Login Data:", formData);

    setAlert({
      type: "success",
      message:
        "Admin login successful. Welcome to the CIVICOS Administration Portal.",
    });
  };

  const closeAlert = () => {
    setAlert({
      type: "",
      message: "",
    });
  };

  return (
    <div className="admin-login-page">

      {/* ================= HEADER ================= */}

      <header className="admin-header">

        <div className="header-left">

          <div className="emblem">
            <img
              src="/assets/government-emblem.png"
              alt="Government of Gujarat Emblem"
            />
          </div>

          <div className="header-title">
            <h1>Government of Gujarat</h1>
            <p>Civicos Digital Services Portal</p>
          </div>

        </div>

        <div className="civicos-brand">
          <span>CIVICOS</span>
          <small>Digital Governance</small>
        </div>

      </header>


      {/* ================= ALERT ================= */}

      {alert.message && (
        <div className={`admin-alert ${alert.type}`}>

          <div className="alert-icon">

            {alert.type === "success" ? (
              <CheckCircle size={22} />
            ) : (
              <AlertCircle size={22} />
            )}

          </div>

          <div className="alert-content">

            <strong>
              {alert.type === "success"
                ? "Login Successful"
                : "Login Failed"}
            </strong>

            <span>{alert.message}</span>

          </div>

          <button
            type="button"
            className="alert-close"
            onClick={closeAlert}
          >
            <X size={17} />
          </button>

        </div>
      )}


      {/* ================= MAIN ================= */}

      <main className="admin-login-main">

        <div className="login-container">

          {/* ================= LEFT ================= */}

          <div className="login-info">

            <div className="info-icon">
              <ShieldCheck size={42} />
            </div>

            <h2>
              Government Administration
            </h2>

            <p>
              Secure access to the CIVICOS Government
              Digital Services Administration Portal.
            </p>

            <div className="security-box">

              <div className="security-item">
                <ShieldCheck size={20} />
                <span>
                  Secure Government Portal
                </span>
              </div>

              <div className="security-item">
                <Lock size={20} />
                <span>
                  Authorized Personnel Only
                </span>
              </div>

            </div>

          </div>


          {/* ================= LOGIN ================= */}

          <div className="login-card">

            <div className="login-card-header">

              <div className="admin-icon">
                <ShieldCheck size={30} />
              </div>

              <h2>Admin Login</h2>

              <p>
                Sign in to access the administration dashboard
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">

                  <Mail size={19} />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />

                </div>

              </div>


              {/* Password */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <Lock size={19} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* Login Button */}

              <button
                type="submit"
                className="login-btn"
              >
                <ShieldCheck size={20} />
                Sign In
              </button>

            </form>


            {/* Security Note */}

            <div className="login-note">

              <Lock size={15} />

              <span>
                This portal is restricted to authorized
                government administrators.
              </span>

            </div>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="admin-footer">

        <div>
          © 2026 Government of Gujarat. All Rights Reserved.
        </div>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Help &amp; Support</span>
        </div>

      </footer>

    </div>
  );
};

export default AdminLogin;
