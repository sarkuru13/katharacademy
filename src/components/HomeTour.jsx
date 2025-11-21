// src/components/HomeTour.jsx
import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

function HomeTour() {
  const [run, setRun] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Check if the user has already completed or skipped the tour
    const hasSeenTour = localStorage.getItem('kathar_tour_completed');
    
    if (!hasSeenTour) {
      // If not, show the welcome modal
      setShowWelcomeModal(true);
    }
  }, []);

  const handleStartTour = () => {
    setShowWelcomeModal(false);
    setRun(true);
  };

  const handleSkipTour = () => {
    setShowWelcomeModal(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem('kathar_tour_completed', 'true');
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('kathar_tour_completed', 'true');
    }
  };

  // Define the steps of the tour
  const steps = [
    {
      target: '#tour-welcome',
      content: 'Welcome to your new dashboard! This is where your learning journey begins.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#tour-free-videos',
      content: 'Click here to browse our entire collection of free educational videos.',
    },
    {
      target: '#tour-exclusive',
      content: 'Access premium content and special courses here (Login required).',
    },
    {
      target: '#tour-featured',
      content: 'Check out our top-rated and most popular playlists right here.',
    }
  ];

  return (
    <>
      {/* The Tour Component */}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            primaryColor: '#0d6efd', // Matches your Bootstrap primary color
            zIndex: 10000,
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            textColor: '#333',
            width: 400,
          },
        }}
        callback={handleJoyrideCallback}
      />

      {/* Custom Welcome Modal */}
      {showWelcomeModal && (
        <>
          {/* Dark Backdrop */}
          <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
          
          {/* Modal Content */}
          <div className="modal fade show d-block" style={{ zIndex: 1055 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content shadow-lg border-0 rounded-3">
                <div className="modal-body p-5 text-center">
                  <h2 className="fw-bold mb-3 text-primary">Welcome to Kathar Academy! 🎓</h2>
                  <p className="text-muted mb-4 fs-5">
                    We are glad to have you here. Would you like a quick tour to help you get started?
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <button 
                      className="btn btn-outline-secondary btn-lg px-4" 
                      onClick={handleSkipTour}
                    >
                      Skip
                    </button>
                    <button 
                      className="btn btn-primary btn-lg px-4" 
                      onClick={handleStartTour}
                    >
                      Take Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomeTour;