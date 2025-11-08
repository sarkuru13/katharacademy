import React, { useEffect } from 'react';

/**
 * AdBanner Component
 * Placeholder for ad integration.
 */
function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad banner failed to load:", e);
    }
  }, []);

  return (
    <div className="container my-4">
      <div className="text-center bg-light p-3 rounded border">
        <p className="text-muted mb-0">Advertisement</p>
        {/* <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        */}
      </div>
    </div>
  );
}

export default AdBanner;