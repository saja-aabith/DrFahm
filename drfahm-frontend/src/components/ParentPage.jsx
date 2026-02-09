import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function ParentPage() {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    studentName: '',
    studentSchool: '',
    studentEmail: '',
    accessDuration: '7days'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const examInfo = [
    {
      id: 'nafs_g3',
      title: 'NAFS Grade 3',
      summary: 'The National Assessment of Fundamental Skills (NAFS) for Grade 3 evaluates foundational literacy and numeracy skills critical for early academic development.',
      content: 'Covers basic reading comprehension, mathematical operations (addition, subtraction), and problem-solving skills appropriate for 3rd graders.',
      structure: 'Multiple-choice questions assessing reading, writing, and basic mathematics. Typically administered in Arabic with age-appropriate question formats.',
      link: 'https://etec.gov.sa/en/programs/nafs'
    },
    {
      id: 'nafs_g6',
      title: 'NAFS Grade 6',
      summary: 'NAFS for Grade 6 measures intermediate academic skills in language and mathematics, ensuring students are progressing appropriately through primary education.',
      content: 'Includes reading comprehension, writing skills, mathematical reasoning (fractions, decimals, basic geometry), and critical thinking.',
      structure: 'Standardized assessment with multiple-choice and short-answer questions. Tests are designed to measure proficiency against national benchmarks.',
      link: 'https://etec.gov.sa/en/programs/nafs'
    },
    {
      id: 'nafs_g9',
      title: 'NAFS Grade 9',
      summary: 'NAFS for Grade 9 assesses advanced fundamental skills as students transition to secondary education, focusing on literacy, numeracy, and scientific reasoning.',
      content: 'Covers advanced reading comprehension, essay writing, algebra, geometry, basic sciences, and analytical thinking skills.',
      structure: 'Comprehensive assessment including multiple sections for language, mathematics, and science. Results inform secondary school readiness.',
      link: 'https://etec.gov.sa/en/programs/nafs'
    },
    {
      id: 'qudurat',
      title: 'Qudurat (القدرات)',
      summary: 'The General Aptitude Test (Qudurat) measures analytical and inferential abilities essential for university-level learning, rather than memorized knowledge.',
      content: 'Divided into Verbal (reading comprehension, analogies, sentence completion) and Quantitative (arithmetic, algebra, geometry, statistics) sections.',
      structure: 'Multiple-choice format with 120 questions total. Typically taken in Grade 11-12. Scores are used alongside high school GPA for university admissions.',
      link: 'https://etec.gov.sa/en/services/qiyas/tests/general-aptitude-test'
    },
    {
      id: 'tahsili',
      title: 'Tahsili (التحصيلي)',
      summary: 'The Achievement Test (Tahsili) evaluates mastery of secondary school curriculum content across mathematics, sciences, English, and Arabic language.',
      content: 'Covers Mathematics, Physics, Chemistry, Biology, and English based on secondary school curriculum. Available in separate tracks for Science and Arts streams.',
      structure: 'Multiple-choice questions testing curriculum knowledge. Typically taken in Grade 12. Scores complement Qudurat results for university admissions.',
      link: 'https://etec.gov.sa/en/services/qiyas/tests/achievement-test'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleExamSelect = (examId) => {
    setSelectedExam(examId);
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const selectedExamInfo = examInfo.find(exam => exam.id === selectedExam);
    
    const emailBody = `
Parent Registration Request

Selected Exam: ${selectedExamInfo.title}

Parent Details:
- Name: ${formData.parentName}
- Email: ${formData.parentEmail}

Student Details:
- Name: ${formData.studentName}
- School: ${formData.studentSchool}
- Email: ${formData.studentEmail}

Access Duration: ${formData.accessDuration}
    `;

    try {
      const mailtoLink = `mailto:info@drfahm.com?subject=Parent Registration - ${selectedExamInfo.title}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      setSubmitMessage('Registration request sent! We\'ll contact you within 24 hours to complete setup.');
      
      setTimeout(() => {
        setFormData({
          parentName: '',
          parentEmail: '',
          studentName: '',
          studentSchool: '',
          studentEmail: '',
          accessDuration: '7days'
        });
        setSelectedExam(null);
        setShowCTA(false);
        setSubmitMessage('');
      }, 3000);
    } catch (error) {
      setSubmitMessage('Error sending request. Please email info@drfahm.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Prepare your child for national assessments that shape their future
          </h1>
          
          <p className="page-subtitle">
            NAFS, Qudurat, and Tahsili determine university placement and educational pathways. 
            Understanding these exams early gives your child the preparation advantage.
          </p>

          <p className="page-body">
            Dr Fahm helps parents support their children's readiness through structured practice, 
            clear progress tracking, and expert preparation for the exams that matter most.
          </p>
        </div>
      </section>

      {/* Exam Information Cards */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Understanding the national assessments
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {examInfo.map((exam) => (
              <div
                key={exam.id}
                style={{
                  background: 'var(--navy-800)',
                  border: '2px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: '16px'
                }}>
                  {exam.title}
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    What it is
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {exam.summary}
                  </p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Content covered
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {exam.content}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Assessment structure
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {exam.structure}
                  </p>
                </div>

                <a
                  href={exam.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px';
                  }}
                >
                  Learn more (ETEC official page)
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>
            Ready to get your child started?
          </h2>
          
          <p className="section-body" style={{ 
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            Choose the exam your child needs to prepare for and complete a quick registration.
          </p>

          <button
            onClick={() => setShowCTA(!showCTA)}
            className="btn-cta-primary"
            style={{
              fontSize: '18px',
              padding: '18px 48px'
            }}
          >
            {showCTA ? 'Hide exam options' : 'Get my child started!'}
          </button>

          {/* Exam Selection Dropdown */}
          {showCTA && (
            <div style={{
              marginTop: '40px',
              background: 'var(--navy-800)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '24px'
              }}>
                Select your child's exam
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {examInfo.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => handleExamSelect(exam.id)}
                    style={{
                      padding: '16px',
                      background: selectedExam === exam.id ? 'var(--accent-primary)' : 'var(--navy-950)',
                      border: `2px solid ${selectedExam === exam.id ? 'var(--accent-primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-lg)',
                      color: selectedExam === exam.id ? '#FFFFFF' : 'var(--text-primary)',
                      fontSize: '15px',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      fontFamily: 'inherit'
                    }}
                  >
                    {exam.title}
                  </button>
                ))}
              </div>

              {/* Registration Form */}
              {selectedExam && (
                <form onSubmit={handleSubmit} style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '32px',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  {submitMessage && (
                    <div style={{
                      background: 'rgba(79, 70, 229, 0.1)',
                      border: '1px solid rgba(79, 70, 229, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      marginBottom: '24px',
                      color: 'var(--accent-primary)',
                      fontSize: '14px'
                    }}>
                      {submitMessage}
                    </div>
                  )}

                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '24px',
                    textAlign: 'left'
                  }}>
                    Complete registration for {examInfo.find(e => e.id === selectedExam)?.title}
                  </h4>

                  {/* Parent Details */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    marginBottom: '24px'
                  }}>
                    <h5 style={{
                      fontSize: '16px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: '16px'
                    }}>
                      Parent Information
                    </h5>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  </div>

                  {/* Student Details */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    marginBottom: '24px'
                  }}>
                    <h5 style={{
                      fontSize: '16px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: '16px'
                    }}>
                      Student Information
                    </h5>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        School Name *
                      </label>
                      <input
                        type="text"
                        name="studentSchool"
                        value={formData.studentSchool}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        Student Email *
                      </label>
                      <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '15px',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  </div>

                  {/* Access Duration */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      textAlign: 'left'
                    }}>
                      Preferred Access Duration *
                    </label>
                    <select
                      name="accessDuration"
                      value={formData.accessDuration}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'var(--navy-950)',
                        border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="7days">7-day free trial</option>
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cta-primary"
                    style={{
                      width: '100%',
                      fontSize: '16px'
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                  </button>

                  <p style={{
                    marginTop: '16px',
                    fontSize: '13px',
                    color: 'var(--text-tertiary)',
                    textAlign: 'center'
                  }}>
                    We'll contact you within 24 hours to confirm access
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-institutional">
        <div className="footer-container">
          <div className="footer-simple">
            <div className="footer-brand">
              <h3>Dr Fahm</h3>
              <p>The Blueprint for 100%</p>
            </div>

            <nav className="footer-links-inline">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              <a href="/pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }}>Pricing</a>
              <a href="/schools" onClick={(e) => { e.preventDefault(); navigate('/schools'); }}>Schools</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ParentPage;