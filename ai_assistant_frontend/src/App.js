import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import { ProcessingProvider } from './context/ProcessingContext';
import SidebarLayout from './components/Layout/SidebarLayout';
import UploadRecording from './screens/UploadRecording';
import Processing from './screens/Processing';
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
            <Route path="/processing" element={<Processing />} />
            <Route path="/dashboard" element={<CaseDashboard />} />
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
