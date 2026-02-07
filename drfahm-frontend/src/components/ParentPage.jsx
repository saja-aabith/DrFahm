import React from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function ParentPage() {
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
            Clarity before decisions become urgent.
          </h1>
          
          <p className="page-subtitle">
            Understand readiness early. Reduce stress. Keep options open.
          </p>

          <p className="page-body">
            Dr Fahm helps parents understand where their child stands for NAFS, Qudurat, and 
            Tahsili — privately, constructively, and early enough to make informed decisions.
          </p>

          <div className="hero-ctas">
            <button 
              onClick={() => navigate('/start')} 
              className="btn-cta-primary"
            >
              <span>Start Free Diagnostic</span>
              <span className="btn-microcopy">See readiness in 10 minutes</span>
            </button>
          </div>
        </div>
      </section>

      {/* What Parents Worry About */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What parents worry about
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div className="feature-block">
              <h3>Uncertainty about readiness</h3>
              <p>
                You see your child studying, but have no real idea if they're prepared. 
                Uncertainty compounds until it's too late.
              </p>
            </div>

            <div className="feature-block">
              <h3>Wasted effort on wrong areas</h3>
              <p>
                Time spent practicing doesn't always translate to improvement. 
                You're not sure if effort is being directed effectively.
              </p>
            </div>

            <div className="feature-block">
              <h3>Last-minute panic</h3>
              <p>
                Waiting until exam season to understand gaps means options narrow. 
                Decisions become reactive, not strategic.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(79, 70, 229, 0.08)',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <p className="section-body" style={{ margin: 0, fontSize: '17px' }}>
              Most families delay clarity until stress is unavoidable.
            </p>
          </div>
        </div>
      </section>

      {/* What Dr Fahm Provides */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What Dr Fahm provides
          </h2>

          <div className="steps-vertical">
            <div className="step-simple">
              <div className="step-number-small">1</div>
              <div className="step-content">
                <h3>Early readiness visibility</h3>
                <p>
                  A diagnostic assessment shows where your child stands now — strengths, 
                  gaps, and readiness patterns — long before exam pressure builds.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">2</div>
              <div className="step-content">
                <h3>Structured preparation pathway</h3>
                <p>
                  Practice adapts to diagnostic results. Your child focuses on what 
                  will actually improve readiness, not random content.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">3</div>
              <div className="step-content">
                <h3>Progress tracking you can trust</h3>
                <p>
                  See whether effort is translating to improvement. Readiness updates 
                  help you confirm preparation is working.
                </p>
              </div>
            </div>

            <div className="step-simple">
              <div className="step-number-small">4</div>
              <div className="step-content">
                <h3>Privacy by default</h3>
                <p>
                  No public rankings. No comparisons with classmates. Readiness data 
                  stays private unless you choose to share it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="content-section">
        <div className="content-container-narrow text-content">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Why this matters
          </h2>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <p className="section-body">
              <strong style={{ color: 'var(--text-primary)' }}>Earlier clarity reduces stress:</strong> Understanding 
              readiness early keeps options open. Delaying clarity narrows them.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <p className="section-body">
              <strong style={{ color: 'var(--text-primary)' }}>Confirmation replaces guesswork:</strong> You know 
              if effort is working. Preparation becomes intentional, not hopeful.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px'
          }}>
            <p className="section-body">
              <strong style={{ color: 'var(--text-primary)' }}>Better decisions, less panic:</strong> When you 
              understand readiness months in advance, decisions are strategic, not reactive.
            </p>
          </div>
        </div>
      </section>

      {/* What Parents See */}
      <section className="content-section bg-slate">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What you'll see
          </h2>

          <div className="two-col-grid">
            <div className="feature-block">
              <h3>Diagnostic results</h3>
              <p>
                Clear breakdown of strengths and gaps across exam topics. 
                Understand readiness baselines before practice begins.
              </p>
            </div>

            <div className="feature-block">
              <h3>Personalized pathway</h3>
              <p>
                A practice plan tailored to your child's diagnostic results. 
                Focus effort where it matters most.
              </p>
            </div>

            <div className="feature-block">
              <h3>Progress over time</h3>
              <p>
                Track readiness improvement week by week. Confirm that 
                practice is translating to better performance.
              </p>
            </div>

            <div className="feature-block">
              <h3>Readiness signals</h3>
              <p>
                Clear indicators showing whether your child is on track, 
                ahead, or needs additional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="content-container-narrow">
          <h2 className="cta-title">
            Understand readiness before decisions become urgent.
          </h2>
          
          <p className="cta-body">
            Start with the diagnostic. See where your child stands. Confirm value before 
            committing. All free to begin.
          </p>

          <button 
            onClick={() => navigate('/start')} 
            className="btn-final-large"
          >
            <span>Start Free Diagnostic</span>
            <span className="btn-microcopy-inline">10 minutes · No payment required</span>
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

export default ParentPage;