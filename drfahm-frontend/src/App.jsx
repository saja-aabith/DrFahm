import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import global styles
import './styles/variables.css';
import './styles/components.css';

// Marketing Pages
import HomePage from './components/HomePage';
import StartPage from './components/StartPage';
import HowItWorksPage from './components/HowItWorksPage';
import QuduratPage from './components/QuduratPage';
import TahsiliPage from './components/TahsiliPage';
import NAFSPage from './components/NAFSPage';
import SchoolsPage from './components/SchoolsPage';
import PricingPage from './components/PricingPage';
import FAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import StudentPage from './components/StudentPage';
import ParentPage from './components/ParentPage';

// Application Pages
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Application Pages (to be created)
// import Dashboard from './components/Dashboard';
// import DiagnosticPage from './components/DiagnosticPage';
// import PracticePage from './components/PracticePage';
// import ProgressPage from './components/ProgressPage';
// import SettingsPage from './components/SettingsPage';

// 404 Not Found Component
function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy-950)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: 'var(--font-weight-black)',
          marginBottom: '16px',
          color: 'var(--accent-primary)'
        }}>
          404
        </h1>
        <p style={{ 
          fontSize: '24px',
          marginBottom: '32px',
          color: 'var(--text-secondary)'
        }}>
          Page not found
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--accent-primary)',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            transition: 'var(--transition)'
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

// Temporary placeholder for application pages that haven't been created yet
function ComingSoon({ pageName }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy-950)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'var(--font-weight-black)',
          marginBottom: '16px'
        }}>
          {pageName}
        </h1>
        <p style={{ 
          fontSize: '18px',
          marginBottom: '32px',
          color: 'var(--text-secondary)'
        }}>
          This page is currently under development.
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--accent-primary)',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            transition: 'var(--transition)'
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Marketing Pages - Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          
          {/* Exam-Specific Pages */}
          <Route path="/qudurat" element={<QuduratPage />} />
          <Route path="/tahsili" element={<TahsiliPage />} />
          <Route path="/nafs" element={<NAFSPage />} />
          
          {/* Information Pages */}
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Application Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Application Pages - To Be Implemented */}
          <Route path="/dashboard" element={<ComingSoon pageName="Dashboard" />} />
          <Route path="/diagnostic" element={<ComingSoon pageName="Diagnostic Assessment" />} />
          <Route path="/practice" element={<ComingSoon pageName="Practice" />} />
          <Route path="/progress" element={<ComingSoon pageName="Progress" />} />
          <Route path="/settings" element={<ComingSoon pageName="Settings" />} />

          {/* Legacy route - redirect from old name */}
          <Route path="/nqtexcel" element={<Navigate to="/" replace />} />

          {/* 404 - Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;