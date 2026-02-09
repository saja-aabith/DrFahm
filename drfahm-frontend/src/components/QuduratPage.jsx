import React from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function QuduratPage() {
  const navigate = useNavigate();

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

      {/* Hero - Qudurat Reality */}
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="content-container-narrow">
          <div style={{ 
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.3)',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--accent-primary)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Qudurat Preparation
          </div>

          <h1 className="page-title">
            Qudurat tests reasoning, not memorisation.
          </h1>
          
          <p className="page-subtitle">
            Practice without clarity often misses the point.
          </p>

          <p className="page-body">
            Qudurat measures reasoning ability — pattern recognition, logical deduction, and 
            time-controlled problem solving. Students who practice without understanding why 
            they're getting questions wrong rarely improve readiness.
          </p>

          <div className="hero-ctas">
            <button 
              onClick={() => navigate('/start')} 
              className="btn-cta-primary"
            >
              <span>Check Qudurat Readiness</span>
              <span className="btn-microcopy">Free diagnostic · 10 minutes</span>
            </button>

            <button 
              onClick={() => navigate('/how-it-works')} 
              className="btn-cta-secondary-text"
            >
              How diagnostics work →
            </button>
          </div>
        </div>
      </section>

      {/* Common Failure Modes */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Common failure modes
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            <div className="feature-block">
              <div style={{ 
                fontSize: '32px',
                marginBottom: '16px'
              }}>⏱️</div>
              <h3>Guessing under time pressure</h3>
              <p>
                Students run out of time, panic, and guess. They blame the timer, but the 
                real issue is inefficient reasoning or reading strategies.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ 
                fontSize: '32px',
                marginBottom: '16px'
              }}>❌</div>
              <h3>Practicing wrong question types</h3>
              <p>
                Not all Qudurat questions are equally important. Students waste time on 
                low-frequency question types instead of mastering what appears most often.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ 
                fontSize: '32px',
                marginBottom: '16px'
              }}>🔄</div>
              <h3>False confidence from repetition</h3>
              <p>
                Repeating similar questions feels productive but doesn't build reasoning ability. 
                Students memorise patterns without understanding principles.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(200, 90, 84, 0.08)',
            border: '1px solid rgba(200, 90, 84, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <p className="section-body" style={{ margin: 0, fontSize: '17px' }}>
              Activity can hide confusion. Readiness exposes it.
            </p>
          </div>
        </div>
      </section>

      {/* How Diagnostics Help */}
      <section className="content-section bg-slate">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            How diagnostics help
          </h2>

          <div className="content-container-narrow">
            <p className="section-body" style={{ 
              textAlign: 'center', 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '48px'
            }}>
              Before you practice, we need to understand where readiness actually stands. 
              Dr Fahm's diagnostic reveals:
            </p>

            <div className="steps-vertical">
              <div className="step-simple">
                <div className="step-number-small">1</div>
                <div className="step-content">
                  <h3>Question-type breakdown</h3>
                  <p>
                    Which verbal or quantitative question types reveal confusion vs. carelessness. 
                    Not all mistakes are equal.
                  </p>
                </div>
              </div>

              <div className="step-simple">
                <div className="step-number-small">2</div>
                <div className="step-content">
                  <h3>Time control insight</h3>
                  <p>
                    Where time is lost — reading, reasoning, or selecting answers. Time pressure 
                    is often a symptom, not the cause.
                  </p>
                </div>
              </div>

              <div className="step-simple">
                <div className="step-number-small">3</div>
                <div className="step-content">
                  <h3>Reasoning patterns</h3>
                  <p>
                    Whether accuracy comes from understanding patterns or memorising solutions. 
                    One translates to new questions. The other doesn't.
                  </p>
                </div>
              </div>

              <div className="step-simple">
                <div className="step-number-small">4</div>
                <div className="step-content">
                  <h3>Priority areas</h3>
                  <p>
                    What to practice first. Not everything. Just what will meaningfully improve 
                    your Qudurat readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Readiness Looks Like */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            What Qudurat readiness looks like
          </h2>

          <p className="section-body" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Readiness isn't about getting every question right. It's about consistency, 
            efficiency, and reasoning under pressure.
          </p>

          <div className="two-col-grid">
            <div className="feature-block">
              <h3>Signals, not scores</h3>
              <p>
                Dr Fahm doesn't give you a Qudurat "score prediction." We show readiness indicators — 
                where you're strong, where gaps remain, and what practice will close them.
              </p>
            </div>

            <div className="feature-block">
              <h3>Direction before volume</h3>
              <p>
                You don't need 1,000 practice questions. You need the right 200, practiced correctly, 
                with feedback on reasoning, not just right/wrong.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginTop: '40px'
          }}>
            <p className="section-body" style={{ 
              margin: 0, 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>Qudurat readiness means:</strong> answering 
              reasoning questions accurately and efficiently, even under time pressure, because you understand 
              patterns — not because you've memorised solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Verbal vs Quantitative */}
      <section className="content-section bg-slate">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Verbal & Quantitative sections
          </h2>

          <div className="two-col-grid">
            <div className="feature-block">
              <h3>Verbal Section</h3>
              <p style={{ marginBottom: '16px' }}>
                Measures language reasoning — analogies, sentence completion, reading comprehension, 
                and contextual logic.
              </p>
              <ul className="check-list">
                <li>Pattern recognition in language</li>
                <li>Vocabulary in context, not isolation</li>
                <li>Reading efficiency under time pressure</li>
                <li>Logical deduction from passages</li>
              </ul>
            </div>

            <div className="feature-block">
              <h3>Quantitative Section</h3>
              <p style={{ marginBottom: '16px' }}>
                Measures numerical reasoning — arithmetic, algebra, geometry, and statistical logic.
              </p>
              <ul className="check-list">
                <li>Problem-solving strategies, not formulas</li>
                <li>Pattern recognition in numbers</li>
                <li>Estimation and approximation skills</li>
                <li>Time-efficient calculation methods</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Students vs Parents */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Different perspectives
          </h2>

          <div className="two-col-grid">
            <div className="feature-block">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎓</div>
              <h3>For Students</h3>
              <p>
                If you've been practicing but don't feel more confident, the issue isn't effort. 
                It's direction. A diagnostic shows what practice will actually improve Qudurat performance.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>👨‍👩‍👧‍👦</div>
              <h3>For Parents</h3>
              <p>
                If your child is "working hard" but results aren't improving, then your child is missing the blueprint
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="content-container-narrow">
          <h2 className="cta-title">
            Check Qudurat readiness before preparation begins.
          </h2>
          
          <p className="cta-body">
            Start with a diagnostic assessment and understand where readiness stands for verbal 
            and quantitative reasoning.
          </p>

          <button 
            onClick={() => navigate('/start')} 
            className="btn-final-large"
          >
            <span>Check Qudurat Readiness</span>
            <span className="btn-microcopy-inline">Free diagnostic · 10 minutes</span>
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
            <p>&copy; 2025 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default QuduratPage;