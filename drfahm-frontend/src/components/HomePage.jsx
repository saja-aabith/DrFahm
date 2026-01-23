import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [showExams, setShowExams] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const exams = ['NAFS', 'Qudurat', 'Tahsili'];

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated percentage counter - races to 100%
  useEffect(() => {
    const duration = 1500;
    const steps = 100;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= 100) {
        setPercentage(100);
        clearInterval(timer);
        setTimeout(() => {
          setShowExams(true);
        }, 300);
      } else {
        setPercentage(Math.floor(currentValue));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // Rotating exam text effect
  useEffect(() => {
    if (showExams) {
      const interval = setInterval(() => {
        setCurrentExam((prev) => (prev + 1) % exams.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [showExams, exams.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="homepage-new">
      {/* ==================== NAVIGATION ==================== */}
      <nav className={`nav-institutional ${navScrolled ? 'scrolled' : ''}`}>
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

      {/* ==================== HERO SECTION WITH VIDEO ==================== */}
      <section className="hero-institutional">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-headline-wrapper">
              <h1 className="hero-headline-main">
                Making <span className="percentage-animated">{percentage}%</span> for
              </h1>
              
              <div className="rotating-exams-wrapper">
                {showExams && exams.map((exam, index) => (
                  <h1 
                    key={exam}
                    className={`exam-text-animated ${currentExam === index ? 'active' : ''}`}
                  >
                    {exam} <span className="possible-text">possible</span>
                  </h1>
                ))}
              </div>
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
              <div className="hero-exam-buttons">
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-exam-hero nafs"
                >
                  NAFS
                </button>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-exam-hero"
                >
                  Qudurat
                </button>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-exam-hero"
                >
                  Tahsili
                </button>
              </div>
              
              <button 
                onClick={() => scrollToSection('for-schools')} 
                className="btn-cta-secondary"
              >
                For Schools & Organisations
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-video-container">
              <video 
                className="hero-video"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/hero-trailer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-overlay-badge">
                <span>Platform Preview</span>
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

      {/* ==================== PATH SELECTION WITH ANIMATED ICONS ==================== */}
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
              <svg className="card-icon-animated student-icon" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="studentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                
                {/* Student figure */}
                <g className="icon-body">
                  {/* Head */}
                  <circle className="icon-head" cx="50" cy="30" r="12" fill="url(#studentGrad)" />
                  
                  {/* Body */}
                  <rect x="40" y="42" width="20" height="25" rx="4" fill="url(#studentGrad)" opacity="0.9" />
                  
                  {/* Arms */}
                  <rect x="32" y="45" width="6" height="18" rx="3" fill="url(#studentGrad)" opacity="0.8" />
                  <rect x="62" y="45" width="6" height="18" rx="3" fill="url(#studentGrad)" opacity="0.8" />
                  
                  {/* Legs */}
                  <rect x="43" y="67" width="6" height="20" rx="3" fill="url(#studentGrad)" opacity="0.8" />
                  <rect x="51" y="67" width="6" height="20" rx="3" fill="url(#studentGrad)" opacity="0.8" />
                </g>
                
                {/* Floating book */}
                <g className="icon-book">
                  <rect x="58" y="35" width="20" height="15" rx="2" fill="#10B981" opacity="0.9" />
                  <line x1="68" y1="37" x2="68" y2="48" stroke="white" strokeWidth="1.5" opacity="0.6" />
                  <line x1="62" y1="40" x2="74" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                  <line x1="62" y1="43" x2="74" y2="43" stroke="white" strokeWidth="1" opacity="0.4" />
                  <line x1="62" y1="46" x2="74" y2="46" stroke="white" strokeWidth="1" opacity="0.4" />
                </g>
                
                {/* Sparkles */}
                <circle cx="25" cy="25" r="2" fill="#A78BFA" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="70" r="2" fill="#10B981" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </svg>
              
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
              <svg className="card-icon-animated parent-icon" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="parentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                
                {/* Parent figures */}
                <g opacity="0.9">
                  {/* Left parent */}
                  <circle cx="35" cy="30" r="10" fill="url(#parentGrad)" />
                  <rect x="27" y="40" width="16" height="20" rx="3" fill="url(#parentGrad)" opacity="0.8" />
                  
                  {/* Right parent */}
                  <circle cx="65" cy="30" r="10" fill="url(#parentGrad)" />
                  <rect x="57" y="40" width="16" height="20" rx="3" fill="url(#parentGrad)" opacity="0.8" />
                </g>
                
                {/* Child figure (smaller) */}
                <g opacity="0.9">
                  <circle cx="50" cy="55" r="8" fill="url(#parentGrad)" />
                  <rect x="44" y="63" width="12" height="15" rx="2" fill="url(#parentGrad)" opacity="0.8" />
                </g>
                
                {/* Heart */}
                <g className="icon-heart">
                  <path d="M50,25 Q50,20 45,20 Q40,20 40,25 Q40,28 50,35 Q60,28 60,25 Q60,20 55,20 Q50,20 50,25 Z" 
                        fill="#10B981" opacity="0.8" />
                </g>
                
                {/* Protective circle */}
                <circle cx="50" cy="50" r="42" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="5,5">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              
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
              <svg className="card-icon-animated school-icon" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="schoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                
                {/* Building */}
                <g className="icon-building">
                  <rect x="20" y="40" width="60" height="50" rx="2" fill="url(#schoolGrad)" opacity="0.9" />
                  
                  {/* Windows */}
                  <rect x="28" y="48" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  <rect x="46" y="48" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  <rect x="64" y="48" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  
                  <rect x="28" y="65" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  <rect x="46" y="65" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  <rect x="64" y="65" width="8" height="10" rx="1" fill="white" opacity="0.3" />
                  
                  {/* Door */}
                  <rect x="42" y="75" width="16" height="15" rx="1" fill="white" opacity="0.4" />
                </g>
                
                {/* Roof with flag */}
                <polygon points="50,25 15,40 85,40" fill="url(#schoolGrad)" />
                
                {/* Flag pole */}
                <line x1="70" y1="15" x2="70" y2="35" stroke="#10B981" strokeWidth="2" />
                
                {/* Flag */}
                <g className="icon-flag">
                  <path d="M70,15 L85,18 L85,25 L70,22 Z" fill="#10B981" opacity="0.9" />
                </g>
                
                {/* Students dots */}
                <circle cx="35" cy="55" r="3" fill="#10B981" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="55" r="3" fill="#10B981" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="55" r="3" fill="#10B981" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
              </svg>
              
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
                <li>
                  <a
                    href="/qudurat"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/qudurat');
                    }}
                  >
                    Qudurat
                  </a>
                </li>
                <li>
                  <a
                    href="/tahsili"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/tahsili');
                    }}
                  >
                    Tahsili
                  </a>
                </li>
                <li>
                  <a
                    href="/nafs"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/nafs');
                    }}
                  >
                    NAFS
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Platform</h4>
              <ul>
                <li>
                  <a
                    href="#for-schools"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('for-schools');
                    }}
                  >
                    For Schools
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/about');
                    }}
                  >
                    About Dr Fahm
                  </a>
                </li>
                <li><a href="mailto:info@drfahm.com">Contact</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a
                    href="/privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/privacy');
                    }}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/terms');
                    }}
                  >
                    Terms of Service
                  </a>
                </li>
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