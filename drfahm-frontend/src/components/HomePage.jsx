import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Type, Zap, Route, Globe, Target } from 'lucide-react';
import MiniDemo from './MiniDemo';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [hoveredUSP, setHoveredUSP] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const exams = ['NAFS', 'Qudurat', 'Tahsili'];
  
  const benefits = [
    'Clear progression',
    'Immediate feedback',
    'Built for Saudi students and schools'
  ];

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

  // Rotating benefits animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDemoComplete = () => {
    navigate('/start');
  };

  return (
    <div className="homepage-new">
      {/* ==================== 1) STICKY NAVIGATION ==================== */}
      <nav className={`nav-institutional ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <h1 onClick={() => navigate('/')}>Dr Fahm</h1>
          </div>
          
          <div className="nav-center">
            <a href="#qudurat" onClick={(e) => { e.preventDefault(); scrollToSection('exams-section'); }}>
              Qudurat
            </a>
            <a href="#tahsili" onClick={(e) => { e.preventDefault(); scrollToSection('exams-section'); }}>
              Tahsili
            </a>
            <a href="#nafs" onClick={(e) => { e.preventDefault(); scrollToSection('exams-section'); }}>
              NAFS
            </a>
            <a href="/pricing">
              Pricing
            </a>
            <a href="#for-schools" onClick={(e) => { e.preventDefault(); scrollToSection('for-schools'); }}>
              For Schools
            </a>
          </div>
          
          <div className="nav-actions">
            <button 
              onClick={() => navigate('/start')} 
              className="btn-nav-primary"
            >
              Start Free Practice
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-nav-text"
            >
              Log in
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== 2) HERO - ABOVE THE FOLD ==================== */}
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
              Dr Fahm is a bilingual (Arabic and English) mastery platform with structured 
              practice, clear progression, and instant feedback—built for Saudi students and schools.
            </p>

            <div className="hero-supporting-animated">
              {benefits.map((benefit, index) => (
                <span 
                  key={benefit}
                  className={`benefit-item ${currentBenefit === index ? 'active' : ''}`}
                >
                  {benefit}
                </span>
              ))}
            </div>

            <div className="hero-ctas-new">
              <button 
                onClick={() => navigate('/start')} 
                className="btn-hero-primary"
              >
                Start Free Practice
              </button>
              
              <button 
                onClick={() => scrollToSection('for-schools')} 
                className="btn-hero-secondary-new"
              >
                For Schools
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <MiniDemo onComplete={handleDemoComplete} />
          </div>
        </div>
      </section>

      {/* ==================== 3) TRUST STRIP ==================== */}
      <section className="trust-strip">
        <div className="content-container">
          <p className="trust-statement">
            Preparing <strong>Saudi students</strong> for{' '}
            <strong>NAFS</strong>, <strong>Qudurat</strong>, and <strong>Tahsili</strong>.
          </p>
        </div>
      </section>

      {/* ==================== 4) VALUE PROPS - ENHANCED ==================== */}
      <section className="value-props-enhanced" id="exams-section">
        <div className="content-container">
          <h2 className="section-title-enhanced">Why students choose Dr Fahm</h2>
          
          <div className="value-grid-enhanced">
            <div className="value-card-enhanced featured">
              <div className="value-icon-large">
                <Globe size={40} strokeWidth={2} />
              </div>
              <h3>Bilingual (Arabic + English)</h3>
              <p>Practice in your preferred language. Switch anytime.</p>
            </div>

            <div className="value-card-enhanced">
              <div className="value-icon-large">
                <Target size={36} strokeWidth={2} />
              </div>
              <h3>Mastery-based progression</h3>
              <p>Move forward only after understanding. No gaps.</p>
            </div>

            <div className="value-card-enhanced">
              <div className="value-icon-large">
                <Zap size={36} strokeWidth={2} />
              </div>
              <h3>Instant feedback</h3>
              <p>Learn from every mistake immediately.</p>
            </div>

            <div className="value-card-enhanced">
              <div className="value-icon-large">
                <Route size={36} strokeWidth={2} />
              </div>
              <h3>Built for KSA</h3>
              <p>Aligned with Saudi national assessments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5) THE PROBLEM ==================== */}
      <section className="the-problem">
        <div className="content-container">
          <h2 className="manifesto-headline">
            Hard work is common. Clear mastery is not.
          </h2>

          <div className="problem-grid-enhanced">
            <div className="problem-card-enhanced">
              <h3>Scattered questions</h3>
              <p>Students search endlessly for practice material across Telegram, books, and videos.</p>
            </div>

            <div className="problem-card-enhanced">
              <h3>No feedback loop</h3>
              <p>Mistakes are left unresolved. Students repeat errors without understanding why.</p>
            </div>

            <div className="problem-card-enhanced">
              <h3>Guessing next steps</h3>
              <p>No clear progression. Students waste time wondering what to practice next.</p>
            </div>

            <div className="problem-card-enhanced">
              <h3>Last-minute panic</h3>
              <p>Without structure, preparation becomes cramming instead of building real mastery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6) HOW IT WORKS - SIMPLE SYSTEM ==================== */}
      <section className="how-it-works" id="how-it-works">
        <div className="content-container">
          <h2>A simple system that builds mastery.</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Quick diagnostic</h3>
              <p>Start with 15 minutes. We identify your strengths and gaps.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Guided practice</h3>
              <p>Follow a structured path. Clear next steps. No guessing.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Build mastery</h3>
              <p>Master each concept before moving forward. Real understanding, not memorization.</p>
            </div>
          </div>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Start Free Practice
          </button>
        </div>
      </section>

      {/* ==================== 7) WORLDS MASTERY SYSTEM ==================== */}
      <section className="worlds-mastery">
        <div className="content-container-narrow">
          <h2>10 worlds. 100 levels. One path to mastery.</h2>

          <p className="worlds-intro">
            Dr Fahm organises practice across 10 worlds and 100 levels. Each world focuses 
            on core concepts, building step-by-step toward full readiness.
          </p>

          <div className="worlds-features">
            <div className="world-feature">
              <span className="feature-number">10</span>
              <span className="feature-label">Worlds</span>
            </div>
            <div className="world-feature">
              <span className="feature-number">100</span>
              <span className="feature-label">Levels</span>
            </div>
            <div className="world-feature">
              <span className="feature-number">2000+</span>
              <span className="feature-label">Questions</span>
            </div>
          </div>

          <p className="worlds-cta-text">
            Consistent practice builds the confidence and skills needed for high performance.
          </p>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Explore the system
          </button>
        </div>
      </section>

      {/* ==================== 8) BEATS BOOKS - INTEGRATED PEDAGOGY ==================== */}
      <section className="beats-books">
        <div className="content-container">
          <h2>Beats books, Telegram, and crash courses.</h2>

          <div className="usp-grid">
            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('bilingual')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Type size={28} strokeWidth={2.5} />
              </div>
              <h3>Bilingual (Arabic + English)</h3>
              <p>Practice in either language, built natively, not translated.</p>
              {hoveredUSP === 'bilingual' && (
                <p className="usp-expanded">Switch between Arabic and English at any time. Both interfaces are native, not machine-translated.</p>
              )}
            </div>

            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('feedback')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Zap size={28} strokeWidth={2.5} />
              </div>
              <h3>Instant feedback</h3>
              <p>Learn from mistakes immediately. Practice designed to stick.</p>
              {hoveredUSP === 'feedback' && (
                <p className="usp-expanded">Every answer provides immediate feedback. Mistakes return until fixed. Key concepts reappear to strengthen retention.</p>
              )}
            </div>

            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('content')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Database size={28} strokeWidth={2.5} />
              </div>
              <h3>Real exam content</h3>
              <p>Aligned with Saudi assessments.</p>
              {hoveredUSP === 'content' && (
                <p className="usp-expanded">Thousands of questions designed to match official exam patterns and difficulty.</p>
              )}
            </div>

            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('progression')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Route size={28} strokeWidth={2.5} />
              </div>
              <h3>Structured progression</h3>
              <p>No guessing what to do next.</p>
              {hoveredUSP === 'progression' && (
                <p className="usp-expanded">Clear pathways through content, building from fundamentals to advanced. Adaptive practice ensures optimal difficulty.</p>
              )}
            </div>
          </div>

          <p className="beats-books-conclusion">
            This level of structured online practice does not currently exist in one place.
          </p>
        </div>
      </section>

      {/* ==================== 9) FOR SCHOOLS (B2B) - ENHANCED ==================== */}
      <section className="for-schools-enhanced" id="for-schools">
        <div className="content-container">
          <h2>For schools: structured practice at scale.</h2>

          <p className="schools-intro-enhanced">
            NAFS and university readiness are becoming more visible. Schools need a 
            system that supports practice and progress without adding workload.
          </p>

          <div className="schools-grid-enhanced">
            <div className="school-card-enhanced">
              <div className="school-icon">
                <Target size={32} strokeWidth={2.5} />
              </div>
              <h3>School leaderboards</h3>
              <p>Healthy competition drives engagement. Real-time rankings and achievement badges motivate students to practice consistently and push for mastery.</p>
            </div>

            <div className="school-card-enhanced">
              <div className="school-icon">
                <Database size={32} strokeWidth={2.5} />
              </div>
              <h3>Progress and mastery insights</h3>
              <p>Visibility by class, year group, or cohort. Track student progress with detailed analytics.</p>
            </div>

            <div className="school-card-enhanced">
              <div className="school-icon">
                <Route size={32} strokeWidth={2.5} />
              </div>
              <h3>Flexible rollout</h3>
              <p>School licences or endorsed home use when budgets are tight. Multiple deployment options.</p>
            </div>
          </div>

          <div className="schools-ctas-enhanced">
            <button 
              onClick={() => window.location.href = 'mailto:schools@drfahm.com'} 
              className="btn-schools-primary-enhanced"
            >
              Request School Pilot
            </button>
            <a href="/schools" className="schools-link-enhanced">Explore school access →</a>
          </div>
        </div>
      </section>

      {/* ==================== 10) STAKES ==================== */}
      <section className="stakes">
        <div className="content-container">
          <h2>The stakes are real. Preparation should be too.</h2>

          <div className="stakes-grid">
            <div className="stake-block-enhanced">
              <h3>University entrance</h3>
              <p>
                Qudurat and Tahsili remain central for many university pathways. 
                Students need consistent practice, not last-minute panic.
              </p>
            </div>

            <div className="stake-block-enhanced">
              <h3>School accountability</h3>
              <p>
                NAFS is raising expectations. Schools and families benefit when 
                practice is structured and measurable.
              </p>
            </div>
          </div>

          <div className="stakes-ctas">
            <button onClick={() => navigate('/start')} className="btn-stake-primary">
              Get Started
            </button>
            <button onClick={() => scrollToSection('for-schools')} className="btn-stake-secondary">
              For Schools
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 11) FINAL CTA WALL ==================== */}
      <section className="final-cta-wall">
        <div className="content-container">
          <h2>Stop searching for questions. Start mastering them.</h2>

          <div className="cta-boxes">
            <div className="cta-box-enhanced">
              <h3>Students and Parents</h3>
              <button onClick={() => navigate('/start')} className="btn-cta-box-enhanced">
                Get Started
              </button>
              <span className="cta-box-microcopy">Begin in under a minute.</span>
            </div>

            <div className="cta-box-enhanced">
              <h3>Schools and Organisations</h3>
              <button 
                onClick={() => window.location.href = 'mailto:schools@drfahm.com'} 
                className="btn-cta-box-enhanced schools"
              >
                Request School Pilot
              </button>
              <span className="cta-box-microcopy">Cohort rollout with reporting and motivation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer-institutional">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Dr Fahm</h4>
              <p>Mastery platform for Saudi national assessments</p>
            </div>

            <div className="footer-section">
              <h5>Platform</h5>
              <ul>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How it works</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/faq">FAQ</a></li>
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
              <h5>Schools</h5>
              <ul>
                <li><a href="#for-schools" onClick={(e) => { e.preventDefault(); scrollToSection('for-schools'); }}>For Schools</a></li>
                <li><a href="mailto:schools@drfahm.com">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>Legal</h5>
              <ul>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="/cookies">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Dr Fahm. Built for Saudi students and schools.</p>
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