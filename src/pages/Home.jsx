import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="container my-5">
        <div className="p-5 text-center bg-light rounded-3 shadow-sm">
          <h1 className="display-4 fw-bold">Welcome to KatharAcademy</h1>
          <p className="fs-4 text-muted">
            Learn, explore, and grow with our exclusive and free educational
            content!
          </p>
          <Link className="btn btn-primary btn-lg mt-3" to="/free-videos">
            Browse Free Videos
          </Link>
          <Link className="btn btn-outline-secondary btn-lg mt-3 ms-2" to="/exclusive">
            See Exclusive Content
          </Link>
        </div>
      </div>

      {/* Featured Free Videos Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Free Videos</h2>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <VideoCard
              title="Learn React Basics"
              videoId="dGcsHMXbSOA"
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <VideoCard
              title="Understanding JavaScript"
              videoId="W6NZfCO5SIk"
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            {/* You can add more featured videos */}
            <VideoCard
              title="CSS Grid Layout"
              videoId="f-xyTHsY-w" // Example video ID
            />
          </div>
        </div>
        <div className="text-center">
          <Link className="btn btn-outline-primary" to="/free-videos">
            View All Free Videos
          </Link>
        </div>
      </div>

      {/* Featured Exclusive Videos Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Exclusive Content</h2>
        <p className="text-center text-muted mb-4">
          Special videos available only on our website!
        </p>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <VideoCard
              title="Exclusive Lesson 1: Deep Dive"
              videoId="YOUR_UNLISTED_VIDEO_ID_1"
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <VideoCard
              title="Exclusive Lesson 2: Pro Tips"
              videoId="YOUR_UNLISTED_VIDEO_ID_2"
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-primary border-2">
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <h5 className="card-title">More Coming Soon!</h5>
                <p className="card-text">
                  New exclusive content is added regularly.
                </p>
                <Link className="btn btn-primary mt-auto" to="/exclusive">
                  See All Exclusive Videos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;