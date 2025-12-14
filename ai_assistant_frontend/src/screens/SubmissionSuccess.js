import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * SubmissionSuccess
 * Displays a success confirmation with primary action to "View in Funeral Home System",
 * and secondary actions to View Case (dashboard) or Start New Upload.
 */
function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card panel" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, lineHeight: 1 }}>✅</div>
        <h2 style={{ marginTop: 8, color: 'var(--color-success)' }}>Submission Successful</h2>
        <p className="helper">
          Your case has been submitted to the funeral home system. You may proceed to view it in your system or return to review.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={() => {
              // Placeholder: would open external system link if available
              navigate('/dashboard');
            }}
          >
            View in Funeral Home System
          </button>
          <button className="btn ghost" onClick={() => navigate('/dashboard')}>View Case</button>
          <button className="btn secondary" onClick={() => navigate('/upload')}>Start New Upload</button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
