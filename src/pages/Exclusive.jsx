import VideoCard from "../components/VideoCard";

function Exclusive() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Exclusive Videos</h1>
        <p className="fs-5 text-muted">
          These special videos are unlisted and available only here!
        </p>
      </div>
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
          <VideoCard
            title="Exclusive Lesson 3: Advanced Techniques"
            videoId="YOUR_UNLISTED_VIDEO_ID_3"
          />
        </div>
      </div>
    </div>
  );
}
export default Exclusive;