import { Routes, Route, Navigate } from "react-router-dom";

import Civicos from "./pages/civicos/civicos";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashborad/Dashboard.jsx";
import GovernmentForm from "./pages/GovernmentForm/GovernmentForm.jsx";

// Second Register
import SecondRegister from "./pages/SecondRegister/SecondRegister.jsx";


const App = () => {
  return (
    <Routes>

      {/* Civicos Page */}
      <Route
        path="/civicos"
        element={<Civicos />}
      />


      {/* Home Page */}
      <Route
        path="/home"
        element={<Home />}
      />


      {/* Register Page */}
      <Route
        path="/register"
        element={<Register />}
      />


      {/* Second Register Page */}
      <Route
        path="/second-register"
        element={<SecondRegister />}
      />


      {/* Login Page */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* Dashboard Page */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* Government Authority Form */}
      <Route
        path="/government-form"
        element={<GovernmentForm />}
      />


      {/* Default Page */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
};


export default App;