import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function StudentPage() {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState('form'); // 'form', 'verify', 'success'
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    schoolName: '',
    studentEmail: ''
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
      link: 'https://etec.gov.https://etec.gov.sa/en/centers/qiyas/p/p-7d1870ff-a881-4e9a-9f9d-8f2a2c4df032/en/services/qiyas/tests/general-aptitude-test'
    },
    {
      id: 'tahsili',
      title: 'Tahsili (التحصيلي)',
      summary: 'The Achievement Test (Tahsili) evaluates mastery of secondary school curriculum content across mathematics, sciences, English, and Arabic language.',
      content: 'Covers Mathematics, Physics, Chemistry, Biology, and English based on secondary school curriculum. Available in separate tracks for Science and Arts streams.',
      structure: 'Multiple-choice questions testing curriculum knowledge. Typically taken in Grade 12. Scores complement Qudurat results for university admissions.',
      link: 'https://etec.gov.sa/en/services/https://etec.gov.sa/en/centers/qiyas/tests/achievement-test'
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
    setVerificationStep('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const selectedExamInfo = examInfo.find(exam => exam.id === selectedExam);
    
    // Simulate sending verification email
    // In production, this would call your backend API
    try {
      // For demo purposes, we'll just simulate the verification step
      setVerificationStep('verify');
      setSubmitMessage('Verification code sent to ' + formData.studentEmail);
      
      // Simulate sending registration data to info@drfahm.com
      const emailBody = `
Student Registration (Pending Email Verification)

Selected Exam: ${selectedExamInfo.title}
Student Name: ${formData.studentName}
School: ${formData.schoolName}
Email: ${formData.studentEmail}
Access Type: 7-day free trial
      `;
      
      const mailtoLink = `mailto:info@drfahm.com?subject=Student Registration - ${selectedExamInfo.title}&body=${encodeURIComponent(emailBody)}`;
      // Note: In production, this would be handled by backend
      console.log('Registration email would be sent:', mailtoLink);
      
    } catch (error) {
      setSubmitMessage('Error sending verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verification
    // In production, this would verify the code with your backend
    if (verificationCode.length === 6) {
      setTimeout(() => {
        setVerificationStep('success');
        setSubmitMessage('Email verified! Your 7-day free trial has started.');
        setIsSubmitting(false);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard', { state: { exam: selectedExam, trial: true } });
        }, 2000);
      }, 1000);
    } else {
      setSubmitMessage('Please enter a valid 6-digit code');
      setIsSubmitting(false);
    }
  };

  // Upgrade Modal Component
  const UpgradeModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--navy-900)',
        border: '2px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '40px',
        position: 'relative'
      }}>
        <button
          onClick={() => setShowUpgradeModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            lineHeight: 1
          }}
        >
          ×
        </button>

        <h2 style={{
          fontSize: '32px',
          fontWeight: 'var(--font-weight-black)',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Your trial has ended!
        </h2>

        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Continue your learning journey with Basic or Premium access
        </p>

        {/* Pricing Comparison Table */}
        <div style={{
          background: 'var(--navy-800)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                background: 'rgba(79, 70, 229, 0.1)',
                borderBottom: '2px solid var(--border-medium)'
              }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  Feature
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  Free Practice (Trial)
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  Basic
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--accent-primary)'
                }}>
                  Premium ⭐ Best Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Price</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-primary)' }}>Free</td>
                <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>SAR 199</td>
                <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'var(--font-weight-bold)', color: 'var(--accent-primary)' }}>SAR 299</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Access period</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Limited (eg 7 days)</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>3 months</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--accent-primary)', fontWeight: 'var(--font-weight-semibold)' }}>6 months</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Worlds unlocked</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Worlds 1–2</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Worlds 1–5</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--accent-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Worlds 1–10</td>
              </tr>
              <tr>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Question bank depth</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Limited</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Expanded</td>
                <td style={{ padding: '16px', textAlign: 'center', color: 'var(--accent-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Full</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <button
            onClick={() => navigate('/pricing')}
            style={{
              padding: '16px 24px',
              background: 'var(--navy-800)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontFamily: 'inherit'
            }}
          >
            Upgrade to Basic
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              SAR 199 · 3 months
            </div>
          </button>

          <button
            onClick={() => navigate('/pricing')}
            style={{
              padding: '16px 24px',
              background: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              borderRadius: 'var(--radius-lg)',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 'var(--font-weight-bold)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontFamily: 'inherit'
            }}
          >
            Upgrade to Premium ⭐
            <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
              SAR 299 · 6 months
            </div>
          </button>
        </div>

        <p style={{
          marginTop: '24px',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          textAlign: 'center'
        }}>
          Continue practicing to master your exam
        </p>
      </div>
    </div>
  );

  return (
    <div className="marketing-page">
      {/* Show upgrade modal when triggered */}
      {showUpgradeModal && <UpgradeModal />}

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
            Get ready for the exams that shape your future
          </h1>
          
          <p className="page-subtitle">
            NAFS, Qudurat, and Tahsili aren't just tests — they're gateways to university and career opportunities. 
            Start preparing the right way, today.
          </p>

          <p className="page-body">
            Dr Fahm gives you structured practice, instant feedback, and clear progress tracking 
            for the national assessments that matter most to your educational journey.
          </p>
        </div>
      </section>

      {/* Exam Information Cards - Same as ParentPage */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Understanding your exam options
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
                >
                  Learn more (ETEC official page) →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>
            Ready to start preparing?
          </h2>
          
          <p className="section-body" style={{ 
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            Choose your exam and start your 7-day free trial with instant access to practice questions.
          </p>

          <button
            onClick={() => setShowCTA(!showCTA)}
            className="btn-cta-primary"
            style={{
              fontSize: '18px',
              padding: '18px 48px'
            }}
          >
            {showCTA ? 'Hide exam options' : "Let's get started!"}
          </button>

          {/* Exam Selection & Registration */}
          {showCTA && (
            <div style={{
              marginTop: '40px',
              background: 'var(--navy-800)',
              border: '2px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              animation: 'fadeIn 0.3s ease'
            }}>
              {verificationStep === 'form' && (
                <>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '24px'
                  }}>
                    Select your exam
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

                  {selectedExam && (
                    <form onSubmit={handleSubmit} style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '32px'
                    }}>
                      {submitMessage && verificationStep === 'form' && (
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
                        Sign up for {examInfo.find(e => e.id === selectedExam)?.title}
                      </h4>

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
                          name="schoolName"
                          value={formData.schoolName}
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

                      <div style={{ marginBottom: '24px' }}>
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
                        <p style={{
                          fontSize: '13px',
                          color: 'var(--text-tertiary)',
                          marginTop: '8px',
                          textAlign: 'left'
                        }}>
                          We'll send a verification code to this email
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-cta-primary"
                        style={{
                          width: '100%',
                          fontSize: '16px'
                        }}
                      >
                        {isSubmitting ? 'Sending code...' : 'Sign Up & Start 7-Day Trial'}
                      </button>
                    </form>
                  )}
                </>
              )}

              {verificationStep === 'verify' && (
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '16px'
                  }}>
                    Verify your email
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    marginBottom: '32px'
                  }}>
                    We've sent a 6-digit verification code to {formData.studentEmail}
                  </p>

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

                  <form onSubmit={handleVerification}>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                      }}>
                        Enter verification code
                      </label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        placeholder="000000"
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: 'var(--navy-950)',
                          border: '1.5px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                          fontSize: '24px',
                          fontFamily: 'monospace',
                          textAlign: 'center',
                          letterSpacing: '8px'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || verificationCode.length !== 6}
                      className="btn-cta-primary"
                      style={{
                        width: '100%',
                        fontSize: '16px'
                      }}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify & Start Trial'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setVerificationStep('form')}
                      style={{
                        width: '100%',
                        marginTop: '16px',
                        padding: '14px',
                        background: 'none',
                        border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      Back to form
                    </button>
                  </form>
                </div>
              )}

              {verificationStep === 'success' && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'rgba(79, 70, 229, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>
                    ✓
                  </div>

                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '16px'
                  }}>
                    Welcome to Dr Fahm!
                  </h3>

                  <p style={{
                    fontSize: '18px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px'
                  }}>
                    Your 7-day free trial has started
                  </p>

                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text-tertiary)'
                  }}>
                    Redirecting to your dashboard...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Test Upgrade Modal Button (for development) */}
      <section className="content-section" style={{ textAlign: 'center' }}>
        <button
          onClick={() => setShowUpgradeModal(true)}
          style={{
            padding: '12px 24px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#EF4444',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Preview Upgrade Modal (Dev Only)
        </button>
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
            <p>&copy; 2025 Dr Fahm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentPage;