import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// --- Mock Playlist Data with Quizzes ---
const allPlaylists = {
  'react-basics': {
    title: 'React Basics',
    videos: [
      { 
        id: 'dGcsHMXbSOA', 
        title: 'What is React?',
        quiz: [
          { q: 'What is React?', options: ['A library', 'A framework', 'A language'], answer: 0 },
          { q: 'What is JSX?', options: ['JavaScript XML', 'JavaScript X', 'Java Syntax'], answer: 0 }
        ]
      },
      { 
        id: 'W6NZfCO5SIk', 
        title: 'Understanding JSX',
        quiz: [
          { q: 'Can you use JS in JSX?', options: ['Yes, with {}', 'No'], answer: 0 }
        ]
      },
      { 
        id: 'f-xyTHsY-w', 
        title: 'Props vs. State',
        quiz: [
          { q: 'Are props mutable?', options: ['Yes', 'No'], answer: 1 },
          { q: 'Is state mutable?', options: ['Yes', 'No'], answer: 0 }
        ]
      },
    ],
  },
  'javascript-fundamentals': {
    title: 'JavaScript Fundamentals',
    videos: [
      { id: 'W6NZfCO5SIk', title: 'Understanding JavaScript', quiz: [] },
      { id: 'fBNz5xF-Kx4', title: 'Variables and Data Types', quiz: [] },
      { id: 'u-N33M', title: 'Functions and Scope', quiz: [] },
    ],
  },
  'exclusive-deep-dive': {
    title: 'Exclusive Deep Dive',
    videos: [
      { id: 'YOUR_UNLISTED_VIDEO_ID_1', title: 'Advanced State Management', quiz: [] },
      { id: 'YOUR_UNLISTED_VIDEO_ID_2', title: 'Performance Optimization Tips', quiz: [] },
      { id: 'YOUR_UNLISTED_VIDEO_ID_3', title: 'Custom Hooks Explained', quiz: [] },
    ],
  },
};
// --- End Mock Data ---


function PlayerPage() {
  const { playlistId } = useParams();
  
  const playlist = useMemo(() => allPlaylists[playlistId] || { title: 'Not Found', videos: [] }, [playlistId]);

  const [currentVideo, setCurrentVideo] = useState(playlist.videos[0]);
  const [notes, setNotes] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // When the video changes, reset the notes and quiz
  useEffect(() => {
    setNotes('');
    setQuizAnswers({});
    setQuizResult(null);
  }, [currentVideo]);

  // --- Notes Download ---
  const handleDownloadNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Create a filename based on video title
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

  // --- Render ---
  if (!currentVideo) {
    return (
      <div className="container my-5 text-center">
        <h1 className="display-5">Playlist Not Found</h1>
        <p className="fs-5 text-muted">Sorry, we couldn't find the playlist you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid my-4">
      <h1 className="h2 mb-4">{playlist.title}</h1>
      <div className="row">
        {/* --- Video Player and Playlist --- */}
        <div className="col-lg-8">
          {/* ... video player and list code (unchanged) ... */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                title={currentVideo.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="card-body">
              <h5 className="card-title">{currentVideo.title}</h5>
            </div>
          </div>
          <h3 className="h5 mb-3">Videos in this playlist</h3>
          <div className="list-group">
            {playlist.videos.map((video) => (
              <button
                key={video.id}
                type="button"
                className={`list-group-item list-group-item-action ${video.id === currentVideo.id ? 'active' : ''}`}
                onClick={() => setCurrentVideo(video)}
              >
                {video.title}
              </button>
            ))}
          </div>
        </div>

        {/* --- Notes and Quiz Sidebar --- */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{top: '80px'}}>
            {/* ... tab navigation (unchanged) ... */}
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
            <div className="card-body tab-content" id="learningTabsContent" style={{maxHeight: '70vh', overflowY: 'auto'}}>
              {/* Notes Tab */}
              <div className="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="notes-tab">
                <h5 className="card-title">My Notes</h5>
                <p className="card-text text-muted small">
                  Jot down your thoughts for "{currentVideo.title}".
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
                >
                  Download Notes
                </button>
              </div>
              
              {/* Quiz Tab */}
              <div className="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="quiz-tab">
                <h5 className="card-title">Quiz</h5>
                <p className="text-muted small">Quiz for "{currentVideo.title}"</p>
                
                {quizResult && (
                  <div className="alert alert-success">
                    You scored {quizResult.score} out of {quizResult.total}!
                  </div>
                )}

                {currentVideo.quiz.length === 0 ? (
                  <p className="text-muted">No quiz available for this video.</p>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()}>
                    {currentVideo.quiz.map((q, qIndex) => (
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