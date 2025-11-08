import { Link } from 'react-router-dom';

/**
 * A card component to display a link to a playlist.
 * @param {string} title - The title of the playlist.
 * @param {string} description - A short description of the playlist.
 * @param {string} playlistId - The unique identifier for the playlist (used in the URL).
 * @param {string} thumbnailUrl - A URL for a thumbnail image (optional).
 */
function PlaylistCard({ title, description, playlistId, thumbnailUrl }) {
  // Use a placeholder image if no thumbnail is provided
  const imageUrl = thumbnailUrl || 'https://via.placeholder.com/350x150?text=Playlist';

  return (
    <div className="card h-100 shadow-sm border-0">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <Link 
          to={`/player/${playlistId}`} 
          className="btn btn-primary mt-auto"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
}
export default PlaylistCard;