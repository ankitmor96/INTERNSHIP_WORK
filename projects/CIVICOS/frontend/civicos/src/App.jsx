import { Routes, Route, Navigate } from "react-router-dom";

import Civicos from "./pages/civicos/civicos";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashborad/Dashboard.jsx";
import GovernmentForm from "./pages/GovernmentForm/GovernmentForm.jsx";
import AdminReports from "./pages/AdminReports/AdminReports.jsx";
import ApiTest from "./components/ApiTest.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import CityForm from "./pages/CityForm/CityForm.jsx";

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

      {/* Admin Reports Page */}
      <Route
        path="/admin-reports"
        element={<AdminReports />}
      />

      {/* Admin Login Page */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* API Test Page */}
      <Route
        path="/api-test"
        element={<ApiTest />}
      />

      {/* City Form */}
      <Route
        path="/city-form"
        element={<CityForm />}
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