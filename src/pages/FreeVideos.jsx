import VideoCard from "../components/VideoCard";

function FreeVideos() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Free Videos</h1>
        <p className="fs-5 text-muted">
          Browse our collection of free tutorials and lessons.
        </p>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="Learn React Basics" videoId="dGcsHMXbSOA" />
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="Understanding JavaScript" videoId="W6NZfCO5SIk" />
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="CSS Grid Layout" videoId="f-xyTHsY-w" />
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="Flexbox Explained" videoId="u-N33M" />
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="Node.js Crash Course" videoId="fBNz5xF-Kx4" />
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <VideoCard title="Python for Beginners" videoId="kqtD5d_H" />
        </div>
      </div>
    </div>
  );
}
export default FreeVideos;