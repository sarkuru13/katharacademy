import React, { useState } from 'react';
import { usePlaylists } from '../contexts/PlaylistContext.jsx';
import { Save, AlertTriangle } from 'lucide-react';

/**
 * ManageContent Page
 *
 * This is an admin-style page to update the site's playlist data.
 * It reads from and writes to the PlaylistContext, which persists
 * to localStorage.
 */
function ManageContent() {
  const { updatePlaylists, getPlaylistsAsJsonString } = usePlaylists();

  // Initialize the textarea with the current data from context/localStorage
  const [jsonInput, setJsonInput] = useState(getPlaylistsAsJsonString());
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSave = () => {
    setError(null);
    setSuccess(null);

    try {
      // 1. Parse the text from the textarea
      const newData = JSON.parse(jsonInput);

      // 2. Call the update function from context
      const result = updatePlaylists(newData);

      if (result.success) {
        setSuccess(
          'Content updated successfully! The site is now using the new data.'
        );
      } else {
        setError(result.error);
      }
    } catch (parseError) {
      // 3. Handle invalid JSON
      console.error('Failed to parse JSON:', parseError);
      setError(
        'Invalid JSON format. Please check your data for syntax errors (e.g., missing commas, quotes).'
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h2 fw-bold">Manage Site Content</h1>
              <p className="text-muted">
                Paste your complete playlist data (in JSON format) into the
                textarea below and click "Save". This will update the entire
                site.
              </p>

              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <AlertTriangle size={20} className="me-2" />
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              <div className="form-group">
                <label htmlFor="jsonData" className="form-label fw-bold">
                  Playlist Data (JSON)
                </label>
                <textarea
                  id="jsonData"
                  className="form-control"
                  rows="25"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON data here..."
                ></textarea>
              </div>

              <button
                className="btn btn-primary btn-lg mt-3"
                onClick={handleSave}
              >
                <Save size={18} className="me-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageContent;