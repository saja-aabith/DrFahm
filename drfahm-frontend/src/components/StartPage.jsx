import React from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function StartPage() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="marketing-page">
      {/* Navigation */}
      <nav className="nav-institutional">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <h1>Dr Fahm</h1>
            <span className="nav-subtitle">The Blueprint for 100%</span>
          </div>
          
          <div className="nav-actions">
            <button onClick={() => navigate('/schools')} className="btn-nav-secondary">
              For Schools
            </button>
            <button onClick={() => navigate('/login')} className="btn-nav-primary">
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Permission to Start */}
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="content-container-narrow">
          <h1 className="page-title">
            Start with clarity, not guesswork.
          </h1>
          
          <p className="page-subtitle">
            In 10 minutes, see where readiness actually stands for Qudurat, Tahsili, or NAFS.
          </p>

          <p className="page-body">
            Dr Fahm begins with a private diagnostic. No rankings. No pressure. Just clarity.
          </p>

          <div className="hero-ctas">
            <button 
              onClick={() => navigate('/diagnostic')} 
              className="btn-cta-primary"
            >
              <span>Start Diagnostic</span>
              <span className="btn-microcopy">No payment details required</span>
            </button>

            <button 
              onClick={() => navigate('/how-it-works')} 
              className="btn-cta-secondary-text"
            >
              How it works →
            </button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Who this is for
          </h2>

          <div className="two-col-grid">
            <div className="feature-block">
              <div style={{ fontSize: '44px', marginBottom: '20px' }}>👨‍👩‍👧‍👦</div>
              <h3>Parents</h3>
              <p>Early clarity without stress or guesswork.</p>
              <p style={{ marginTop: '12px', fontSize: '15px', color: 'var(--text-tertiary)' }}>
                Stop wondering. Start knowing. Understand readiness before decisions become urgent.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ fontSize: '44px', marginBottom: '20px' }}>🎓</div>
              <h3>Students</h3>
              <p>Private insight into what actually matters.</p>
              <p style={{ marginTop: '12px', fontSize: '15px', color: 'var(--text-tertiary)' }}>
                No comparisons. No public scores. Just honest feedback on where you stand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens in the First 10 Minutes */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What happens in the first 10 minutes
          </h2>

          <div className="steps-vertical">
            <div className="step-simple">
              <div className="step-number-small">1</div>
              <div className="step-content">
                <h3>Answer a short diagnostic</h3>
                <p>
                  A focused assessment designed to reveal patterns, not just right or wrong answers.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">2</div>
              <div className="step-content">
                <h3>See a readiness signal</h3>
                <p>
                  Understand where you stand now — not compared to others, but against the assessment itself.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">3</div>
              <div className="step-content">
                <h3>Understand next steps</h3>
                <p>
                  Receive a personalised pathway forward, focused only on what will improve readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="reassurance-text">
            You can stop at any time. No pressure. No obligation.
          </div>
        </div>
      </section>

      {/* What You Will and Will Not See */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What you will and will not see
          </h2>

          <div className="two-col-contrast">
            <div className="contrast-col positive">
              <h3>You will see:</h3>
              <ul className="check-list">
                <li>Readiness indicators aligned to assessments</li>
                <li>Specific strengths and areas for improvement</li>
                <li>Clear gaps in understanding or accuracy</li>
                <li>A personalised pathway forward</li>
                <li>Time-management insights</li>
              </ul>
            </div>

            <div className="contrast-col negative">
              <h3>You will not see:</h3>
              <ul className="x-list">
                <li>Rankings or leaderboards</li>
                <li>Comparisons with other students</li>
                <li>Public scores</li>
                <li>Pressure to perform immediately</li>
                <li>Generic advice</li>
              </ul>
            </div>
          </div>

          <p className="section-body" style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            fontSize: '18px',
            color: 'var(--text-secondary)'
          }}>
            Progress is measured against readiness, not against others.
          </p>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow text-content" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            This is a diagnostic, not a test.
          </h2>
          
          <p className="section-body" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
            Most students avoid diagnostics because clarity feels exposing. That's understandable. 
            It's also the risk.
          </p>

          <p className="section-body" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
            Uncertainty rarely disappears on its own. Dr Fahm gives clarity early, privately, 
            and constructively — so preparation becomes intentional, not reactive.
          </p>
        </div>
      </section>

      {/* Why Start Now */}
      <section className="content-section">
        <div className="content-container-narrow text-content">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Why start now?
          </h2>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <p className="section-body">
              <strong style={{ color: 'var(--text-primary)' }}>For students:</strong> The earlier you understand where readiness stands, the less time and confidence 
              you lose on practice that doesn't address the actual gaps.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px'
          }}>
            <p className="section-body">
              <strong style={{ color: 'var(--text-primary)' }}>For parents:</strong> Delaying clarity rarely reduces stress. It compounds it. Starting early 
              keeps options open and reduces last-minute escalation.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="content-container-narrow">
          <h2 className="cta-title">
            Clarity earlier. Fewer compromises later.
          </h2>
          
          <p className="cta-body">
            Start with a diagnostic assessment and understand readiness before decisions become urgent.
          </p>

          <button 
            onClick={() => navigate('/diagnostic')} 
            className="btn-final-large"
          >
            <span>Start Diagnostic</span>
            <span className="btn-microcopy-inline">10 minutes · No payment required</span>
          </button>

          <div style={{ marginTop: '24px' }}>
            <button 
              onClick={() => navigate('/how-it-works')} 
              className="btn-cta-secondary-text"
            >
              How it works →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-institutional">
        <div className="footer-container">
          <div className="footer-simple">
            <div className="footer-brand">
              <h3>Dr Fahm</h3>
              <p>National Assessment & Readiness Platform</p>
            </div>

            <nav className="footer-links-inline">
              <a href="#qudurat" onClick={() => navigate('/qudurat')}>Qudurat</a>
              <a href="#tahsili" onClick={() => navigate('/tahsili')}>Tahsili</a>
              <a href="#nafs" onClick={() => navigate('/nafs')}>NAFS</a>
              <a href="#schools" onClick={() => navigate('/schools')}>For Schools</a>
              <a href="#about" onClick={() => navigate('/about')}>About</a>
              <a href="#contact" onClick={() => navigate('/contact')}>Contact</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StartPage;