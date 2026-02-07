import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Type, Zap, Route } from 'lucide-react';
import InteractiveHeroDemo from './InteractiveHeroDemo';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [hoveredUSP, setHoveredUSP] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const exams = ['NAFS', 'Qudurat', 'Tahsili'];

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="homepage-new">
      {/* ==================== NAVIGATION - UPDATED ==================== */}
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

      {/* ==================== HERO - UPDATED ==================== */}
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

            {/* UPDATED: Single CTA Button */}
            <div className="hero-ctas">
              <button 
                onClick={() => navigate('/start')} 
                className="btn-hero-primary-large"
              >
                Get Started Now
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <InteractiveHeroDemo />
          </div>
        </div>
      </section>

      {/* ==================== REST OF HOMEPAGE (unchanged) ==================== */}
      <section className="trust-strip">
        <div className="content-container">
          <div className="trust-grid">
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3m18 0c0-1.66-4-3-9-3s-9 1.34-9 3m18 0v6c0 1.66-4 3-9 3s-9-1.34-9-3v-6"/>
                </svg>
              </div>
              <p><strong>Bilingual:</strong> Arabic and English in one platform</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p><strong>Mastery-based:</strong> Progress only when you earn it</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p><strong>Instant feedback:</strong> Learn with every question</p>
            </div>
            
            <div className="trust-pillar">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <p><strong>Built for KSA:</strong> Qudurat, Tahsili and NAFS</p>
            </div>
          </div>
        </div>
      </section>

      <section className="the-problem">
        <div className="content-container">
          <h2>This is how most students prepare today.</h2>

          <div className="problem-grid">
            <div className="problem-card">
              <h3>Books only</h3>
              <p>No feedback, no structure, no visibility on progress.</p>
            </div>

            <div className="problem-card">
              <h3>Telegram hunting</h3>
              <p>Questions are scattered and inconsistent.</p>
            </div>

            <div className="problem-card">
              <h3>Crash courses</h3>
              <p>Short bursts, little retention, no long-term mastery.</p>
            </div>
          </div>

          <p className="problem-conclusion">Hard work is common. Clear mastery is not.</p>
          
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="problem-link">
            See how Dr Fahm works →
          </a>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="content-container">
          <h2>A simple system that builds mastery.</h2>

          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Practice from a deep question bank</h3>
              <p>Structured questions, not random sets.</p>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Get instant feedback</h3>
              <p>Know what's right, what's wrong, and why.</p>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Master one level at a time</h3>
              <p>Unlock the next World only when you reach 100 percent.</p>
            </div>
          </div>

          <div className="progress-bar-graphic">
            <div className="progress-segment completed"></div>
            <div className="progress-segment completed"></div>
            <div className="progress-segment active"></div>
            <div className="progress-segment"></div>
            <div className="progress-segment"></div>
          </div>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Get Started Now
          </button>
        </div>
      </section>

      <section className="worlds-mastery">
        <div className="content-container">
          <h2>Mastery before progress, always.</h2>

          <p className="worlds-body">
            Students move through 10 Worlds designed to build skill step by step. 
            Each World focuses on a specific set of question types. 
            You advance only when mastery is proven.
          </p>

          <div className="worlds-features">
            <div className="world-feature">
              <span className="feature-bullet">→</span>
              <span>Clear focus in every World</span>
            </div>
            <div className="world-feature">
              <span className="feature-bullet">→</span>
              <span>Motivation through progress</span>
            </div>
            <div className="world-feature">
              <span className="feature-bullet">→</span>
              <span>Confidence built through mastery</span>
            </div>
          </div>

          <div className="worlds-visual">
            <div className="world-item locked">
              <div className="world-number">World 1</div>
              <div className="world-status">100% Complete</div>
            </div>
            <div className="world-item locked">
              <div className="world-number">World 2</div>
              <div className="world-status">100% Complete</div>
            </div>
            <div className="world-item active">
              <div className="world-number">World 3</div>
              <div className="world-status">In Progress - 67%</div>
            </div>
            <div className="world-item">
              <div className="world-number">World 4</div>
              <div className="world-status">Locked</div>
            </div>
            <div className="world-unlock-message">
              Next World unlocked at 100%
            </div>
          </div>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Try the first Worlds free
          </button>
        </div>
      </section>

      <section className="beats-books">
        <div className="content-container">
          <h2>Everything in books, upgraded for online mastery.</h2>

          <div className="usp-grid">
            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('bank')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Database size={26} strokeWidth={2.5} />
              </div>
              <h3>Bigger question bank</h3>
              <p>More depth than print resources.</p>
              {hoveredUSP === 'bank' && (
                <p className="usp-expanded">Thousands of questions across all exam types, regularly updated.</p>
              )}
            </div>

            <div 
              className="usp-card"
              onMouseEnter={() => setHoveredUSP('bilingual')}
              onMouseLeave={() => setHoveredUSP(null)}
            >
              <div className="usp-icon">
                <Type size={26} strokeWidth={2.5} />
              </div>
              <h3>Arabic and English</h3>
              <p>Prepare in the language you need.</p>
              {hoveredUSP === 'bilingual' && (
                <p className="usp-expanded">Switch between languages instantly, practice in both.</p>
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
              <p>Every question teaches.</p>
              {hoveredUSP === 'feedback' && (
                <p className="usp-expanded">Immediate explanations help you understand mistakes before moving on.</p>
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
                <p className="usp-expanded">Clear pathways through content, building from fundamentals to advanced.</p>
              )}
            </div>
          </div>

          <p className="beats-books-conclusion">
            This level of structured online practice does not currently exist in one place.
          </p>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Get Started Now
          </button>
        </div>
      </section>

      <section className="personalised-learning">
        <div className="content-container-narrow">
          <h2>Practice designed to stick.</h2>

          <p className="learning-body">
            Dr Fahm adapts practice to help students retain what they learn, 
            not just finish questions.
          </p>

          <div className="learning-features">
            <div className="learning-feature">
              <span className="feature-icon">↻</span>
              <span>Mistakes return until they're fixed</span>
            </div>
            <div className="learning-feature">
              <span className="feature-icon">✓</span>
              <span>Key ideas come back later so they're remembered</span>
            </div>
            <div className="learning-feature">
              <span className="feature-icon">→</span>
              <span>Practice builds both speed and accuracy</span>
            </div>
          </div>

          <button onClick={() => navigate('/start')} className="btn-section-cta">
            Get Started Now
          </button>
        </div>
      </section>

      <section className="for-schools" id="for-schools">
        <div className="content-container">
          <h2>For schools: structured practice at scale.</h2>

          <p className="schools-intro">
            NAFS and university readiness are becoming more visible. Schools need a 
            system that supports practice and progress without adding workload.
          </p>

          <div className="schools-grid">
            <div className="school-feature">
              <h3>School leaderboards</h3>
              <p>Healthy competition drives engagement. Real-time rankings and achievement badges motivate students to practice consistently and push for mastery.</p>
            </div>

            <div className="school-feature">
              <h3>Progress and mastery insights</h3>
              <p>Visibility by class, year group, or cohort.</p>
            </div>

            <div className="school-feature">
              <h3>Flexible rollout</h3>
              <p>School licences or endorsed home use when budgets are tight.</p>
            </div>
          </div>

          <div className="schools-ctas">
            <button 
              onClick={() => window.location.href = 'mailto:schools@drfahm.com'} 
              className="btn-schools-primary"
            >
              Request School Pilot
            </button>
            <a href="/schools" className="schools-link">Explore school access →</a>
          </div>
        </div>
      </section>

      <section className="stakes">
        <div className="content-container">
          <h2>The stakes are real. Preparation should be too.</h2>

          <div className="stakes-grid">
            <div className="stake-block">
              <h3>University entrance</h3>
              <p>
                Qudurat and Tahsili remain central for many university pathways. 
                Students need consistent practice, not last-minute panic.
              </p>
            </div>

            <div className="stake-block">
              <h3>School accountability</h3>
              <p>
                NAFS is raising expectations. Schools and families benefit when 
                practice is structured and measurable.
              </p>
            </div>
          </div>

          <div className="stakes-ctas">
            <button onClick={() => navigate('/start')} className="btn-stake">
              Get Started Now
            </button>
            <button onClick={() => scrollToSection('for-schools')} className="btn-stake">
              For Schools
            </button>
          </div>
        </div>
      </section>

      <section className="final-cta-wall">
        <div className="content-container">
          <h2>Stop searching for questions. Start mastering them.</h2>

          <div className="cta-boxes">
            <div className="cta-box">
              <h3>Students and Parents</h3>
              <button onClick={() => navigate('/start')} className="btn-cta-box">
                Get Started Now
              </button>
              <span className="cta-box-microcopy">Begin in under a minute.</span>
            </div>

            <div className="cta-box">
              <h3>Schools and Organisations</h3>
              <button 
                onClick={() => window.location.href = 'mailto:schools@drfahm.com'} 
                className="btn-cta-box"
              >
                Request School Pilot
              </button>
              <span className="cta-box-microcopy">Cohort rollout with reporting and motivation.</span>
            </div>
          </div>
        </div>
      </section>

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