import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * FinalReview
 * Shows summary placeholders and a confirmation checkbox to enable "Confirm and Submit"
 * which navigates to /success.
 */
function FinalReview() {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900 }}>
      <div className="card panel">
        <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>Final Review</h2>
        <div className="hr" />
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card panel" style={{ padding: 12 }}>
            <div className="panel-title">Summary</div>
            <ul>
              <li>Deceased: [Name, DOB, DOP]</li>
              <li>Service: [Location, Date/Time]</li>
              <li>Contacts: [Primary Contact]</li>
              <li>Notes: [Key points]</li>
              <li>Compliance: [Checklist status]</li>
            </ul>
          </div>

          <div className="card panel" style={{ padding: 12 }}>
            <div className="panel-title">Draft Obituary Excerpt</div>
            <p className="helper">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante..."
            </p>
          </div>
        </div>

        <div className="hr" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          I confirm the information is accurate and ready for submission.
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button className="btn ghost" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          <button
            className={`btn ${confirmed ? '' : 'ghost'}`}
            disabled={!confirmed}
            onClick={() => navigate('/success')}
            aria-disabled={!confirmed}
          >
            Confirm and Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalReview;
