import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/theme.css';
import { useProcessing } from '../../context/ProcessingContext';

/**
 * PUBLIC_INTERFACE
 * SidebarLayout
 * Layout component that renders a persistent sidebar titled "Arrangement Assistant"
 * with Primary Navigation, Dashboard Tabs (visible after processing), and Compliance section.
 * Wraps main content in a two-column app shell.
 */
function SidebarLayout({ children }) {
  const { hasProcessed } = useProcessing();
  const location = useLocation();

  const primaryNav = [
    { path: '/upload', label: 'Upload Recording' },
    { path: '/processing', label: 'Processing' },
    { path: '/dashboard', label: 'Case Dashboard' },
    { path: '/final-review', label: 'Final Review' },
    { path: '/success', label: 'Submission Success' },
  ];

  const dashboardTabs = [
    'Deceased Information',
    'Service Details',
    'Family Contacts',
    'Obituary Notes',
    'Draft Obituary',
    'Action Items',
    'Follow Up Email',
    'Transcript Viewer',
  ];

  const isActive = (to) => {
    if (to === '/success') {
      return location.pathname === '/success';
    }
    return location.pathname.startsWith(to);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Arrangement Assistant</div>

        <div className="nav-section">
          <div className="section-title">Primary Navigation</div>
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: act }) => `nav-link ${act || isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {hasProcessed && (
          <div className="nav-section">
            <div className="section-title">Dashboard Tabs</div>
            {dashboardTabs.map((tab) => (
              <div className="nav-link" key={tab} role="link" aria-disabled="true" title="Placeholder">
                {tab}
              </div>
            ))}
          </div>
        )}

        <div className="nav-section" style={{ marginTop: 'auto' }}>
          <div className="section-title">Compliance</div>
          <NavLink to="/dashboard#compliance" className={({ isActive: act }) => `nav-link ${act ? 'active' : ''}`}>
            Compliance Checklist
          </NavLink>
        </div>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
