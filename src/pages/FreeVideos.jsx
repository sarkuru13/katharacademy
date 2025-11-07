import VideoCard from "../components/VideoCard";

function FreeVideos() {
  return (
    <div>
      <h2 className="mb-4">Free Videos</h2>
      <div className="row">
        <div className="col-md-6"><VideoCard title="Learn React Basics" videoId="dGcsHMXbSOA" /></div>
        <div className="col-md-6"><VideoCard title="Understanding JavaScript" videoId="W6NZfCO5SIk" /></div>
      </div>
    </div>
  );
}
export default FreeVideos;
