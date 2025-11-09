// src/pages/PlayerPage.jsx
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlaylists } from '../contexts/PlaylistContext.jsx';
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  FastForward,
} from 'lucide-react';

/**
 * Custom Video Player Component
 */
const CustomVideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // --- THIS IS THE FIXED LINE ---
  const [duration, setDuration] = useState(0);
  // --- END OF FIX ---
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // NEW: Playback Speed
  const [playbackRate, setPlaybackRate] = useState(1);
  const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75];

  let controlsTimeout;

  // --- Utility Functions ---

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) {
      return '--:--';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  // --- Event Handlers for Video Element ---

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);
    const handleDurationChange = () => {
      if (videoElement.duration && isFinite(videoElement.duration)) {
        setDuration(videoElement.duration);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };

    if (videoElement.duration && isFinite(videoElement.duration)) {
      setDuration(videoElement.duration);
    }
    if (!videoElement.paused) {
      setIsPlaying(true);
    }
    videoElement.playbackRate = playbackRate;

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadedmetadata', handleDurationChange);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('volumechange', handleVolumeChange);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadedmetadata', handleDurationChange);
      videoElement.removeEventListener('durationchange', handleDurationChange);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [video, playbackRate]); // Add playbackRate as dependency

  // --- Event Handlers for Fullscreen ---

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // --- Event Handlers for Controls Visibility ---

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    handleMouseMove();
    return () => clearTimeout(controlsTimeout);
  }, [isPlaying]);

  // --- Control Functions (wrapped in useCallback) ---

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // *** THIS IS THE FIX FOR THE "NOT PLAYED" BUG ***
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video play failed:", error);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);
  
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      if (!newMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.5;
      }
    }
  }, []);

  // NEW: Cycle Playback Speed
  const cyclePlaybackSpeed = useCallback(() => {
    if (!videoRef.current) return;
    const currentSpeedIndex = PLAYBACK_SPEEDS.indexOf(playbackRate);
    const nextSpeedIndex = (currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
    const newSpeed = PLAYBACK_SPEEDS[nextSpeedIndex];
    setPlaybackRate(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  }, [playbackRate, PLAYBACK_SPEEDS]);

  const handleSeek = (e) => {
    if (!duration) return;
    const { width } = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.nativeEvent.offsetX;
    const newTime = (clickPosition / width) * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  // --- NEW: Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'INPUT' ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (!videoRef.current) return;

      switch (e.key.toLowerCase()) {
        case 'f':
          e.preventDefault();
          toggleFullScreen();
          break;
        case 'arrowright':
          e.preventDefault();
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
          break;
        case 'arrowleft':
          e.preventDefault();
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'p':
          e.preventDefault();
          cyclePlaybackSpeed();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause, toggleFullScreen, toggleMute, cyclePlaybackSpeed, duration]);
  
  // --- Volume Icon Logic ---
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  // --- Main Render ---
  if (!video) return null;

  if (video.type !== 'appwrite') {
    return (
      <div 
        className="d-flex justify-content-center align-items-center bg-dark text-white rounded-top" 
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
      >
        <div className="text-center p-3">
          <h5>Unsupported Video Type</h5>
          <p className="mb-0 text-muted">This player is configured to only play videos with type: 'appwrite'.</p>
          <p className="text-muted small">Found type: '{video.type}'</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={playerWrapperRef}
      className={`player-wrapper ${isPlaying ? '' : 'paused'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="rounded-top"
        onClick={togglePlayPause}
        preload="metadata" 
      />
      
      <button 
        className={`center-play-button ${showControls ? 'visible' : ''}`}
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" />}
      </button>

      <div className={`video-controls-container ${showControls ? 'visible' : ''}`}>
        <div ref={progressBarRef} className="progress-bar-container" onClick={handleSeek}>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            >
              <div className="progress-bar-thumb"></div>
            </div>
          </div>
        </div>

        <div className="controls-bottom-bar">
          <div className="controls-group left">
            <button
              className="control-button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="volume-container">
              <button
                className="control-button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <VolumeIcon />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volume"
              />
            </div>
          </div>

          <div className="controls-group right">
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            {/* NEW: Playback Speed Button */}
            <button
              className="control-button"
              onClick={cyclePlaybackSpeed}
              aria-label="Playback Speed"
              title={`Playback Speed: ${playbackRate}x`}
            >
              {playbackRate === 1 ? <FastForward size={20} /> : <span>{playbackRate}x</span>}
            </button>

            <button
              className="control-button"
              onClick={toggleFullScreen}
              aria-label={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * Main Player Page Component
 */
function PlayerPage() {
  const { playlistId } = useParams();
  const { playlists } = usePlaylists(); 
  
  const playlist = useMemo(() => playlists[playlistId] || { title: 'Not Found', videos: [] }, [playlists, playlistId]);

  const [currentVideo, setCurrentVideo] = useState(playlist.videos[0]);
  const [notes, setNotes] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const firstVideo = playlist.videos[0];
    setCurrentVideo(firstVideo);
    setNotes('');
    setQuizAnswers({});
    setQuizResult(null);
  }, [playlistId, playlist.videos]);

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
    setNotes('');
    setQuizAnswers({});
    setQuizResult(null);
  };

  // --- Quiz Logic ---
  const handleQuizChange = (questionIndex, optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: optionIndex });
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
            <CustomVideoPlayer 
              key={currentVideo.id} 
              video={currentVideo} 
            />
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
              </div>
              
              {/* Quiz Tab */}
              <div className="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="quiz-tab">
                <h5 className="card-title">Quiz</h5>
                <p className="card-text text-muted small">Quiz for "{currentVideo.title}"</p>
                
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