import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    // Use bg-white for a cleaner, modern look with a subtle shadow
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          {/* You can add an SVG logo here */}
          <span className="text-primary">Kathar</span>Academy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Use NavLink for active class styling */}
            <li className="nav-item">
              <NavLink className="nav-link" end to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/free-videos">
                Free Videos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/exclusive">
                Exclusive
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;