import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * UploadRecording
 * Provides a drag-and-drop area and controls to upload a recording and begin processing.
 * On clicking "Upload and Process", navigates to /processing.
 */
function UploadRecording() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');

  const onDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setDragOver(false);
    if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) {
      const file = ev.dataTransfer.files[0];
      setFileName(file.name);
    }
  };

  const onSelect = (ev) => {
    const file = ev.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }} className="header-actions">
        <button className="btn ghost">Help</button>
        <button className="btn ghost">Settings</button>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0, marginBottom: 6, color: 'var(--color-primary)' }}>Upload Recording</h2>
        <p className="helper" style={{ marginTop: 0 }}>
          Drag and drop an audio file or select from your computer. Supported: MP3, WAV, M4A.
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          aria-label="Upload area"
          className="card"
          style={{
            padding: 24,
            textAlign: 'center',
            marginTop: 16,
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: dragOver ? 'var(--color-primary)' : 'var(--border-color)',
            background: dragOver ? 'rgba(30,58,138,0.04)' : 'var(--color-surface)',
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            {fileName ? `Selected: ${fileName}` : 'Drop file here or click to browse'}
          </div>
          <div className="helper">Max file size 200MB</div>
          <input
            type="file"
            accept=".mp3,.wav,.m4a"
            onChange={onSelect}
            style={{ marginTop: 12 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div className="helper">Your file will be securely processed. You can review and edit details afterward.</div>
          <button
            className="btn"
            onClick={() => navigate('/processing')}
            aria-label="Upload and Process"
          >
            Upload and Process
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadRecording;
