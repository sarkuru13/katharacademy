// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- 1. Import
import AdminRoute from "./components/AdminRoute";       // <-- 2. Import

// Import pages
import Home from "./pages/Home";
import FreeVideos from "./pages/FreeVideos";
import Exclusive from "./pages/Exclusive";
import Contact from "./pages/Contact";
import PlayerPage from "./pages/PlayerPage";
import ManageContent from "./pages/ManageContent";
import Login from "./pages/Login";             // <-- 3. Import
import Register from "./pages/Register";       // <-- 4. Import

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        {/* The main content area grows to fill available space */}
        <main className="flex-grow-1">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/free-videos" element={<FreeVideos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/player/:playlistId" element={<PlayerPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- Protected User Routes --- */}
            {/* These routes can only be seen if you are logged in */}
            <Route element={<ProtectedRoute />}>
              <Route path="/exclusive" element={<Exclusive />} />
            </Route>

            {/* --- Protected Admin Routes --- */}
            {/* These routes can only be seen by an admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/manage" element={<ManageContent />} />
            </Route>
            
            {/* TODO: Add a 404 Not Found page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;