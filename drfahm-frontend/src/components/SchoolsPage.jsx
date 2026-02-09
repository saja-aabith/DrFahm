import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketing.css';

function SchoolsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    repName: '',
    repEmail: '',
    nafsStudents: '',
    quduratStudents: '',
    tahsiliStudents: '',
    accessDuration: '3months'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Prepare email body
    const emailBody = `
School Enquiry

School Name: ${formData.schoolName}
Representative Name: ${formData.repName}
Representative Email: ${formData.repEmail}

Students needing access:
- NAFS: ${formData.nafsStudents || '0'}
- Qudurat: ${formData.quduratStudents || '0'}
- Tahsili: ${formData.tahsiliStudents || '0'}

Access Duration: ${formData.accessDuration}
    `;

    try {
      // Send email via mailto (basic implementation)
      const mailtoLink = `mailto:info@drfahm.com?subject=School Access Enquiry - ${formData.schoolName}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      setSubmitMessage('Email client opened! Please send the email to complete your request.');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          schoolName: '',
          repName: '',
          repEmail: '',
          nafsStudents: '',
          quduratStudents: '',
          tahsiliStudents: '',
          accessDuration: '3months'
        });
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setSubmitMessage('Error opening email client. Please email info@drfahm.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalStudents = () => {
    const nafs = parseInt(formData.nafsStudents) || 0;
    const qudurat = parseInt(formData.quduratStudents) || 0;
    const tahsili = parseInt(formData.tahsiliStudents) || 0;
    return nafs + qudurat + tahsili;
  };

  const getPricePerStudent = () => {
    const total = getTotalStudents();
    if (total >= 50 && total <= 100) return 'SAR 180';
    if (total >= 101 && total <= 300) return 'SAR 150';
    if (total >= 301 && total <= 600) return 'SAR 120';
    if (total >= 600) return 'Custom';
    return 'N/A';
  };

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
            <button onClick={() => navigate('/login')} className="btn-nav-primary">
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Why Schools Must Prepare */}
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
            For Schools & Organizations
          </div>

          <h1 className="page-title">
            Why schools must prepare students for NAFS, Qudurat, and Tahsili
          </h1>
          
          <p className="page-subtitle">
            Schools that prepare students systematically demonstrate institutional excellence.
          </p>
        </div>
      </section>

      {/* Key Reasons */}
      <section className="content-section">
        <div className="content-container">
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <div className="feature-block">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
              <h3>Student Readiness</h3>
              <p>
                NAFS, Qudurat, and Tahsili determine university placement and future pathways. 
              </p>
            </div>

            <div className="feature-block">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
              <h3>National Benchmarking</h3>
              <p>
                NAFS provides transparent national benchmarks. Schools with systematic 
                preparation frameworks show measurable progress and institutional accountability.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏆</div>
              <h3>School Reputation</h3>
              <p>
                Systematic preparation distinguishes leading institutions from the rest.
              </p>
            </div>

            <div className="feature-block">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎓</div>
              <h3>University Admissions</h3>
              <p>
                Qudurat and Tahsili scores directly impact university admissions. Schools 
                that prioritise preparation help students access better higher education opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="content-section bg-slate">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            School pricing bands (SAR per student per year)
          </h2>

          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto 48px',
            background: 'var(--navy-800)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden'
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
                    padding: '20px 32px',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    Number of students
                  </th>
                  <th style={{
                    padding: '20px 32px',
                    textAlign: 'right',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    Price per student
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 32px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    50–100
                  </td>
                  <td style={{
                    padding: '20px 32px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    SAR 180
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 32px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    101–300
                  </td>
                  <td style={{
                    padding: '20px 32px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    SAR 150
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 32px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    301–600
                  </td>
                  <td style={{
                    padding: '20px 32px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    SAR 120
                  </td>
                </tr>
                <tr>
                  <td style={{
                    padding: '20px 32px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    600+
                  </td>
                  <td style={{
                    padding: '20px 32px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent-primary)'
                  }}>
                    Custom
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* What's Included */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'rgba(79, 70, 229, 0.05)',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: '20px'
            }}>
              What this includes
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Full Premium access for students',
                'School dashboards and leaderboards',
                'Academic year access (9–10 months)',
                'Admin support',
                'Termly usage reports'
              ].map((item, index) => (
                <li key={index} style={{
                  padding: '12px 0',
                  borderBottom: index < 4 ? '1px solid var(--border-subtle)' : 'none',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '18px' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Request school access
          </h2>

          <p className="section-body" style={{ 
            textAlign: 'center',
            marginBottom: '48px',
            fontSize: '17px'
          }}>
            Fill out the form below and we'll contact you within 24 hours to discuss implementation.
          </p>

          {submitMessage && (
            <div style={{
              background: 'rgba(79, 70, 229, 0.1)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'center',
              color: 'var(--accent-primary)'
            }}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            background: 'var(--navy-800)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px'
          }}>
            {/* School Name */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
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
                  padding: '14px 16px',
                  background: 'var(--navy-950)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Representative Name */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Representative Name *
              </label>
              <input
                type="text"
                name="repName"
                value={formData.repName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--navy-950)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Representative Email */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Representative Email *
              </label>
              <input
                type="email"
                name="repEmail"
                value={formData.repEmail}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--navy-950)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Student Numbers */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '20px'
              }}>
                Number of students needing access
              </h4>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  NAFS (Grades 3, 6, 9)
                </label>
                <input
                  type="number"
                  name="nafsStudents"
                  value={formData.nafsStudents}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--navy-950)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  Qudurat
                </label>
                <input
                  type="number"
                  name="quduratStudents"
                  value={formData.quduratStudents}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--navy-950)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '0' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  Tahsili
                </label>
                <input
                  type="number"
                  name="tahsiliStudents"
                  value={formData.tahsiliStudents}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--navy-950)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '15px'
                  }}
                />
              </div>

              {getTotalStudents() > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(79, 70, 229, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Total students:</strong> {getTotalStudents()}
                  <br />
                  <strong style={{ color: 'var(--text-primary)' }}>Estimated price per student:</strong> {getPricePerStudent()}
                </div>
              )}
            </div>

            {/* Access Duration */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
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
                  padding: '14px 16px',
                  background: 'var(--navy-950)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <option value="7days">7-day trial</option>
                <option value="3months">3 months</option>
                <option value="6months">6 months</option>
                <option value="academic_year">Full academic year (9-10 months)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta-primary"
              style={{
                width: '100%',
                fontSize: '16px',
                padding: '16px'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>

            <p style={{
              marginTop: '16px',
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              textAlign: 'center'
            }}>
              We'll contact you within 24 hours to discuss your requirements
            </p>
          </form>
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
              <a href="#qudurat" onClick={() => navigate('/qudurat')}>Qudurat</a>
              <a href="#tahsili" onClick={() => navigate('/tahsili')}>Tahsili</a>
              <a href="#nafs" onClick={() => navigate('/nafs')}>NAFS</a>
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

export default SchoolsPage;