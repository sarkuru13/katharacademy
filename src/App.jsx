import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Import pages
import Home from "./pages/Home";
import FreeVideos from "./pages/FreeVideos";
import Exclusive from "./pages/Exclusive";
import Contact from "./pages/Contact";
// Import the new PlayerPage
import PlayerPage from "./pages/PlayerPage";

// We'll wrap the app in a flex container to ensure the footer
// sticks to the bottom on pages with little content.
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
            {/* Add the new route for the player page */}
            {/* :playlistId is a URL parameter that we can read in the PlayerPage */}
            <Route path="/player/:playlistId" element={<PlayerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;