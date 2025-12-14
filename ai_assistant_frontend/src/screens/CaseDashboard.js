import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * CaseDashboard
 * Enhances the two-column (70/30) layout with:
 * - Dismissible status banner
 * - Left column tabs (Deceased Information default)
 * - Right column AI Assistance with:
 *   • AI Generated Obituary card: scrollable content area, fixed action buttons (Copy, Edit in Word, Regenerate), "New" badge, helper/disclaimer text
 *   • Action Items card with subtext and optional count badge
 *   • Optional Follow Up Email card with Copy/Edit buttons
 * - Sticky bottom action bar (full-width, fixed bottom) with:
 *   • Left: Start New Case (helper)
 *   • Center: Export Summary (helper)
 *   • Right: Submit Case (primary) with helper and optional confirmation text
 * Behavior:
 * - Buttons below AI content are fixed and do not scroll with the AI content area
 * - On successful submit, navigates to Submission Success and shows success message
 */
function CaseDashboard() {
  // routing for actions
  const navigate = useNavigate();

  // Status banner (dismissible)
  const [showStatus, setShowStatus] = useState(true);

  // Tabs (left column) - default to Deceased Information
  const tabs = useMemo(
    () => ([
      { key: 'deceased', label: 'Deceased Information' },
      { key: 'service', label: 'Service Details' },
      { key: 'family', label: 'Family Contacts' },
      { key: 'notes', label: 'Obituary Notes' },
      { key: 'transcript', label: 'Transcript Viewer' },
    ]),
    []
  );
  const [active, setActive] = useState('deceased');

  // Right column collapsible behavior for narrow viewports
  const [aiOpen, setAiOpen] = useState(true);

  // Local state for AI content
  const [obitDraft, setObitDraft] = useState(
    `Johnathan “John” A. Doe, 78, of Oceanside, passed away peacefully on March 3, 2025.\n\n` +
    `Born on July 12, 1946 in Portland, John dedicated his life to family, service, and community...`
  );
  const [emailDraft, setEmailDraft] = useState(
    `Subject: Thank you for meeting with us\n\nDear [Family Name],\n\nThank you for taking the time to meet today...`
  );

  // Action Items example count (optional badge)
  const [actionItemCount] = useState(3);

  const renderTabContent = () => {
    switch (active) {
      case 'deceased':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Full Name</label>
                <input className="input" placeholder="Enter full legal name" />
              </div>
              <div>
                <label>Preferred Name</label>
                <input className="input" placeholder="Nickname or preferred name" />
              </div>
              <div>
                <label>Date of Birth</label>
                <input className="input" placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <label>Date of Passing</label>
                <input className="input" placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <label>Place of Birth</label>
                <input className="input" placeholder="City, State/Province, Country" />
              </div>
              <div>
                <label>Place of Passing</label>
                <input className="input" placeholder="City, State/Province, Country" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Occupation / Notable Roles</label>
                <input className="input" placeholder="Primary occupation or notable roles" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Key Biographical Highlights</label>
                <textarea className="textarea" rows={4} placeholder="Education, service, achievements, community contributions" />
              </div>
            </div>
          </>
        );
      case 'service':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Service Location</label>
                <input className="input" placeholder="Chapel or venue name" />
              </div>
              <div>
                <label>Service Date & Time</label>
                <input className="input" placeholder="YYYY-MM-DD HH:mm" />
              </div>
              <div>
                <label>Visitation Details</label>
                <input className="input" placeholder="Date, time, and location for visitation" />
              </div>
              <div>
                <label>Officiant</label>
                <input className="input" placeholder="Name and title" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Special Requests</label>
                <textarea className="textarea" rows={3} placeholder="Music, readings, customs, or other preferences" />
              </div>
            </div>
          </>
        );
      case 'family':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Primary Contact Name</label>
                <input className="input" placeholder="Full name of primary contact" />
              </div>
              <div>
                <label>Relationship</label>
                <input className="input" placeholder="Relationship to the deceased" />
              </div>
              <div>
                <label>Phone</label>
                <input className="input" placeholder="(555) 555-5555" />
              </div>
              <div>
                <label>Email</label>
                <input className="input" placeholder="name@example.com" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Additional Contacts</label>
                <textarea className="textarea" rows={3} placeholder="List other contacts and relationships" />
              </div>
            </div>
          </>
        );
      case 'notes':
        return (
          <>
            <div>
              <label>Obituary Notes</label>
              <textarea
                className="textarea"
                rows={8}
                placeholder="Key stories, personal values, legacy themes, and family-provided notes"
              />
            </div>
          </>
        );
      case 'transcript':
        return (
          <>
            <div style={{ marginBottom: 8 }}>
              <div className="panel-title" style={{ marginBottom: 6 }}>Meeting Transcript</div>
              <div className="helper">Review the captured transcript of your arrangement meeting. Use this to verify details before finalizing.</div>
            </div>
            <textarea
              className="textarea"
              rows={12}
              placeholder="Transcript content will appear here for review..."
            />
          </>
        );
      default:
        return null;
    }
  };

  // Actions - these are placeholders for now
  const copyToClipboard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      // no toast system present; silent success
    } catch (e) {
      // ignore in this lightweight demo
    }
  };

  const handleSubmitCase = () => {
    // Simulate successful submit and navigate
    navigate('/success', { replace: true });
  };

  return (
    <div style={{ paddingBottom: 88 /* reserve space for sticky bar */ }}>
      {showStatus && (
        <div
          className="card"
          role="status"
          aria-live="polite"
          style={{
            padding: 12,
            marginBottom: 16,
            background: 'linear-gradient(to right, rgba(30,58,138,0.06), rgba(245,158,11,0.04))',
            borderColor: 'var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>
            Processing complete. Review the extracted information below.
          </div>
          <button
            className="btn ghost"
            onClick={() => setShowStatus(false)}
            style={{ marginLeft: 'auto', padding: '6px 10px' }}
            aria-label="Dismiss status"
            title="Dismiss"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Two-column layout with left priority: 70% / 30% */}
      <div className="grid-2-7030">
        {/* Left Column */}
        <section className="card panel" aria-label="Case Details">
          <div className="panel-title">Case Dashboard</div>
          <div className="tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`tab-btn ${active === t.key ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
                aria-pressed={active === t.key}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="hr" />
          <div style={{ display: 'grid', gap: 12 }}>
            {renderTabContent()}
          </div>
        </section>

        {/* Right Column */}
        <aside aria-label="AI Assistance">
          <div className="card panel ai-assist-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div className="panel-title" style={{ marginBottom: 2 }}>AI Assistance</div>
                <div className="helper">AI-generated content to help you complete this case efficiently.</div>
              </div>
              <button
                className="btn ghost"
                onClick={() => setAiOpen((v) => !v)}
                aria-expanded={aiOpen}
                aria-controls="ai-assist-sections"
                style={{ padding: '6px 10px' }}
              >
                {aiOpen ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>

          <div id="ai-assist-sections" style={{ display: aiOpen ? 'grid' : 'none', gap: 12 }}>
            {/* AI Generated Obituary with scrollable body and fixed actions */}
            <div className="card panel ai-assist-card" id="ai-draft" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                <div className="panel-title" style={{ marginBottom: 0 }}>
                  AI Generated Obituary
                  <span className="badge" style={{
                    marginLeft: 8,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'rgba(5,150,105,0.12)',
                    border: '1px solid rgba(5,150,105,0.35)',
                    color: 'var(--color-success)',
                    fontWeight: 700,
                    fontSize: 12
                  }}>New</span>
                </div>
                <div className="helper" aria-hidden="true" />
              </div>

              {/* Scrollable content area */}
              <div
                role="region"
                aria-label="AI Obituary content"
                className="ai-scroll"
                style={{
                  maxHeight: 180,
                  overflow: 'auto',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: 10,
                  background: '#fff'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{obitDraft}</div>
              </div>

              {/* Fixed action bar below AI content (does not scroll with text) */}
              <div
                className="ai-fixed-actions"
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 6
                }}
              >
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn ghost" onClick={() => copyToClipboard(obitDraft)}>Copy</button>
                  <button
                    className="btn secondary"
                    onClick={() => {/* Placeholder for opening in Word */}}
                    title="Open in Microsoft Word"
                    aria-label="Edit in Word"
                  >
                    Edit in Word
                  </button>
                  <button className="btn ghost" onClick={() => setObitDraft(obitDraft + '\n\n[Regenerated variation…]')}>
                    Regenerate
                  </button>
                </div>
                <div className="helper" style={{ marginLeft: 'auto' }}>
                  AI content is a suggested draft. Please review for accuracy before publishing.
                </div>
              </div>
            </div>

            {/* Action Items with optional count badge */}
            <div className="card panel ai-assist-card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div className="panel-title" style={{ marginBottom: 0 }}>
                  Action Items
                </div>
                {actionItemCount > 0 && (
                  <span className="badge" aria-label={`${actionItemCount} action items`} style={{
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'rgba(30,58,138,0.10)',
                    border: '1px solid rgba(30,58,138,0.25)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: 12
                  }}>
                    {actionItemCount}
                  </span>
                )}
              </div>
              <div className="helper">Tasks identified from your notes and transcript will appear here.</div>
              <ul style={{ margin: '6px 0 0 18px' }}>
                <li>Confirm officiant availability</li>
                <li>Verify spelling of family names</li>
                <li>Obituary photo selection</li>
              </ul>
            </div>

            {/* Optional Follow Up Email card */}
            <div className="card panel ai-assist-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="panel-title" style={{ marginBottom: 0 }}>Follow Up Email (Optional)</div>
              <div
                role="region"
                aria-label="Follow-up email draft"
                style={{
                  maxHeight: 140,
                  overflow: 'auto',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: 10,
                  background: '#fff'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{emailDraft}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button className="btn ghost" onClick={() => copyToClipboard(emailDraft)}>Copy</button>
                <button className="btn ghost" onClick={() => setEmailDraft(emailDraft + '\n\n[Edited…]')}>Edit</button>
              </div>
              <div className="helper">You can copy this email or edit before sending from your email client.</div>
            </div>

            {/* Compliance Checklist */}
            <div className="card panel ai-assist-card" id="compliance">
              <div className="panel-title">Compliance Checklist</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label><input type="checkbox" /> Consent obtained from family</label>
                <label><input type="checkbox" /> Sensitive details reviewed</label>
                <label><input type="checkbox" /> Dates and names verified</label>
                <label><input type="checkbox" /> Internal review completed</label>
              </div>
              <div className="helper" style={{ marginTop: 8 }}>
                Please complete all items prior to final submission.
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky bottom action bar */}
      <div
        role="toolbar"
        aria-label="Case actions"
        style={{
          position: 'fixed',
          left: 280, /* width of sidebar */
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'saturate(120%) blur(2px)',
          borderTop: '1px solid var(--border-color)',
          padding: '10px 16px',
          zIndex: 20
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: 12 }}>
          {/* Left aligned - Start New Case */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn ghost" onClick={() => navigate('/upload')}>Start New Case</button>
            </div>
            <div className="helper">Begin a fresh upload without leaving your current work saved.</div>
          </div>

          {/* Center - Export Summary */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <button className="btn ghost" onClick={() => {/* Placeholder for export summary */}}>Export Summary</button>
            <div className="helper">Download a concise overview for internal review.</div>
          </div>

          {/* Right aligned - Submit Case */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
            <button className="btn" onClick={handleSubmitCase}>Submit Case</button>
            <div className="helper" style={{ textAlign: 'right' }}>
              Submitting sends finalized details to your funeral home system.
              <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Confirmation shown after successful submission.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDashboard;
