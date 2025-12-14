import React, { useMemo, useState } from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * CaseDashboard
 * Implements the two-column (70/30) layout with:
 * - Top neutral, dismissible status banner
 * - Left column: horizontal tabs (default "Deceased Information") with specified fields/placeholders
 * - Right column: "AI Assistance" with compact, neutral cards and collapsible behavior on narrow viewports
 * The visual priority favors the left column.
 */
function CaseDashboard() {
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

  return (
    <div>
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
            {/* Obituary Draft */}
            <div className="card panel ai-assist-card" id="ai-draft">
              <div className="panel-title">AI Assisted Obituary Draft</div>
              <textarea
                className="textarea"
                rows={8}
                placeholder="AI-generated obituary draft will appear here..."
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button className="btn ghost">Copy Draft</button>
                <button className="btn ghost">Edit Draft</button>
                <button className="btn ghost">Regenerate Draft</button>
              </div>
            </div>

            {/* Action Items */}
            <div className="card panel ai-assist-card">
              <div className="panel-title">Action Items</div>
              <div className="helper">No action items yet. As details are confirmed, tasks will appear here.</div>
            </div>

            {/* Follow Up Email */}
            <div className="card panel ai-assist-card">
              <div className="panel-title">Follow Up Email Draft</div>
              <textarea
                className="textarea"
                rows={6}
                placeholder="Suggested follow-up email draft will appear here..."
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button className="btn ghost">Copy Email</button>
                <button className="btn ghost">Edit Email</button>
              </div>
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
    </div>
  );
}

export default CaseDashboard;
