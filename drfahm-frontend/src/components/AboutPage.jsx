import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SharedPages.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Navigation */}
      <nav className="nav-institutional">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 onClick={() => navigate('/')}>Dr Fahm</h1>
            <span className="nav-subtitle">National Assessment & Readiness Platform</span>
          </div>
          
          <div className="nav-actions">
            <button onClick={() => navigate('/')} className="btn-nav-secondary">
              Back to Home
            </button>
            <button onClick={() => navigate('/login')} className="btn-nav-primary">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="content-container-narrow">
          <h1 className="page-title">About Dr Fahm</h1>
          <p className="page-subtitle">
            Built for the Saudi education system. Designed for clarity and readiness.
          </p>
        </div>
      </section>

      {/* Why Dr Fahm Exists */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title">Why Dr Fahm exists</h2>
          
          <p className="section-body">
            Dr Fahm was built to solve a specific problem: students and families often prepare 
            for national assessments without clear visibility into where readiness actually stands.
          </p>

          <p className="section-body">
            Practice feels productive. Volume feels reassuring. But without diagnostic clarity, 
            effort can be misdirected—focused on areas already strong while gaps remain unaddressed.
          </p>

          <p className="section-body">
            Dr Fahm exists to move clarity forward. To identify gaps before time runs out. 
            To make preparation purposeful rather than reactive.
          </p>
        </div>
      </section>

      {/* Readiness Philosophy */}
      <section className="content-section section-dark">
        <div className="content-container">
          <h2 className="section-title">Readiness philosophy</h2>
          
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h4>Diagnostic before practice</h4>
              <p>
                We believe preparation should begin with understanding, not volume. 
                Diagnostics reveal what matters. Practice then becomes focused.
              </p>
            </div>

            <div className="philosophy-card">
              <h4>Signals over scores</h4>
              <p>
                Readiness is not a single number. It's a set of signals: time control, 
                reasoning patterns, question-type mastery, confidence calibration.
              </p>
            </div>

            <div className="philosophy-card">
              <h4>Privacy protects confidence</h4>
              <p>
                Learning requires psychological safety. Dr Fahm has no leaderboards, 
                no public rankings, no social pressure. Progress is personal.
              </p>
            </div>

            <div className="philosophy-card">
              <h4>Systems support individuals</h4>
              <p>
                When readiness becomes visible at scale, schools and institutions can 
                support students systematically rather than reactively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Saudi Context */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title">Saudi context</h2>
          
          <p className="section-body">
            Dr Fahm is designed specifically for the Saudi education system and national 
            assessments: Qudurat, Tahsili, and NAFS.
          </p>

          <p className="section-body">
            As Saudi Arabia's education system evolves under Vision 2030, national assessment 
            is shifting toward earlier benchmarking, continuous measurement, and readiness-focused 
            evaluation. Dr Fahm aligns with this direction.
          </p>

          <p className="section-body">
            We serve students and families navigating national assessments, international schools 
            supporting students preparing for Saudi exams, and Saudi institutions building 
            systematic readiness frameworks.
          </p>
        </div>
      </section>

      {/* Approach to Assessment */}
      <section className="content-section section-dark">
        <div className="content-container-narrow">
          <h2 className="section-title">Approach to assessment</h2>
          
          <div className="approach-principles">
            <div className="principle-item">
              <h4>We don't teach test-taking tricks</h4>
              <p>
                Qudurat, Tahsili, and NAFS are designed to measure reasoning and knowledge, 
                not memorization. Dr Fahm reinforces this by building understanding, not shortcuts.
              </p>
            </div>

            <div className="principle-item">
              <h4>We don't gamify preparation</h4>
              <p>
                Points, badges, and leaderboards create performance pressure and distract from 
                actual learning. Dr Fahm measures readiness progress without gamification.
              </p>
            </div>

            <div className="principle-item">
              <h4>We don't replace teaching</h4>
              <p>
                Dr Fahm is a readiness assessment and preparation system, not a curriculum or 
                teaching platform. We complement schools and tutoring, not replace them.
              </p>
            </div>

            <div className="principle-item">
              <h4>We don't promise overnight improvement</h4>
              <p>
                Readiness improves gradually with focused effort. Dr Fahm provides clarity 
                and direction—but sustained improvement requires consistent work over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building Toward */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title">What we're building toward</h2>
          
          <p className="section-body">
            Dr Fahm is in active development. Current functionality supports diagnostic 
            assessment, personalised pathways, and purposeful practice for Qudurat, Tahsili, 
            and NAFS.
          </p>

          <p className="section-body">
            Planned development includes deeper analytics for schools, enhanced parent 
            communication tools, Arabic interface support, and integration with institutional 
            learning systems.
          </p>

          <p className="section-body">
            We're committed to building Dr Fahm as national assessment infrastructure—not 
            just a product, but a system that scales with the needs of Saudi education.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section section-dark">
        <div className="content-container-narrow text-center">
          <h2 className="section-title">See how it works</h2>
          <p className="section-body">
            Start with a diagnostic. Understand your readiness. Build from clarity.
          </p>
          
          <button onClick={() => navigate('/how-it-works')} className="btn-secondary">
            How It Works
          </button>
          <button onClick={() => navigate('/login')} className="btn-cta-large">
            Start Free Trial
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
            <div className="footer-links-inline">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              <a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }}>FAQ</a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
              <a href="/schools" onClick={(e) => { e.preventDefault(); navigate('/schools'); }}>For Schools</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;