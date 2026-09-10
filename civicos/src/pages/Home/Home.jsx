import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    alert("Logout Successful!");

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

    </div>
  );
};

export default Home;