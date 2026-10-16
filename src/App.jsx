import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyEvents from "./pages/MyEvents";

import "./App.css";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/my-events"
            element={user ? <MyEvents /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;