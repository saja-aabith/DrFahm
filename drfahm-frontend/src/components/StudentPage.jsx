import React from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function StudentPage() {
  const navigate = useNavigate();

  return (
    <div className="marketing-page">
      {/* Navigation */}
      <nav className="nav-institutional">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <h1>Dr Fahm</h1>
          </div>
          
          <div className="nav-actions">
            <button onClick={() => navigate('/login')} className="btn-nav-primary">
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="content-container-narrow">
          <h1 className="page-title">
            You deserve clear feedback, not just grades.
          </h1>
          
          <p className="page-subtitle">
            Dr Fahm shows you exactly where you stand in Qudurat, Tahsili, or NAFS — and what to focus on next.
          </p>

          <p className="page-body">
            No guessing. No wasted time on the wrong topics. Just honest feedback and a clear path forward.
          </p>

          <div className="hero-ctas">
            <button 
              onClick={() => navigate('/start')} 
              className="btn-cta-primary"
            >
              <span>Start Free Diagnostic</span>
              <span className="btn-microcopy">See where you stand in 10 minutes</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Problem Students Face */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            The problem with how most students prepare
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div className="feature-block">
              <h3>Random practice</h3>
              <p>
                You do questions from books or Telegram without knowing if they're helping. No structure. No feedback. Just hope.
              </p>
            </div>

            <div className="feature-block">
              <h3>No clarity</h3>
              <p>
                You don't know which topics you're actually weak in. You just keep practicing everything and hoping it clicks.
              </p>
            </div>

            <div className="feature-block">
              <h3>Wasted effort</h3>
              <p>
                You spend hours on topics you already know, while the gaps that matter get ignored. Hard work ≠ smart work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Dr Fahm Works for Students */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            How Dr Fahm works for you
          </h2>

          <div className="steps-vertical">
            <div className="step-simple">
              <div className="step-number-small">1</div>
              <div className="step-content">
                <h3>Take a 10-minute diagnostic</h3>
                <p>
                  Answer questions designed to reveal your actual understanding — not just whether you got it right.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">2</div>
              <div className="step-content">
                <h3>See exactly where you stand</h3>
                <p>
                  Get a clear breakdown: which topics you're strong in, which need work, and where the biggest gains are.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">3</div>
              <div className="step-content">
                <h3>Practice what actually matters</h3>
                <p>
                  Follow a personalized pathway that focuses your time on the gaps that will move your score the most.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">4</div>
              <div className="step-content">
                <h3>Get instant feedback</h3>
                <p>
                  Every question comes with an explanation. You learn as you go, not just when you check answers later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What you get with Dr Fahm
          </h2>

          <div className="two-col-grid">
            <div className="feature-block">
              <h3>Clear roadmap</h3>
              <p>
                Know exactly what to study next. No more "I don't know where to start."
              </p>
            </div>

            <div className="feature-block">
              <h3>Honest feedback</h3>
              <p>
                See your real strengths and weaknesses. Private, not compared to others.
              </p>
            </div>

            <div className="feature-block">
              <h3>Structured practice</h3>
              <p>
                Questions organized by topic and difficulty. Progress through levels as you improve.
              </p>
            </div>

            <div className="feature-block">
              <h3>Time efficiency</h3>
              <p>
                Focus on what moves the needle. Stop wasting hours on what you already know.
              </p>
            </div>

            <div className="feature-block">
              <h3>Bilingual support</h3>
              <p>
                Switch between Arabic and English instantly. Practice in the language you prefer.
              </p>
            </div>

            <div className="feature-block">
              <h3>Track progress</h3>
              <p>
                See improvement over time. Know when you're ready, not just hope you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Reassurance */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow text-content">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Your progress is private
          </h2>

          <p className="section-body" style={{ 
            textAlign: 'center',
            fontSize: '18px',
            color: 'var(--text-secondary)' 
          }}>
            Dr Fahm doesn't show public leaderboards or compare you to other students. 
            Your readiness data is private — visible only to you (and your parents if you choose to share).
          </p>

          <div style={{ 
            background: 'rgba(79, 70, 229, 0.08)',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '17px',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              Focus on your own improvement, not rankings.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="content-container-narrow">
          <h2 className="cta-title">
            Stop guessing. Start knowing.
          </h2>
          
          <p className="cta-body">
            Take the diagnostic and see exactly where you stand. Then follow a clear path to improvement.
          </p>

          <button 
            onClick={() => navigate('/start')} 
            className="btn-final-large"
          >
            <span>Start Free Diagnostic</span>
            <span className="btn-microcopy-inline">10 minutes · No signup required yet</span>
          </button>
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
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              <a href="/pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }}>Pricing</a>
              <a href="/schools" onClick={(e) => { e.preventDefault(); navigate('/schools'); }}>Schools</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentPage;