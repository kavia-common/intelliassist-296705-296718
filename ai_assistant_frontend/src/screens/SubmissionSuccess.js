import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import './SubmissionSuccessModal.css';
import { theme } from '../styles/theme.tokens.ts';

/**
 * PUBLIC_INTERFACE
 * SubmissionSuccess
 * Modal confirming mock-safe case creation with generic placeholders.
 * UI spec:
 *  - Title: "Case Created Successfully"
 *  - Subtext: "Your case has been submitted. You can review it in your funeral home system or begin a new case."
 *  - Case Summary card:
 *      Label: "Case Reference"
 *      Value: "Case ID Generated"
 *      Subtext: "Case details have been saved to the system."
 *  - Primary buttons:
 *      • "View in Funeral Home System" (no navigation; demo only)
 *      • "Start New Case" (navigate to Upload Recording)
 *  - Footer text: "You can always find this case in your dashboard."
 * Behaviors are mock-only and do not expose real data.
 */
function SubmissionSuccess() {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/dashboard', { replace: true, state: { readOnly: true } });
  }, [navigate]);

  const handleViewExternal = useCallback(() => {
    // Mock-only: no navigation, demo button
    // Intentionally left as no-op
  }, []);

  const handleStartNew = useCallback(() => {
    navigate('/upload', { replace: true });
  }, [navigate]);

  const stop = (e) => e.stopPropagation();

  const PlaneIcon = () => (
    <div
      className="success-icon"
      aria-hidden="true"
      style={{
        color: theme.components.Modal.success.icon,
        background: 'rgba(46,125,50,0.10)',
        border: '1px solid rgba(46,125,50,0.32)',
      }}
    >
      ✈️
    </div>
  );

  return (
    <div className="success-overlay" aria-modal="true" role="dialog" aria-labelledby="success-title" onClick={() => { /* no background close */ }}>
      <div className="success-modal" onClick={stop}>
        <button className="success-close" onClick={handleClose} aria-label="Close and return to Case Dashboard (read-only)">
          ✕
        </button>

        <PlaneIcon />

        <div id="success-title" className="success-title">Case Created Successfully</div>
        <div className="success-helper">Your case has been submitted. You can review it in your funeral home system or begin a new case.</div>

        <div className="success-case" aria-label="Case Summary">
          <div className="label">Case Reference</div>
          <div className="value">Case ID Generated</div>
          <div className="subtext">Case details have been saved to the system.</div>
        </div>

        <div className="success-actions">
          <button
            className="btn secondary"
            onClick={handleViewExternal}
            style={{
              background: theme.components.Modal.success.secondaryButton.bg,
              color: theme.components.Modal.success.secondaryButton.text,
              border: `1px solid ${theme.components.Modal.success.secondaryButton.border}`,
            }}
          >
            View in Funeral Home System
          </button>
          <button
            className="btn"
            onClick={handleStartNew}
            style={{
              background: theme.components.Modal.success.primaryButton.bg,
              color: theme.components.Modal.success.primaryButton.text,
            }}
          >
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
