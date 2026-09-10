import { Routes, Route, Navigate } from "react-router-dom";

import Civicos from "./pages/civicos/civicos";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashborad/Dashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/civicos" element={<Civicos />} />

      <Route path="/home" element={<Home />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
};

export default App;