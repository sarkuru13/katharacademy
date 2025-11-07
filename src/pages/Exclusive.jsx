import VideoCard from "../components/VideoCard";

function Exclusive() {
  return (
    <div>
      <h2 className="mb-4">Exclusive Videos</h2>
      <p>These are special videos available only on our website!</p>
      <div className="row">
        <div className="col-md-6">
          <VideoCard title="Exclusive Lesson 1" videoId="YOUR_UNLISTED_VIDEO_ID" />
        </div>
      </div>
    </div>
  );
}
export default Exclusive;
