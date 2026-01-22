import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const exams = ['Qudurat', 'Tahsili', 'NAFS'];

  // Rotating exam text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExam((prev) => (prev + 1) % exams.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="homepage-new">
      {/* ==================== NAVIGATION ==================== */}
      <nav className="nav-institutional">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 onClick={() => navigate('/')}>Dr Fahm</h1>
            <span className="nav-subtitle">National Assessment & Readiness Platform</span>
          </div>
          
          <div className="nav-actions">
            <button 
              onClick={() => scrollToSection('for-schools')} 
              className="btn-nav-secondary"
            >
              For Schools
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-nav-primary"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero-institutional">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-label">National readiness for</div>
            
            <div className="rotating-exams">
              {exams.map((exam, index) => (
                <h1 
                  key={exam}
                  className={`exam-text ${currentExam === index ? 'active' : ''}`}
                >
                  {exam}
                </h1>
              ))}
            </div>

            <p className="hero-subheadline">
              Saudi national assessments now measure readiness over time, 
              not just performance on a single day.
            </p>

            <p className="hero-body">
              Dr Fahm is a diagnostic-led assessment and preparation platform designed 
              for the Saudi education system. We help students, families, and institutions 
              gain early clarity on readiness, so preparation becomes intentional rather 
              than reactive.
            </p>

            <div className="hero-ctas">
              <button 
                onClick={() => navigate('/login')} 
                className="btn-cta-primary"
              >
                Start Free Trial
                <span className="btn-microcopy">No payment details required</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('for-schools')} 
                className="btn-cta-secondary"
              >
                For Schools & Organisations
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="diagnostic-mockup">
              <div className="mockup-header">
                <span className="mockup-title">Readiness Diagnostic</span>
                <span className="mockup-status">In Progress</span>
              </div>
              <div className="mockup-section">
                <div className="progress-indicator">
                  <div className="progress-bar" style={{ width: '67%' }}></div>
                </div>
                <div className="mockup-metrics">
                  <div className="metric">
                    <span className="metric-label">Question Type</span>
                    <span className="metric-value">Quantitative Reasoning</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Time Efficiency</span>
                    <span className="metric-value">Analyzing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SYSTEM SHIFT ==================== */}
      <section className="system-shift">
        <div className="content-container">
          <h2>The cost of guessing has increased.</h2>
          
          <div className="shift-content">
            <p className="shift-paragraph">
              Qudurat and Tahsili are no longer isolated milestones.
            </p>
            
            <p className="shift-paragraph">
              With the introduction of NAFS, readiness is now assessed earlier, 
              benchmarked more consistently, and discussed more openly.
            </p>
            
            <p className="shift-paragraph">
              Families who gain clarity early keep their options open. 
              Families who delay are often forced into rushed decisions later.
            </p>
            
            <p className="shift-conclusion">
              Dr Fahm exists to move clarity forward.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PATH SELECTION ==================== */}
      <section className="path-selection">
        <div className="content-container">
          <h2>One platform. Different decisions.</h2>

          <div className="audience-grid">
            {/* Students Card */}
            <div 
              className={`audience-card ${expandedCard === 'students' ? 'expanded' : ''}`}
              onMouseEnter={() => setExpandedCard('students')}
              onMouseLeave={() => setExpandedCard(null)}
            >
              <div className="card-icon">🎓</div>
              <h3>Students</h3>
              <p className="card-primary">
                If you're practising but still unsure whether it's the right practice, 
                that's the problem diagnostics solve.
              </p>
              
              <div className="card-expanded-content">
                <ul className="card-benefits">
                  <li>Understand what actually matters before time runs out</li>
                  <li>Practice with purpose, not just volume</li>
                  <li>Private clarity without public comparison</li>
                </ul>
              </div>
              
              <button 
                onClick={() => navigate('/login')} 
                className="btn-card-action"
              >
                Take the Diagnostic
              </button>
            </div>

            {/* Parents Card */}
            <div 
              className={`audience-card ${expandedCard === 'parents' ? 'expanded' : ''}`}
              onMouseEnter={() => setExpandedCard('parents')}
              onMouseLeave={() => setExpandedCard(null)}
            >
              <div className="card-icon">👨‍👩‍👧‍👦</div>
              <h3>Parents</h3>
              <p className="card-primary">
                If you're unsure where your child truly stands, delaying clarity 
                rarely reduces stress.
              </p>
              
              <div className="card-expanded-content">
                <ul className="card-benefits">
                  <li>Early visibility without pressure or rankings</li>
                  <li>Understand readiness before decisions become urgent</li>
                  <li>Support preparation with actual insight</li>
                </ul>
              </div>
              
              <button 
                onClick={() => navigate('/login')} 
                className="btn-card-action"
              >
                Start Free Trial
              </button>
            </div>

            {/* Schools Card */}
            <div 
              className={`audience-card ${expandedCard === 'schools' ? 'expanded' : ''}`}
              onMouseEnter={() => setExpandedCard('schools')}
              onMouseLeave={() => setExpandedCard(null)}
            >
              <div className="card-icon">🏫</div>
              <h3>Schools & Organisations</h3>
              <p className="card-primary">
                If readiness is becoming a parent conversation, it needs to become a system.
              </p>
              
              <div className="card-expanded-content">
                <ul className="card-benefits">
                  <li>Cohort-level diagnostic insight and reporting</li>
                  <li>Consistent preparation framework across year groups</li>
                  <li>Minimal operational burden, maximum visibility</li>
                </ul>
              </div>
              
              <button 
                onClick={() => scrollToSection('for-schools')} 
                className="btn-card-action"
              >
                Explore School Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW DR FAHM WORKS ==================== */}
      <section className="how-it-works">
        <div className="content-container">
          <h2>Clarity before effort.</h2>

          <div className="steps-horizontal">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Diagnostic Assessment</h3>
              <p>
                We identify not just what students get wrong, but why — before time 
                and confidence are lost.
              </p>
            </div>

            <div className="step-connector"></div>

            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Personalised Pathway</h3>
              <p>
                Preparation focuses only on what will meaningfully improve readiness.
              </p>
            </div>

            <div className="step-connector"></div>

            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Purposeful Practice</h3>
              <p>
                Less volume. More intent. Practice aligned to how assessments 
                actually decide outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DIFFERENTIATION ==================== */}
      <section className="differentiation">
        <div className="content-container-narrow">
          <h2>Activity can hide confusion. Readiness exposes it.</h2>
          
          <div className="differentiation-body">
            <p>Many students appear busy but remain unprepared.</p>
            <p>More questions do not always lead to more readiness.</p>
            <p className="differentiation-conclusion">
              Dr Fahm replaces activity with insight, so effort produces progress.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== EXAMS SECTION ==================== */}
      <section className="exams-section">
        <div className="content-container">
          <h2>Built for the assessments shaping progression in Saudi Arabia.</h2>

          <div className="exams-grid">
            <div className="exam-card">
              <div className="exam-header">
                <h3>Qudurat</h3>
                <span className="exam-badge">Reasoning</span>
              </div>
              <p>
                Reasoning accuracy and time control, measured diagnostically. 
                Not repetition, but understanding of question patterns and 
                efficient problem-solving under pressure.
              </p>
              <button onClick={() => navigate('/login')} className="btn-exam">
                Check Qudurat Readiness →
              </button>
            </div>

            <div className="exam-card">
              <div className="exam-header">
                <h3>Tahsili</h3>
                <span className="exam-badge">Knowledge</span>
              </div>
              <p>
                Structured subject preparation aligned to assessment design, not repetition. 
                Focused revision that addresses actual gaps in understanding across 
                curriculum areas.
              </p>
              <button onClick={() => navigate('/login')} className="btn-exam">
                Check Tahsili Readiness →
              </button>
            </div>

            <div className="exam-card exam-card-featured">
              <div className="exam-header">
                <h3>NAFS</h3>
                <span className="exam-badge exam-badge-featured">Benchmarking</span>
              </div>
              <p>
                Early readiness signals for a benchmarking-led system. Understanding 
                where students stand before high-stakes decisions need to be made.
              </p>
              <button onClick={() => navigate('/login')} className="btn-exam btn-exam-featured">
                Check NAFS Readiness →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STUDENT MIRROR ==================== */}
      <section className="student-mirror">
        <div className="content-container-narrow">
          <h2>If you're avoiding diagnostics, that's understandable. It's also the risk.</h2>
          
          <div className="mirror-content">
            <p>
              Most capable students delay diagnostics because clarity feels exposing.
            </p>
            <p>
              But uncertainty rarely disappears on its own.
            </p>
            <p className="mirror-conclusion">
              Dr Fahm gives clarity early, privately, and constructively.
            </p>
            
            <button onClick={() => navigate('/login')} className="btn-mirror">
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FOR SCHOOLS ==================== */}
      <section className="for-schools" id="for-schools">
        <div className="content-container">
          <div className="schools-content">
            <div className="schools-text">
              <h2>When readiness becomes visible, systems matter.</h2>
              
              <p className="schools-intro">
                As national benchmarking increases, readiness can no longer rely 
                on individual effort alone.
              </p>
              
              <p>
                Dr Fahm helps schools implement a consistent readiness framework that 
                supports students, reassures parents, and reduces last-minute escalation.
              </p>

              <div className="schools-features">
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>Cohort-level diagnostic insight</span>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>Consistent preparation across year groups</span>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>Clear reporting for leadership and parents</span>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>Minimal operational burden</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = 'mailto:schools@drfahm.com'} 
                className="btn-schools"
              >
                Talk to us about school access
              </button>
            </div>

            <div className="schools-visual">
              <div className="dashboard-mockup">
                <div className="mockup-title">School Dashboard</div>
                <div className="mockup-stats">
                  <div className="stat-item">
                    <span className="stat-number">156</span>
                    <span className="stat-label">Students Assessed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">78%</span>
                    <span className="stat-label">Average Readiness</span>
                  </div>
                </div>
                <div className="mockup-chart">
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '68%' }}></div>
                  <div className="chart-bar" style={{ height: '82%' }}></div>
                  <div className="chart-bar" style={{ height: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="final-cta">
        <div className="content-container">
          <h2>Clarity earlier. Fewer compromises later.</h2>
          <p className="final-cta-body">
            Start with a diagnostic assessment and understand readiness before 
            decisions become urgent.
          </p>

          <div className="final-cta-actions">
            <button 
              onClick={() => navigate('/login')} 
              className="btn-final-primary"
            >
              Start Free Trial
              <span className="btn-microcopy-inline">No payment details required</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('for-schools')} 
              className="btn-final-secondary"
            >
              For Schools & Organisations
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer-institutional">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>Dr Fahm</h3>
              <p>National Assessment & Readiness Platform</p>
              <p className="footer-tagline">
                Designed for the Saudi education system. Built for clarity and readiness.
              </p>
            </div>

            <div className="footer-links">
              <h4>Assessments</h4>
              <ul>
                <li><a href="#qudurat">Qudurat</a></li>
                <li><a href="#tahsili">Tahsili</a></li>
                <li><a href="#nafs">NAFS</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Platform</h4>
              <ul>
                <li><a href="#for-schools" onClick={(e) => { e.preventDefault(); scrollToSection('for-schools'); }}>For Schools</a></li>
                <li><a href="#about">About Dr Fahm</a></li>
                <li><a href="mailto:info@drfahm.com">Contact</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Dr Fahm. All rights reserved.</p>
            <div className="footer-meta">
              <span>Built for Saudi Arabia</span>
              <span className="footer-separator">•</span>
              <span>Aligned with Vision 2030</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;