import React, { useState } from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * CaseDashboard
 * Two-column layout:
 * - Left: dashboard tabs as local sections with simple form placeholders.
 * - Right: AI Generated Obituary Draft panel with Copy/Edit/Regenerate buttons and a Compliance Checklist panel.
 */
function CaseDashboard() {
  const tabs = [
    { key: 'deceased', label: 'Deceased Information' },
    { key: 'service', label: 'Service Details' },
    { key: 'family', label: 'Family Contacts' },
    { key: 'notes', label: 'Obituary Notes' },
    { key: 'draft', label: 'Draft Obituary' },
    { key: 'actions', label: 'Action Items' },
    { key: 'followup', label: 'Follow Up Email' },
    { key: 'transcript', label: 'Transcript Viewer' },
  ];
  const [active, setActive] = useState('deceased');

  const renderTabContent = () => {
    switch (active) {
      case 'deceased':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>First Name</label>
                <input className="input" placeholder="John" />
              </div>
              <div>
                <label>Last Name</label>
                <input className="input" placeholder="Doe" />
              </div>
              <div>
                <label>Date of Birth</label>
                <input className="input" placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <label>Date of Passing</label>
                <input className="input" placeholder="YYYY-MM-DD" />
              </div>
            </div>
          </>
        );
      case 'service':
        return (
          <>
            <div>
              <label>Service Location</label>
              <input className="input" placeholder="Chapel name" />
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Service Date & Time</label>
              <input className="input" placeholder="YYYY-MM-DD HH:mm" />
            </div>
          </>
        );
      case 'family':
        return (
          <>
            <div>
              <label>Primary Contact</label>
              <input className="input" placeholder="Jane Doe" />
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Phone</label>
              <input className="input" placeholder="(555) 555-5555" />
            </div>
          </>
        );
      case 'notes':
        return (
          <>
            <label>Obituary Notes</label>
            <textarea className="textarea" rows={6} placeholder="Key highlights, life story, values..." />
          </>
        );
      case 'draft':
        return (
          <>
            <label>Draft Obituary</label>
            <textarea className="textarea" rows={10} placeholder="AI-generated draft will appear here..." />
          </>
        );
      case 'actions':
        return (
          <>
            <label>Action Items</label>
            <textarea className="textarea" rows={6} placeholder="Follow-ups and tasks..." />
          </>
        );
      case 'followup':
        return (
          <>
            <label>Follow Up Email</label>
            <textarea className="textarea" rows={6} placeholder="Email draft..." />
          </>
        );
      case 'transcript':
        return (
          <>
            <label>Transcript Viewer</label>
            <textarea className="textarea" rows={10} placeholder="Transcript content..." />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid-2">
      <div className="card panel">
        <div className="panel-title">Case Dashboard</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {tabs.map(t => (
            <button
              key={t.key}
              className={`btn ghost ${active === t.key ? 'active' : ''}`}
              onClick={() => setActive(t.key)}
              aria-pressed={active === t.key}
              style={{
                borderColor: active === t.key ? 'var(--color-primary)' : 'var(--border-color)',
                background: active === t.key ? 'rgba(30,58,138,0.08)' : 'transparent',
                color: active === t.key ? 'var(--color-primary)' : 'inherit'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="hr" />
        <div style={{ display: 'grid', gap: 12 }}>
          {renderTabContent()}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        <div className="card panel" id="ai-draft">
          <div className="panel-title">AI Generated Obituary Draft</div>
          <div className="helper" style={{ marginBottom: 8 }}>
            This draft is generated from the uploaded transcript and can be edited before final submission.
          </div>
          <textarea
            className="textarea"
            rows={12}
            defaultValue={`[Sample Draft]\n\n[Name] was a beloved member of the community...`}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn ghost">Copy</button>
            <button className="btn ghost">Edit</button>
            <button className="btn secondary">Regenerate</button>
          </div>
        </div>

        <div className="card panel" id="compliance">
          <div className="panel-title">Compliance Checklist</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <label><input type="checkbox" /> Consent obtained from family</label>
            <label><input type="checkbox" /> Sensitive details reviewed</label>
            <label><input type="checkbox" /> Dates and names verified</label>
            <label><input type="checkbox" /> Internal review completed</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDashboard;
