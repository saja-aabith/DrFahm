import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="nav-logo">
            <h1>Dr Fahm</h1>
            <span className="nav-tagline">National Assessment & Readiness Platform</span>
          </div>
          
          <div className="nav-actions">
            <button onClick={() => scrollToSection('for-schools')} className="btn-nav-secondary">
              For Schools
            </button>
            <button onClick={() => navigate('/login')} className="btn-nav-primary">
              Login / Sign Up
            </button>
            <button 
              className="btn-language" 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video 
            className="hero-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="/hero-poster.jpg"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            {/* Replace /hero-video.mp4 with your Pika-generated video */}
          </video>
          <div className="hero-video-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Start with understanding.
              <br />
              <span className="hero-highlight">Prepare with confidence.</span>
            </h1>
            
            <p className="hero-description">
              Dr Fahm is a diagnostic-led assessment and preparation platform for Qudurat, 
              Tahsili, and NAFS. We help students and institutions move beyond guesswork 
              through personalised pathways, purposeful practice, and clear indicators of readiness.
            </p>

            <div className="hero-ctas">
              <button onClick={() => navigate('/login')} className="btn-hero-primary">
                Start Free Trial
              </button>
              <button onClick={() => scrollToSection('for-schools')} className="btn-hero-secondary">
                For Schools & Organisations
              </button>
            </div>

            <p className="hero-notice">No payment details required.</p>
          </div>
        </div>
      </section>

      {/* Trust Statements */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon"></div>
              <h3>Diagnostic-led preparation</h3>
              <p>Not random practice</p>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon">🎯</div>
              <h3>Personalised pathways</h3>
              <p>For every learner</p>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon">🇸🇦</div>
              <h3>Designed for national assessments</h3>
              <p>Aligned to standards</p>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon"></div>
              <h3>Individual and institutional use</h3>
              <p>Scalable for all</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Dr Fahm Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How Dr Fahm Works</h2>
            <p className="section-subtitle">A structured approach to exam readiness</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Diagnostic Assessment</h3>
              <p>
                Every learner begins with a diagnostic assessment that identifies strengths, 
                gaps, reasoning patterns, and time-management behaviours.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Personalised Pathway</h3>
              <p>
                Dr Fahm builds a focused learning pathway aligned to the learner's needs 
                and the demands of the assessment.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Purposeful Practice</h3>
              <p>
                Practice is targeted, time-aware, and designed to develop understanding, 
                accuracy, and confidence under exam conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="who-its-for-section">
        <div className="container">
          <div className="section-header">
            <h2>Who Dr Fahm Is For</h2>
          </div>

          <div className="audience-grid">
            {/* Students & Parents */}
            <div className="audience-card">
              <div className="audience-icon">🎓</div>
              <h3>For Students & Parents</h3>
              
              <ul className="audience-benefits">
                <li>A clear starting point through diagnostics</li>
                <li>Personalised preparation, not generic courses</li>
                <li>Calm, academic approach that builds confidence</li>
                <li>Flexible access from home</li>
              </ul>

              <button onClick={() => navigate('/login')} className="btn-audience">
                Start Free Trial
              </button>
            </div>

            {/* Schools & Organisations */}
            <div className="audience-card" id="for-schools">
              <div className="audience-icon"></div>
              <h3>For Schools & Organisations</h3>
              
              <ul className="audience-benefits">
                <li>Structured assessment aligned to national exams</li>
                <li>Consistent preparation across cohorts</li>
                <li>Clear visibility of readiness and progress</li>
                <li>Scalable implementation</li>
              </ul>

              <button onClick={() => window.location.href = 'mailto:schools@drfahm.com'} className="btn-audience">
                Talk to Us About School Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Assessments */}
      <section className="assessments-section">
        <div className="container">
          <div className="section-header">
            <h2>Supported Assessments</h2>
          </div>

          <div className="assessments-grid">
            <div className="assessment-card">
              <h3>Qudurat</h3>
              <p>
                Reasoning-focused preparation for quantitative and verbal sections, 
                with attention to patterns, logic, and time efficiency.
              </p>
            </div>

            <div className="assessment-card">
              <h3>Tahsili</h3>
              <p>
                Structured preparation aligned to subject knowledge and assessment design, 
                without rote revision or over-practice.
              </p>
            </div>

            <div className="assessment-card">
              <h3>NAFS</h3>
              <p>
                Readiness assessment and skill development aligned to national standards 
                and emerging frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dr Fahm */}
      <section className="why-section">
        <div className="container">
          <div className="why-content">
            <h2>Why Dr Fahm</h2>
            
            <div className="why-columns">
              <div className="why-column">
                <h3>Dr Fahm is not:</h3>
                <ul className="why-list not-list">
                  <li>A tutoring centre</li>
                  <li>A question bank</li>
                  <li>Volume-based practice</li>
                  <li>One-size-fits-all courses</li>
                  <li>Short-term performance hacks</li>
                </ul>
              </div>

              <div className="why-column">
                <h3>Dr Fahm is:</h3>
                <ul className="why-list is-list">
                  <li>Diagnostic before training</li>
                  <li>Personalised with purpose</li>
                  <li>Focused on readiness, not cramming</li>
                  <li>Clarity-driven preparation</li>
                  <li>Built for lasting understanding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Environment */}
      <section className="environment-section">
        <div className="container">
          <div className="environment-content">
            <h2>Designed for Serious Learning</h2>
            
            <div className="environment-features">
              <div className="env-feature">
                <div className="env-icon"></div>
                <h4>No public leaderboards</h4>
              </div>
              
              <div className="env-feature">
                <div className="env-icon"></div>
                <h4>No superficial gamification</h4>
              </div>
              
              <div className="env-feature">
                <div className="env-icon"></div>
                <h4>No performance pressure</h4>
              </div>
            </div>

            <p className="environment-note">
              Progress is measured against readiness, not against others.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2>Start free. Decide later.</h2>
            <p>
              Experience how Dr Fahm builds clarity and direction through diagnostic insight.
            </p>

            <div className="final-cta-buttons">
              <button onClick={() => navigate('/login')} className="btn-final-primary">
                Start Free Trial
              </button>
              <button onClick={() => scrollToSection('for-schools')} className="btn-final-secondary">
                For Schools & Organisations
              </button>
            </div>

            <p className="final-cta-note">
              Flexible plans available for individuals and institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>Dr Fahm</h3>
              <p>National Assessment & Readiness Platform</p>
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
                <li><a href="#for-schools" onClick={() => scrollToSection('for-schools')}>For Schools</a></li>
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
            <div className="footer-language">
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>
                English
              </button>
              <span>|</span>
              <button onClick={() => setLanguage('ar')} className={language === 'ar' ? 'active' : ''}>
                العربية
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;