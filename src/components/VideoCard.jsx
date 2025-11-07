function VideoCard({ title, videoId }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        ></iframe>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}
export default VideoCard;
