import { Link } from 'react-router-dom';

function Footer() {
  return (
    // Use a light background for the footer for a softer feel
    <footer className="bg-light text-center text-muted pt-5 pb-4 mt-auto">
      <div className="container">
        <section className="mb-4">
          <p>
            KatharAcademy provides high-quality educational videos to help you
            learn, explore, and grow.
          </p>
        </section>
        <section>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h6 className="text-uppercase fw-bold">Pages</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/" className="text-muted">Home</Link>
                </li>
                <li>
                  <Link to="/free-videos" className="text-muted">Free Videos</Link>
                </li>
                <li>
                  <Link to="/exclusive" className="text-muted">Exclusive</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h6 className="text-uppercase fw-bold">Social</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted">YouTube</a>
                </li>
                <li>
                  <a href="#!" className="text-muted">Twitter (X)</a>
                </li>
                <li>
                  <a href="#!" className="text-muted">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <hr className="my-4" />
        <div className="text-center">
          © {new Date().getFullYear()} KatharAcademy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;