import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import { theme } from '../styles/theme.tokens.ts';
import { useProcessing } from '../context/ProcessingContext';

/**
 * PUBLIC_INTERFACE
 * RecordingProcessing
 * Implements a seven-state processing flow with an accessible progress list for:
 * - Uploading, Transcribing, Analyzing, Preparing Dashboard
 *
 * UI:
 * - Title: "Processing Your Recording"
 * - File chooser control
 * - Primary action button with behavior:
 *    STATE 1: "Upload and Process" (disabled)
 *    STATE 2: "Upload and Process" (enabled)
 *    STATE 3-6: "Uploading..." or "Processing..." (disabled)
 *    STATE 7: "View Case Dashboard" (enabled) and auto-redirect after short delay
 * - Helper text varies by state (exact strings from spec)
 * - Status labels exactly: 'Not started', 'Ready', 'Pending', 'In progress', 'Done'
 * - Visual style: muted/neutral using theme tokens (no red), greyed inactive rows, subtle dividers
 *
 * Behavior:
 * - Mock-only: simulate state progression with timers on click Upload
 * - No real upload; easy to wire backend later
 */
function RecordingProcessing() {
  const navigate = useNavigate();
  const { setHasProcessed } = useProcessing();

  // States:
  // 1 = default (no file)
  // 2 = file selected (before upload)
  // 3 = after user clicks Upload (Uploading in progress)
  // 4 = upload complete; Transcribing in progress
  // 5 = transcription complete; Analyzing in progress
  // 6 = analysis complete; Preparing in progress
  // 7 = all done; CTA becomes "View Case Dashboard", auto-redirect
  const [state, setState] = useState(1);
  const [file, setFile] = useState(null);

  // Helper text per spec
  const helper = useMemo(() => {
    switch (state) {
      case 1:
        return 'Upload a recording to begin processing.';
      case 2:
        return 'Recording ready for upload.';
      case 3:
        return 'Uploading your recording...';
      case 4:
        return 'Uploading complete. Processing has started.';
      case 5:
        return 'Transcription completed successfully.';
      case 6:
        return 'Extracting case details and preparing dashboard.';
      case 7:
        return 'Processing complete. Redirecting to your Case Dashboard...';
      default:
        return '';
    }
  }, [state]);

  // Progress rows
  const rows = [
    { key: 'upload', label: 'Uploading' },
    { key: 'transcribe', label: 'Transcribing' },
    { key: 'analyze', label: 'Analyzing' },
    { key: 'prepare', label: 'Preparing Dashboard' },
  ];

  // Derive exact status labels per row based on global state
  const getRowStatus = (rowKey) => {
    // STATUS labels must be exactly these strings:
    // 'Not started', 'Ready', 'Pending', 'In progress', 'Done'
    switch (state) {
      case 1:
        return 'Not started';
      case 2:
        if (rowKey === 'upload') return 'Ready';
        return 'Pending';
      case 3:
        if (rowKey === 'upload') return 'In progress';
        return 'Pending';
      case 4:
        if (rowKey === 'upload') return 'Done';
        if (rowKey === 'transcribe') return 'In progress';
        return 'Pending';
      case 5:
        if (rowKey === 'upload') return 'Done';
        if (rowKey === 'transcribe') return 'Done';
        if (rowKey === 'analyze') return 'In progress';
        return 'Pending';
      case 6:
        if (rowKey === 'upload') return 'Done';
        if (rowKey === 'transcribe') return 'Done';
        if (rowKey === 'analyze') return 'Done';
        if (rowKey === 'prepare') return 'In progress';
        return 'Pending';
      case 7:
        return 'Done';
      default:
        return 'Not started';
    }
  };

  // Styling using theme tokens (AI-neutral, Deep Slate Blue for primary button)
  const containerStyle = { maxWidth: 880, margin: '0 auto' };

  const titleStyle = { marginTop: 0, marginBottom: 6, color: theme.colors.primary.brand, fontWeight: 800 };

  const helperStyle = { color: theme.colors.text.secondary, fontSize: 14, marginTop: 0 };

  const cardStyle = {
    background: theme.components.Card.default.bg,
    border: `1px solid ${theme.components.Card.default.border}`,
    borderRadius: 12,
    boxShadow: 'var(--shadow-sm)',
    padding: 16,
  };

  const listRowStyleBase = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 10,
    border: `1px solid ${theme.colors.border.divider}`,
    background: '#fff',
  };

  const getRowVisual = (status) => {
    const mutedBg = '#FFFFFF';
    const activeTint = 'rgba(47,62,92,0.06)'; // subtle Deep Slate Blue tint
    const doneTint = 'rgba(46,125,50,0.08)'; // gentle success tint
    const border = theme.colors.border.divider;

    if (status === 'In progress') {
      return { background: activeTint, borderColor: 'rgba(47,62,92,0.28)' };
    }
    if (status === 'Done') {
      return { background: doneTint, borderColor: 'rgba(46,125,50,0.32)' };
    }
    return { background: mutedBg, borderColor: border };
  };

  const dot = (status) => {
    const base = {
      width: 10,
      height: 10,
      borderRadius: '50%',
      display: 'inline-block',
    };
    if (status === 'Done') {
      return { ...base, background: theme.colors.success };
    }
    if (status === 'In progress') {
      return { ...base, background: theme.colors.primary.brand };
    }
    if (status === 'Ready') {
      return { ...base, background: 'rgba(47,62,92,0.6)' };
    }
    if (status === 'Pending') {
      return { ...base, background: '#C7CDD6' };
    }
    // Not started
    return { ...base, background: '#DDE2EA' };
  };

  const primaryBtnStyle = {
    background: theme.components.Button.primary.bg,
    color: theme.components.Button.primary.text,
    border: '1px solid transparent',
    borderRadius: 8,
    padding: '10px 16px',
    fontWeight: 700,
    cursor: 'pointer',
    opacity: 1,
  };

  const primaryBtnDisabledStyle = {
    ...primaryBtnStyle,
    background: 'rgba(47,62,92,0.35)',
    cursor: 'not-allowed',
    opacity: 0.8,
  };

  const neutralBtnStyle = {
    background: theme.components.Button.neutral.bg,
    color: theme.components.Button.neutral.text,
    border: `1px solid ${theme.components.Button.neutral.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  };

  const fileInputRef = useRef(null);

  const onChooseFile = () => fileInputRef.current?.click();

  const onFileSelected = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      setState(2); // STATE 2: file selected before upload
    } else {
      setState(1); // back to default
    }
  };

  // Simulate progression after clicking Upload
  const timers = useRef({ t1: null, t2: null, t3: null, t4: null });

  const clearTimers = () => {
    Object.values(timers.current).forEach((t) => {
      if (t) clearTimeout(t);
    });
    timers.current = { t1: null, t2: null, t3: null, t4: null };
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const startMockProcessing = () => {
    clearTimers();
    setState(3); // STATE 3: Uploading in progress
    // Minimal loader times, easy to adjust or wire into real API later
    timers.current.t1 = setTimeout(() => {
      setState(4); // upload complete; transcribing in progress
      timers.current.t2 = setTimeout(() => {
        setState(5); // transcription done; analyzing in progress
        timers.current.t3 = setTimeout(() => {
          setState(6); // analysis done; preparing in progress
          timers.current.t4 = setTimeout(() => {
            setState(7); // all done
            setHasProcessed(true);
          }, 900);
        }, 1000);
      }, 1100);
    }, 900);
  };

  // Auto-redirect to Case Dashboard after a short delay when complete
  useEffect(() => {
    if (state === 7) {
      const to = setTimeout(() => {
        navigate('/dashboard');
      }, 900);
      return () => clearTimeout(to);
    }
    return undefined;
  }, [state, navigate]);

  const renderStatusRight = (status) => {
    // Show animated loader icon when "In progress"
    if (status === 'In progress') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: theme.colors.text.secondary }}>
          <span
            aria-hidden="true"
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid rgba(47,62,92,0.25)',
              borderTopColor: theme.colors.primary.brand,
              display: 'inline-block',
              animation: 'spin 1s linear infinite',
            }}
          />
          {status}
        </span>
      );
    }
    return <span className="helper" style={{ color: theme.colors.text.secondary }}>{status}</span>;
  };

  const primaryCtaLabel = useMemo(() => {
    if (state === 7) return 'View Case Dashboard';
    if (state === 3) return 'Uploading...';
    if (state >= 4 && state <= 6) return 'Processing...';
    return 'Upload and Process';
  }, [state]);

  const primaryEnabled = useMemo(() => {
    if (state === 1) return false;
    if (state === 2) return true;
    if (state === 7) return true;
    return false;
  }, [state]);

  const onPrimary = () => {
    if (state === 2) {
      startMockProcessing();
    } else if (state === 7) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={containerStyle}>
      <div className="card" style={{ ...cardStyle, padding: 20 }}>
        <h2 style={titleStyle}>Processing Your Recording</h2>
        <p className="helper" style={helperStyle}>{helper}</p>

        <div className="hr" />

        {/* File chooser and actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" style={neutralBtnStyle} onClick={onChooseFile} aria-label="Choose file">
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a"
            onChange={onFileSelected}
            aria-label="File input"
            style={{ display: 'none' }}
          />
          <div className="helper" style={{ minHeight: 20 }}>
            {file ? `Selected: ${file.name}` : 'No file selected'}
          </div>

          <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8 }}>
            <button
              type="button"
              onClick={onPrimary}
              disabled={!primaryEnabled}
              aria-disabled={!primaryEnabled}
              aria-label={primaryCtaLabel}
              style={primaryEnabled ? primaryBtnStyle : primaryBtnDisabledStyle}
            >
              {primaryCtaLabel}
            </button>
          </div>
        </div>

        <div className="hr" />

        {/* Progress list */}
        <ol style={{ padding: 0, margin: 0, display: 'grid', gap: 10 }}>
          {rows.map((r) => {
            const status = getRowStatus(r.key);
            const visual = getRowVisual(status);
            const inactive = ['Not started', 'Pending'].includes(status);
            return (
              <li key={r.key} style={{ listStyle: 'none' }}>
                <div
                  className="card"
                  style={{
                    ...listRowStyleBase,
                    background: visual.background,
                    borderColor: visual.borderColor,
                    opacity: inactive ? 0.9 : 1,
                  }}
                  aria-live="polite"
                >
                  <span style={dot(status)} aria-hidden="true" />
                  <div style={{ fontWeight: 700, color: theme.colors.text.neutral }}>{r.label}</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {renderStatusRight(status)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Minimal loader keyframes */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default RecordingProcessing;
