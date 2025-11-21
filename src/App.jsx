// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import FreeVideos from "./pages/FreeVideos";
import Exclusive from "./pages/Exclusive";
import Contact from "./pages/Contact";
import PlayerPage from "./pages/PlayerPage";
import ManageContent from "./pages/ManageContent";
import Login from "./pages/Login";
import Register from "./pages/Register";
// --- IMPORTS ---
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/free-videos" element={<FreeVideos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/player/:playlistId" element={<PlayerPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* --- NEW ROUTES --- */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/exclusive" element={<Exclusive />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin/manage" element={<ManageContent />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;