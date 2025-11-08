// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Import pages
import Home from "./pages/Home";
import FreeVideos from "./pages/FreeVideos";
import Exclusive from "./pages/Exclusive";
import Contact from "./pages/Contact";
import PlayerPage from "./pages/PlayerPage";
import ManageContent from "./pages/ManageContent"; // <-- Import admin page

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        {/* The main content area grows to fill available space */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/free-videos" element={<FreeVideos />} />
            <Route path="/exclusive" element={<Exclusive />} />
            <Route path="/contact" element={<Contact />} />
            {/* The route for the video player */}
            <Route path="/player/:playlistId" element={<PlayerPage />} />
            {/* A route for your admin page */}
            <Route path="/admin/manage" element={<ManageContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;