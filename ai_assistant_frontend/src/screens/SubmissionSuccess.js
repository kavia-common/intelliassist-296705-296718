import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import './SubmissionSuccessModal.css';

/**
 * PUBLIC_INTERFACE
 * SubmissionSuccess
 * Shows a centered modal dialog confirming case creation.
 * Behavior:
 *  - Close icon routes to Case Dashboard in read-only state.
 *  - "View in Passare" opens an external URL in a new tab (placeholder).
 *  - "Start New Case" routes to Upload Recording (resets workflow).
 *  - Overlay is not clickable to close to avoid accidental dismiss.
 */
function SubmissionSuccess() {
  const navigate = useNavigate();

  // Simulated case details; in real use, pass via state or fetch
  const caseNumber = 'Case FH 2025 6422';
  const caseName = 'Eleanor May Thompson';

  // Close icon -> Dashboard read-only state
  const handleClose = useCallback(() => {
    navigate('/dashboard', { replace: true, state: { readOnly: true } });
  }, [navigate]);

  // View external system in new tab
  const handleViewExternal = useCallback(() => {
    const url = 'https://example.com/passare/case/placeholder'; // placeholder URL
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Start a new case
  const handleStartNew = useCallback(() => {
    navigate('/upload', { replace: true });
  }, [navigate]);

  // Prevent overlay click from closing
  const stop = (e) => e.stopPropagation();

  // Paper-plane icon in success green (accessible)
  const PlaneIcon = () => (
    <div className="success-icon" aria-hidden="true">
      ✈️
    </div>
  );

  return (
    <div className="success-overlay" aria-modal="true" role="dialog" aria-labelledby="success-title" onClick={(e) => { /* do not close on background */ }}>
      <div className="success-modal" onClick={stop}>
        <button className="success-close" onClick={handleClose} aria-label="Close and return to Case Dashboard (read-only)">
          ✕
        </button>

        <PlaneIcon />

        <div id="success-title" className="success-title">Case Created Successfully</div>
        <div className="success-helper">Your case has been submitted. You can review it in Passare or begin a new case.</div>

        <div className="success-case" aria-label="Case identifiers">
          <div className="label">Case Number</div>
          <div className="value">{caseNumber}</div>
          <div className="subtext">Case Name — {caseName}</div>
        </div>

        <div className="success-actions">
          <button className="btn secondary" onClick={handleViewExternal}>
            View in Passare
          </button>
          <button className="btn success" onClick={handleStartNew}>
            Start New Case
          </button>
        </div>

        <div className="success-footer-note">
          You can always find this case in your dashboard.
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
