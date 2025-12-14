import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcessing } from '../context/ProcessingContext';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * Processing
 * Shows progress steps and automatically routes to /dashboard after simulated completion (2.5s).
 * Sets hasProcessed=true in context when done.
 */
function Processing() {
  const { setHasProcessed } = useProcessing();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const steps = ['Uploading', 'Transcribing', 'Analyzing', 'Preparing Dashboard'];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        current = next;
        if (next >= steps.length) {
          clearInterval(interval);
          setHasProcessed(true);
          // small delay before navigation for UX
          setTimeout(() => navigate('/dashboard'), 400);
        }
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [navigate, setHasProcessed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card panel">
        <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>Processing</h2>
        <p className="helper">We are preparing your case dashboard. This will only take a moment.</p>
        <div className="hr" />
        <ol>
          {steps.map((label, idx) => (
            <li key={label} style={{ margin: '12px 0', listStyle: 'none' }}>
              <div
                className="card"
                style={{
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  borderColor:
                    idx < step ? 'var(--color-success)' : idx === step ? 'var(--color-secondary)' : 'var(--border-color)',
                  background:
                    idx < step
                      ? 'rgba(5,150,105,0.08)'
                      : idx === step
                      ? 'rgba(245,158,11,0.08)'
                      : 'var(--color-surface)',
                }}
              >
                <span
                  className="badge"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background:
                      idx < step ? 'var(--color-success)' : idx === step ? 'var(--color-secondary)' : '#D1D5DB',
                    display: 'inline-block',
                  }}
                />
                <div style={{ fontWeight: 600 }}>{label}</div>
                <div className="helper" style={{ marginLeft: 'auto' }}>
                  {idx < step ? 'Done' : idx === step ? 'In progress...' : 'Pending'}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Processing;
