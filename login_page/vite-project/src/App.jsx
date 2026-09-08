import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/login";
import Home from "./components/Home";

const App = () => {
  return (
    <Routes>

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />} />

    </Routes>
  );
};

export default App;