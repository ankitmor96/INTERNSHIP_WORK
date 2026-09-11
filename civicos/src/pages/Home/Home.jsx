import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    setShowLogoutAlert(true);
  };


  const handleContinue = () => {

    setShowLogoutAlert(false);

    navigate("/login");
  };


  return (
    <div className="home-page">

      <div className="home-card">

        <h1>Welcome 🎉</h1>

        <p>
          You are successfully logged in.
        </p>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>


      {/* =================================
          HOME LOGOUT ALERT
      ================================= */}

      {showLogoutAlert && (
        <div className="home-alert-overlay">

          <div className="home-alert">

            <div className="home-alert-icon">
              ✓
            </div>

            <div className="home-alert-label">
              CIVIC GOVERNMENT PORTAL
            </div>

            <h2>
              Session Ended
            </h2>

            <p>
              You have been successfully logged out
              of the Civic Government Portal.
            </p>

            <button
              className="home-alert-btn"
              onClick={handleContinue}
            >
              Continue to Login
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Home;