import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import { theme } from '../styles/theme.tokens.ts';
import ObituaryPanel from '../components/AIPanel/ObituaryPanel';

/**
 * PUBLIC_INTERFACE
 * CaseDashboard
 * Renders a single scrollable Case Review page with vertically stacked sections and
 * a sticky right-side AI Generated Obituary panel.
 * Sections:
 *  1) Deceased Information (two-column form)
 *  2) Service Details
 *  3) Family Contacts (repeatable mock contact cards with Primary checkbox)
 *  4) Obituary Notes (multiline)
 *  5) AI Generated Obituary panel (sticky on the right, mock-safe)
 *  6) Action Items (editable checkbox list)
 *  7) Follow Up Email (editable body with Copy and Send Preview buttons - mock only)
 *  8) Transcript Viewer (read-only scrollable panel)
 * Removes tab UI and updates layout to single page review flow.
 */
function CaseDashboard() {
  const navigate = useNavigate();

  // Read-only derived from history state
  const readOnly = !!(window.history.state && window.history.state.usr && window.history.state.usr.readOnly);

  // Local editable states (mock-safe, no real data)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alex Johnson', relationship: 'Child', phone: '(555) 123-4567', email: 'alex@example.com', primary: true },
    { id: 2, name: 'Riley Carter', relationship: 'Sibling', phone: '(555) 987-6543', email: 'riley@example.com', primary: false },
  ]);
  const [notes, setNotes] = useState('');
  const [actionItems, setActionItems] = useState([
    { id: 'ai1', label: 'Confirm officiant availability', done: false },
    { id: 'ai2', label: 'Verify spelling of family names', done: true },
    { id: 'ai3', label: 'Select obituary photo', done: false },
  ]);
  const [followUpEmail, setFollowUpEmail] = useState(
    'Subject: Thank you for meeting with us\n\nDear [Family Name],\n\nThank you for taking the time to meet today. We are preparing a summary of the details discussed and will follow up shortly with next steps.\n\nWith care,\n[Your Funeral Home]'
  );

  const addContact = () => {
    if (readOnly) return;
    const nextId = Math.max(0, ...contacts.map(c => c.id)) + 1;
    setContacts([
      ...contacts,
      { id: nextId, name: '', relationship: '', phone: '', email: '', primary: false },
    ]);
  };

  const updateContact = (id, field, value) => {
    if (readOnly) return;
    setContacts((prev) => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const setPrimaryContact = (id) => {
    if (readOnly) return;
    setContacts((prev) => prev.map(c => ({ ...c, primary: c.id === id })));
  };

  const removeContact = (id) => {
    if (readOnly) return;
    setContacts((prev) => prev.filter(c => c.id !== id));
  };

  const toggleActionItem = (id) => {
    if (readOnly) return;
    setActionItems((prev) => prev.map(it => (it.id === id ? { ...it, done: !it.done } : it)));
  };

  const copyToClipboard = (text) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      // silent in this demo
    }
  };

  const handleSubmitCase = () => {
    // Mock submit -> success
    navigate('/success', { replace: true });
  };

  const sectionCardStyle = {
    background: theme.components.Card.default.bg,
    border: `1px solid ${theme.components.Card.default.border}`,
    borderRadius: 12,
    padding: 16,
  };

  const sectionTitle = (title, desc) => (
    <div style={{ marginBottom: 10 }}>
      <div className="panel-title" style={{ marginBottom: 4 }}>{title}</div>
      {desc && <div className="helper">{desc}</div>}
    </div>
  );

  const rightColStyle = {
    position: 'sticky',
    top: 16,
    display: 'grid',
    gap: 12,
  };

  // Editable placeholders for top-of-page deceased info/service (left side form)
  const [deceased, setDeceased] = useState({
    fullName: '',
    preferred: '',
    dob: '',
    dop: '',
    pob: '',
    pop: '',
    occupation: '',
    highlights: '',
  });
  const updateDeceased = (field, value) => {
    if (readOnly) return;
    setDeceased((d) => ({ ...d, [field]: value }));
  };

  const [service, setService] = useState({
    location: '',
    datetime: '',
    visitation: '',
    officiant: '',
    special: '',
  });
  const updateService = (field, value) => {
    if (readOnly) return;
    setService((s) => ({ ...s, [field]: value }));
  };

  // Transcript placeholder content (read-only)
  const transcriptText = useMemo(
    () =>
      [
        '[00:00] Director: Thank you for meeting with us today. We will walk through details to help plan the service.',
        '[00:32] Family: We want a simple service at the chapel, likely this Saturday late morning.',
        '[01:15] Director: We can arrange that. Do you have a preferred officiant or clergy?',
        '[01:30] Family: Yes, Pastor Lee if available.',
        '[02:05] Director: Noted. We will confirm availability and follow up by email.',
      ].join('\n'),
    []
  );

  return (
    <div style={{ paddingBottom: 88 }}>
      <div className="grid-2-7030" style={{ alignItems: 'start' }}>
        {/* Left: Scrollable stacked sections */}
        <div style={{ display: 'grid', gap: 16 }}>
          <section className="card panel" style={sectionCardStyle} aria-label="Deceased Information">
            {sectionTitle('Deceased Information', 'Please review and edit as needed.')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Full Name</label>
                <input className="input" placeholder="Enter full legal name" disabled={readOnly}
                  value={deceased.fullName} onChange={(e) => updateDeceased('fullName', e.target.value)} />
              </div>
              <div>
                <label>Preferred Name</label>
                <input className="input" placeholder="Nickname or preferred name" disabled={readOnly}
                  value={deceased.preferred} onChange={(e) => updateDeceased('preferred', e.target.value)} />
              </div>
              <div>
                <label>Date of Birth</label>
                <input className="input" placeholder="YYYY-MM-DD" disabled={readOnly}
                  value={deceased.dob} onChange={(e) => updateDeceased('dob', e.target.value)} />
              </div>
              <div>
                <label>Date of Passing</label>
                <input className="input" placeholder="YYYY-MM-DD" disabled={readOnly}
                  value={deceased.dop} onChange={(e) => updateDeceased('dop', e.target.value)} />
              </div>
              <div>
                <label>Place of Birth</label>
                <input className="input" placeholder="City, State/Province, Country" disabled={readOnly}
                  value={deceased.pob} onChange={(e) => updateDeceased('pob', e.target.value)} />
              </div>
              <div>
                <label>Place of Passing</label>
                <input className="input" placeholder="City, State/Province, Country" disabled={readOnly}
                  value={deceased.pop} onChange={(e) => updateDeceased('pop', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Occupation / Notable Roles</label>
                <input className="input" placeholder="Primary occupation or notable roles" disabled={readOnly}
                  value={deceased.occupation} onChange={(e) => updateDeceased('occupation', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Key Biographical Highlights</label>
                <textarea className="textarea" rows={4} placeholder="Education, service, achievements, community contributions" disabled={readOnly}
                  value={deceased.highlights} onChange={(e) => updateDeceased('highlights', e.target.value)} />
              </div>
            </div>
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Service Details">
            {sectionTitle('Service Details', 'Service timing and preferences.')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Service Location</label>
                <input className="input" placeholder="Chapel or venue name" disabled={readOnly}
                  value={service.location} onChange={(e) => updateService('location', e.target.value)} />
              </div>
              <div>
                <label>Service Date & Time</label>
                <input className="input" placeholder="YYYY-MM-DD HH:mm" disabled={readOnly}
                  value={service.datetime} onChange={(e) => updateService('datetime', e.target.value)} />
              </div>
              <div>
                <label>Visitation Details</label>
                <input className="input" placeholder="Date, time, and location for visitation" disabled={readOnly}
                  value={service.visitation} onChange={(e) => updateService('visitation', e.target.value)} />
              </div>
              <div>
                <label>Officiant</label>
                <input className="input" placeholder="Name and title" disabled={readOnly}
                  value={service.officiant} onChange={(e) => updateService('officiant', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Special Requests</label>
                <textarea className="textarea" rows={3} placeholder="Music, readings, customs, or other preferences" disabled={readOnly}
                  value={service.special} onChange={(e) => updateService('special', e.target.value)} />
              </div>
            </div>
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Family Contacts">
            {sectionTitle('Family Contacts', 'Add or edit family contacts. Mark one as Primary Contact.')}
            <div style={{ display: 'grid', gap: 12 }}>
              {contacts.map((c) => (
                <div key={c.id} className="card" style={{ padding: 12, borderRadius: 10, border: `1px solid ${theme.colors.border.divider}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={c.primary}
                      onChange={() => setPrimaryContact(c.id)}
                      disabled={readOnly}
                      aria-label="Primary Contact"
                    />
                    <div className="helper">Primary Contact</div>
                    {!readOnly && (
                      <button className="btn ghost" style={{ marginLeft: 'auto', padding: '6px 10px' }} onClick={() => removeContact(c.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label>Name</label>
                      <input className="input" placeholder="Full name" disabled={readOnly}
                        value={c.name} onChange={(e) => updateContact(c.id, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label>Relationship</label>
                      <input className="input" placeholder="Relationship to the deceased" disabled={readOnly}
                        value={c.relationship} onChange={(e) => updateContact(c.id, 'relationship', e.target.value)} />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input className="input" placeholder="(555) 555-5555" disabled={readOnly}
                        value={c.phone} onChange={(e) => updateContact(c.id, 'phone', e.target.value)} />
                    </div>
                    <div>
                      <label>Email</label>
                      <input className="input" placeholder="name@example.com" disabled={readOnly}
                        value={c.email} onChange={(e) => updateContact(c.id, 'email', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              {!readOnly && (
                <div>
                  <button className="btn ghost" onClick={addContact}>Add Contact</button>
                </div>
              )}
            </div>
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Obituary Notes">
            {sectionTitle('Obituary Notes', 'Key stories and themes for drafting the obituary.')}
            <textarea
              className="textarea"
              rows={8}
              placeholder="Add notes to guide the obituary (e.g., personal values, legacy themes, specific anecdotes)."
              disabled={readOnly}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Action Items">
            {sectionTitle('Action Items', 'Checklist of items to complete.')}
            <div style={{ display: 'grid', gap: 8 }}>
              {actionItems.map((item) => (
                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleActionItem(item.id)}
                    disabled={readOnly}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Follow Up Email">
            {sectionTitle('Follow Up Email', 'Edit the email body and copy or preview (mock only).')}
            <div style={{ display: 'grid', gap: 8 }}>
              <textarea
                className="textarea"
                rows={8}
                placeholder="Draft email body..."
                disabled={readOnly}
                value={followUpEmail}
                onChange={(e) => setFollowUpEmail(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button className="btn ghost" onClick={() => copyToClipboard(followUpEmail)} disabled={readOnly} aria-disabled={readOnly}>Copy</button>
                <button className="btn ghost" onClick={() => { /* mock preview only */ }} disabled={readOnly} aria-disabled={readOnly}>Send Preview</button>
              </div>
            </div>
          </section>

          <section className="card panel" style={sectionCardStyle} aria-label="Transcript Viewer">
            {sectionTitle('Transcript Viewer', 'Read-only transcript for reference.')}
            <div
              role="region"
              aria-label="Transcript content"
              style={{
                maxHeight: 220,
                overflow: 'auto',
                border: `1px solid ${theme.colors.border.divider}`,
                borderRadius: 8,
                padding: 12,
                background: '#fff',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                color: theme.colors.text.neutral,
              }}
            >
              {transcriptText}
            </div>
          </section>
        </div>

        {/* Right: Sticky AI Generated Obituary Panel */}
        <aside style={rightColStyle} aria-label="AI Generated Obituary">
          <ObituaryPanel />
        </aside>
      </div>

      {/* Sticky bottom action bar */}
      {!readOnly && (
        <div
          role="toolbar"
          aria-label="Case actions"
          style={{
            position: 'fixed',
            left: 280,
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button className="btn ghost" onClick={() => navigate('/upload')}>Start New Case</button>
              <div className="helper">Begin a fresh upload. Current review remains saved for demo.</div>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <button className="btn ghost" onClick={() => { /* mock export */ }}>Export Summary</button>
              <div className="helper">Download a neutral summary (mock).</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
              <button className="btn" onClick={handleSubmitCase}>Submit Case</button>
              <div className="helper" style={{ textAlign: 'right' }}>
                Sends finalized details (demo). Confirmation follows.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseDashboard;
