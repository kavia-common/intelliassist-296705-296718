import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import { ProcessingProvider } from './context/ProcessingContext';
import SidebarLayout from './components/Layout/SidebarLayout';
import UploadRecording from './screens/UploadRecording';
import RecordingProcessing from './screens/RecordingProcessing';
import CaseDashboard from './screens/CaseDashboard';
import FinalReview from './screens/FinalReview';
import SubmissionSuccess from './screens/SubmissionSuccess';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component that configures routing and wraps the application with ProcessingProvider.
 * Routes:
 *  - /upload: Upload Recording screen
 *  - /processing: Processing screen (auto-advances to /dashboard)
 *  - /dashboard: Case Dashboard screen
 *  - /final-review: Final Review screen
 *  - /success: Submission Success screen
 *  - / -> redirects to /upload
 */
function App() {
  return (
    <ProcessingProvider>
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/upload" replace />} />
            <Route path="/upload" element={<UploadRecording />} />
            <Route path="/processing" element={<RecordingProcessing />} />
            <Route path="/dashboard" element={<CaseDashboard />} />
            <Route path="/ai-obituary" element={
              <div style={{ maxWidth: 920, margin: '0 auto' }}>
                <div className="card panel" style={{ marginBottom: 16 }}>
                  <div className="panel-title">Preview: AI Generated Obituary Panel</div>
                  <div className="helper">This route is provided to preview the component outside the full dashboard context.</div>
                </div>
                {/* Reuse the component directly */}
                <div>
                  {/*
                    Import locally to avoid circular imports; Use the same component already included in dashboard.
                  */}
                </div>
              </div>
            } />
            <Route path="/final-review" element={<FinalReview />} />
            <Route path="/success" element={<SubmissionSuccess />} />
            <Route path="*" element={<Navigate to="/upload" replace />} />
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </ProcessingProvider>
  );
}

export default App;
