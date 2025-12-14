import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * SubmissionSuccess
 * Displays a success confirmation with "View Case" and "Start New Upload" actions.
 */
function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card panel" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, lineHeight: 1 }}>✅</div>
        <h2 style={{ marginTop: 8, color: 'var(--color-success)' }}>Submission Successful</h2>
        <p className="helper">Your case has been submitted. You can return to the dashboard or start a new upload.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
          <button className="btn" onClick={() => navigate('/dashboard')}>View Case</button>
          <button className="btn secondary" onClick={() => navigate('/upload')}>Start New Upload</button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
