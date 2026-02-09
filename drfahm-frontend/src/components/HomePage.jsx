import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveHeroDemo from './InteractiveHeroDemo';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [currentExam, setCurrentExam] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const exams = ['NAFS', 'Qudurat', 'Tahsili'];

  const examOptions = [
    { id: 'nafs_g3', label: 'NAFS Grade 3' },
    { id: 'nafs_g6', label: 'NAFS Grade 6' },
    { id: 'nafs_g9', label: 'NAFS Grade 9' },
    { id: 'qudurat', label: 'Qudurat' },
    { id: 'tahsili', label: 'Tahsili' }
  ];

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated percentage counter
  useEffect(() => {
    const duration = 1200;
    const steps = 100;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= 100) {
        setPercentage(100);
        clearInterval(timer);
      } else {
        setPercentage(Math.floor(currentValue));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // Rotating exam text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExam((prev) => (prev + 1) % exams.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [exams.length]);

  const handleExamSelection = (examId) => {
    navigate('/student', { state: { preselectedExam: examId } });
  };

  return (
    <div className="homepage-new">
      {/* Navigation */}
      <nav className={`nav-institutional ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <h1 onClick={() => navigate('/')}>Dr Fahm</h1>
          </div>
          
          <div className="nav-center">
            <a href="/student" onClick={(e) => { e.preventDefault(); navigate('/student'); }}>
              I'm a student
            </a>
            <a href="/parent" onClick={(e) => { e.preventDefault(); navigate('/parent'); }}>
              I'm a Parent
            </a>
            <a href="/schools" onClick={(e) => { e.preventDefault(); navigate('/schools'); }}>
              We're a school
            </a>
            <a href="/pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }}>
              Pricing
            </a>
          </div>
          
          <div className="nav-actions">
            <button 
              onClick={() => navigate('/login')} 
              className="btn-nav-text"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - RESTORED VERSION */}
      <section className="hero-institutional">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-headline">
              The proven blueprint to{' '}
              <span className="percentage-animated">{percentage}%</span>{' '}
              in{' '}
              <span className="rotating-exam">
                {exams.map((exam, index) => (
                  <span 
                    key={exam}
                    className={`exam-highlight ${currentExam === index ? 'active' : ''}`}
                  >
                    {exam}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-subheadline">
              Dr Fahm is a bilingual (Arabic and English) mastery platform built to 
              replace books, crash courses, and Telegram searching, with structured 
              practice and instant feedback.
            </p>

            <p className="hero-supporting">
              Clear progression. Immediate feedback. Built for Saudi students and schools.
            </p>

            {/* Get Started Button */}
            <div className="hero-ctas">
              <button 
                onClick={() => setShowExamDropdown(!showExamDropdown)}
                className="btn-hero-primary-large"
              >
                {showExamDropdown ? 'Hide exam options' : 'Get Started Now'}
              </button>
            </div>

            {/* Exam Dropdown */}
            {showExamDropdown && (
              <div style={{
                marginTop: '32px',
                background: 'var(--navy-800)',
                border: '2px solid var(--border-medium)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                animation: 'fadeIn 0.3s ease'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Select your exam to get started
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px'
                }}>
                  {examOptions.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => handleExamSelection(exam.id)}
                      style={{
                        padding: '16px',
                        background: 'var(--navy-950)',
                        border: '2px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--text-primary)',
                        fontSize: '15px',
                        fontWeight: 'var(--font-weight-semibold)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.background = 'var(--navy-950)';
                      }}
                    >
                      {exam.label}
                    </button>
                  ))}
                </div>

                <p style={{
                  marginTop: '20px',
                  fontSize: '13px',
                  color: 'var(--text-tertiary)',
                  textAlign: 'center'
                }}>
                  Start your 7-day free trial · No credit card required
                </p>
              </div>
            )}
          </div>

          <div className="hero-visual">
            <InteractiveHeroDemo />
          </div>
        </div>
      </section>

      {/* Value Propositions - Simplified */}
      <section className="trust-strip">
        <div className="content-container">
          <div className="trust-grid">
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3m18 0c0-1.66-4-3-9-3s-9 1.34-9 3m18 0v6c0 1.66-4 3-9 3s-9-1.34-9-3v-6"/>
                </svg>
              </div>
              <p><strong>Bilingual</strong><br/>Arabic and English</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p><strong>Mastery-based</strong><br/>Progress when you earn it</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p><strong>Instant feedback</strong><br/>Learn with every question</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <p><strong>Built for KSA</strong><br/>NAFS, Qudurat & Tahsili</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="how-it-works">
        <div className="content-container">
          <h2>How Dr Fahm works</h2>

          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Choose your exam</h3>
              <p>NAFS (Grades 3, 6, 9), Qudurat, or Tahsili</p>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Start practicing</h3>
              <p>Structured questions with instant feedback</p>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Master progressively</h3>
              <p>Unlock worlds as you achieve 100% mastery</p>
            </div>
          </div>

          <div style={{
            marginTop: '48px',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setShowExamDropdown(true)}
              className="btn-section-cta"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'var(--font-weight-black)',
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            Trusted by students and schools across Saudi Arabia
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '48px'
          }}>
            Join thousands of students achieving mastery in NAFS, Qudurat, and Tahsili
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--accent-primary)',
                marginBottom: '8px'
              }}>
                2000+
              </div>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)'
              }}>
                Practice Questions
              </p>
            </div>

            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--accent-primary)',
                marginBottom: '8px'
              }}>
                10
              </div>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)'
              }}>
                Progressive Worlds
              </p>
            </div>

            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--accent-primary)',
                marginBottom: '8px'
              }}>
                5
              </div>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)'
              }}>
                National Exams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Schools - Compact */}
      <section className="for-schools">
        <div className="content-container">
          <h2>For schools: Prepare students systematically</h2>

          <p className="schools-intro">
            Schools need consistent preparation frameworks for NAFS and university readiness. 
            Dr Fahm provides cohort-level dashboards, progress tracking, and leaderboards.
          </p>

          <div className="schools-ctas">
            <button 
              onClick={() => navigate('/schools')}
              className="btn-schools-primary"
            >
              Learn About School Access
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-wall">
        <div className="content-container">
          <h2>Ready to achieve mastery?</h2>

          <div className="cta-boxes">
            <div className="cta-box">
              <h3>Students</h3>
              <button 
                onClick={() => setShowExamDropdown(true)}
                className="btn-cta-box"
              >
                Get Started Now
              </button>
              <span className="cta-box-microcopy">Start your 7-day free trial</span>
            </div>

            <div className="cta-box">
              <h3>Parents</h3>
              <button 
                onClick={() => navigate('/parent')}
                className="btn-cta-box"
              >
                Get My Child Started
              </button>
              <span className="cta-box-microcopy">Register and track progress</span>
            </div>

            <div className="cta-box">
              <h3>Schools</h3>
              <button 
                onClick={() => navigate('/schools')}
                className="btn-cta-box"
              >
                Request School Access
              </button>
              <span className="cta-box-microcopy">Cohort pricing and dashboards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-institutional">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Dr Fahm</h4>
              <p>The Blueprint for 100%</p>
            </div>

            <div className="footer-section">
              <h5>Platform</h5>
              <ul>
                <li><a href="/student">For Students</a></li>
                <li><a href="/parent">For Parents</a></li>
                <li><a href="/schools">For Schools</a></li>
                <li><a href="/pricing">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>Exams</h5>
              <ul>
                <li><a href="/qudurat">Qudurat</a></li>
                <li><a href="/tahsili">Tahsili</a></li>
                <li><a href="/nafs">NAFS</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>Company</h5>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Dr Fahm. Built for Saudi students and schools.</p>
            <div className="language-toggle">
              <button className="active">EN</button>
              <span className="divider">|</span>
              <button>AR</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;