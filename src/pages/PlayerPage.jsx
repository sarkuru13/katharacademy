// src/pages/PlayerPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlaylists } from '../contexts/PlaylistContext.jsx'; 

function PlayerPage() {
  const { playlistId } = useParams();
  const { playlists } = usePlaylists(); 
  
  // Find the playlist from our context data
  const playlist = useMemo(() => playlists[playlistId] || { title: 'Not Found', videos: [] }, [playlists, playlistId]);

  // State for the currently selected video
  const [currentVideo, setCurrentVideo] = useState(playlist.videos[0]);
  
  // State for notes and quizzes
  const [notes, setNotes] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // When the playlistId or playlist data changes, set the video to the first in that playlist
  useEffect(() => {
    const firstVideo = playlist.videos[0];
    setCurrentVideo(firstVideo);

    // Reset notes and quiz state
    setNotes('');
    setQuizAnswers({});
    setQuizResult(null);
  }, [playlistId, playlist.videos]);

  // Handle changing the video
  const handleVideoChange = (video) => {
    setCurrentVideo(video);
    setNotes('');
    setQuizAnswers({});
    setQuizResult(null);
  };

  // --- Notes Download ---
  const handleDownloadNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `${currentVideo.title.replace(/ /g, '_')}_notes.txt`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Quiz Logic ---
  const handleQuizChange = (questionIndex, optionIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const quiz = currentVideo.quiz;
    quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.answer) {
        score++;
      }
    });
    setQuizResult({ score, total: quiz.length });
  };
  
  const currentQuiz = currentVideo?.quiz || [];

  // --- Video Render Function ---
  const renderVideoPlayer = (video) => {
    if (!video) return null;

    const commonIframeProps = {
      title: video.title,
      allowFullScreen: true,
      className: "rounded-top",
      style: { border: 0 },
      allow: "autoplay; fullscreen; picture-in-picture",
    };

    switch (video.type) {
      case 'youtube':
        return (
          <iframe
            src={`https://www.youtube.com/embed/${video.src}`}
            {...commonIframeProps}
          ></iframe>
        );
      case 'screenpal':
        return (
          <iframe
            src={`https://go.screenpal.com/player/${video.src}?width=100%&height=100%&ff=1&title=0&brand=0`}
            {...commonIframeProps}
          ></iframe>
        );
      case 'vimeo':
        return (
          <iframe
            src={`https://player.vimeo.com/video/${video.src}`}
            {...commonIframeProps}
          ></iframe>
        );
      case 'mp4':
        return (
          <video
            controls
            src={video.src}
            className="rounded-top"
            style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
          >
            Your browser does not support the video tag.
          </video>
        );
      
      case 'googledrive':
        return (
          <iframe
            src={`https://drive.google.com/file/d/${video.src}/preview`}
            {...commonIframeProps}
          ></iframe>
        );
      
      case 'mux':
        return (
          <iframe
            src={`https://player.mux.com/${video.src}?video-title=${encodeURIComponent(video.title)}`}
            {...commonIframeProps}
          ></iframe>
        );

      default:
        return <div className="p-3 text-center">Unsupported video type: {video.type}</div>;
    }
  };

  // --- Render ---
  if (!currentVideo) {
    return (
      <div className="container my-5 text-center">
        <h1 className="display-5">Playlist Not Found</h1>
        <p className="fs-5 text-muted">Sorry, we couldn't find this playlist or it's empty.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* --- Video Player and Playlist --- */}
        <div className="col-lg-8">
          {/* Video Player */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="ratio ratio-16x9">
              {renderVideoPlayer(currentVideo)}
            </div>
            <div className="card-body">
              <h2 className="h4">{currentVideo.title}</h2>
              <h1 className="h6 text-muted">{playlist.title}</h1>
            </div>
          </div>
          
          {/* Playlist */}
          <h3 className="h5 mb-3">Videos in this playlist</h3>
          <div className="video-playlist-scroll">
            <div className="list-group list-group-flush">
              {playlist.videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`list-group-item list-group-item-action ${video.id === currentVideo.id ? 'active' : ''}`}
                  onClick={() => handleVideoChange(video)}
                >
                  <span className="fw-bold me-2">{index + 1}.</span> {video.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Notes and Quiz Sidebar --- */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 player-sidebar">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" id="learningTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="notes-tab" data-bs-toggle="tab" data-bs-target="#notes" type="button" role="tab" aria-controls="notes" aria-selected="true">Notes</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="quiz-tab" data-bs-toggle="tab" data-bs-target="#quiz" type="button" role="tab" aria-controls="quiz" aria-selected="false">Quiz</button>
                </li>
              </ul>
            </div>
            
            {/* Tab Content */}
            <div className="card-body tab-content card-body-scrollable" id="learningTabsContent">
              {/* Notes Tab */}
              <div className="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="notes-tab">
                <h5 className="card-title">My Notes</h5>
                <p className="card-text text-muted small">
                  Notes for "{currentVideo.title}"
                </p>
                <textarea 
                  className="form-control" 
                  rows="15" 
                  placeholder="Type your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <button 
                  className="btn btn-primary mt-3"
                  onClick={handleDownloadNotes}
                  disabled={!notes}
                >
                  Download Notes
                </button>
              </div>
              
              {/* Quiz Tab */}
              <div className="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="quiz-tab">
                <h5 className="card-title">Quiz</h5>
                <p className="text-muted small">Quiz for "{currentVideo.title}"</p>
                
                {quizResult && (
                  <div className={`alert ${quizResult.score === quizResult.total ? 'alert-success' : 'alert-warning'}`}>
                    You scored {quizResult.score} out of {quizResult.total}!
                  </div>
                )}

                {currentQuiz.length === 0 ? (
                  <p className="text-muted">No quiz available for this video.</p>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()}>
                    {currentQuiz.map((q, qIndex) => (
                      <div key={qIndex} className="mb-4">
                        <p className="fw-bold">{qIndex + 1}. {q.q}</p>
                        {q.options.map((option, oIndex) => (
                          <div className="form-check" key={oIndex}>
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name={`quizQ${qIndex}`} 
                              id={`q${qIndex}o${oIndex}`} 
                              onChange={() => handleQuizChange(qIndex, oIndex)}
                              checked={quizAnswers[qIndex] === oIndex}
                              disabled={quizResult !== null}
                            />
                            <label className="form-check-label" htmlFor={`q${qIndex}o${oIndex}`}>
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                    <button 
                      type="button" 
                      className="btn btn-primary mt-3"
                      onClick={handleSubmitQuiz}
                      disabled={quizResult !== null}
                    >
                      Submit Quiz
                    </button>
                    {quizResult && (
                       <button 
                        type="button" 
                        className="btn btn-outline-secondary mt-3 ms-2"
                        onClick={() => {
                          setQuizResult(null);
                          setQuizAnswers({});
                        }}
                      >
                        Retake Quiz
                      </button>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;