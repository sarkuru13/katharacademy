function VideoCard({ title, videoId }) {
  return (
    // Add h-100 to make all cards in a row the same height
    <div className="card h-100 shadow-sm border-0">
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
          className="rounded-top"
        ></iframe>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}
export default VideoCard;