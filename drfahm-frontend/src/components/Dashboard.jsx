import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedExam, setSelectedExam] = useState(null);
  const [subscriptionTier, setSubscriptionTier] = useState('free'); // 'free', 'basic', 'premium'
  const [worldsData, setWorldsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define world configurations for each exam
  const examWorldConfigs = {
    nafs_g3: {
      name: 'NAFS Grade 3',
      worlds: [
        { id: 1, title: 'Math Basics', questionCount: 100, subject: 'Math' },
        { id: 2, title: 'Math Foundations', questionCount: 150, subject: 'Math' },
        { id: 3, title: 'Math Operations', questionCount: 200, subject: 'Math' },
        { id: 4, title: 'Math Problem Solving', questionCount: 250, subject: 'Math' },
        { id: 5, title: 'Math Mastery', questionCount: 300, subject: 'Math' },
        { id: 6, title: 'Reading Basics', questionCount: 100, subject: 'Reading' },
        { id: 7, title: 'Reading Comprehension', questionCount: 150, subject: 'Reading' },
        { id: 8, title: 'Reading Analysis', questionCount: 200, subject: 'Reading' },
        { id: 9, title: 'Reading Advanced', questionCount: 250, subject: 'Reading' },
        { id: 10, title: 'Reading Mastery', questionCount: 300, subject: 'Reading' }
      ]
    },
    nafs_g6: {
      name: 'NAFS Grade 6',
      worlds: [
        { id: 1, title: 'Math Fundamentals', questionCount: 100, subject: 'Math' },
        { id: 2, title: 'Math Reasoning', questionCount: 150, subject: 'Math' },
        { id: 3, title: 'Math Applications', questionCount: 200, subject: 'Math' },
        { id: 4, title: 'Math Advanced', questionCount: 250, subject: 'Math' },
        { id: 5, title: 'Reading Skills', questionCount: 100, subject: 'Reading' },
        { id: 6, title: 'Reading Comprehension', questionCount: 150, subject: 'Reading' },
        { id: 7, title: 'Reading Analysis', questionCount: 200, subject: 'Reading' },
        { id: 8, title: 'Science Basics', questionCount: 100, subject: 'Science' },
        { id: 9, title: 'Science Concepts', questionCount: 150, subject: 'Science' },
        { id: 10, title: 'Science Mastery', questionCount: 200, subject: 'Science' }
      ]
    },
    nafs_g9: {
      name: 'NAFS Grade 9',
      worlds: [
        { id: 1, title: 'Math Fundamentals', questionCount: 100, subject: 'Math' },
        { id: 2, title: 'Math Algebra', questionCount: 150, subject: 'Math' },
        { id: 3, title: 'Math Geometry', questionCount: 200, subject: 'Math' },
        { id: 4, title: 'Math Advanced', questionCount: 250, subject: 'Math' },
        { id: 5, title: 'Reading Comprehension', questionCount: 100, subject: 'Reading' },
        { id: 6, title: 'Reading Analysis', questionCount: 150, subject: 'Reading' },
        { id: 7, title: 'Reading Advanced', questionCount: 200, subject: 'Reading' },
        { id: 8, title: 'Science Foundations', questionCount: 100, subject: 'Science' },
        { id: 9, title: 'Science Applications', questionCount: 150, subject: 'Science' },
        { id: 10, title: 'Science Mastery', questionCount: 200, subject: 'Science' }
      ]
    },
    qudurat: {
      name: 'Qudurat (القدرات)',
      worlds: [
        { id: 1, title: 'Math Basics', questionCount: 100, subject: 'Math' },
        { id: 2, title: 'Math Arithmetic', questionCount: 150, subject: 'Math' },
        { id: 3, title: 'Math Algebra', questionCount: 200, subject: 'Math' },
        { id: 4, title: 'Math Geometry', questionCount: 250, subject: 'Math' },
        { id: 5, title: 'Math Advanced', questionCount: 300, subject: 'Math' },
        { id: 6, title: 'Verbal Basics', questionCount: 100, subject: 'Verbal' },
        { id: 7, title: 'Verbal Comprehension', questionCount: 150, subject: 'Verbal' },
        { id: 8, title: 'Verbal Analogies', questionCount: 200, subject: 'Verbal' },
        { id: 9, title: 'Verbal Advanced', questionCount: 250, subject: 'Verbal' },
        { id: 10, title: 'Verbal Mastery', questionCount: 300, subject: 'Verbal' }
      ]
    },
    tahsili: {
      name: 'Tahsili (التحصيلي)',
      worlds: [
        { id: 1, title: 'Math Fundamentals', questionCount: 100, subject: 'Math' },
        { id: 2, title: 'Math Applications', questionCount: 150, subject: 'Math' },
        { id: 3, title: 'Math Advanced', questionCount: 200, subject: 'Math' },
        { id: 4, title: 'Math Mastery', questionCount: 250, subject: 'Math' },
        { id: 5, title: 'Biology Basics', questionCount: 100, subject: 'Biology' },
        { id: 6, title: 'Biology Advanced', questionCount: 150, subject: 'Biology' },
        { id: 7, title: 'Chemistry Basics', questionCount: 100, subject: 'Chemistry' },
        { id: 8, title: 'Chemistry Advanced', questionCount: 150, subject: 'Chemistry' },
        { id: 9, title: 'Physics Basics', questionCount: 100, subject: 'Physics' },
        { id: 10, title: 'Physics Advanced', questionCount: 150, subject: 'Physics' }
      ]
    }
  };

  // Determine world lock status based on subscription tier
  const getMaxUnlockedWorld = () => {
    switch (subscriptionTier) {
      case 'free':
        return 2; // Worlds 1-2
      case 'basic':
        return 5; // Worlds 1-5
      case 'premium':
        return 10; // Worlds 1-10
      default:
        return 2;
    }
  };

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get exam selection from route state or user profile
    const examFromRoute = location.state?.exam;
    const examFromUser = user?.selectedExam;
    const exam = examFromRoute || examFromUser || 'qudurat'; // Default to Qudurat

    setSelectedExam(exam);

    // Get subscription tier from user profile
    const tier = user?.subscriptionTier || location.state?.trial ? 'free' : 'free';
    setSubscriptionTier(tier);

    // Load worlds for selected exam
    if (examWorldConfigs[exam]) {
      const worlds = examWorldConfigs[exam].worlds.map((world, index) => ({
        ...world,
        isLocked: index >= getMaxUnlockedWorld(),
        progress: 0, // TODO: Load actual progress from backend
        completed: false // TODO: Load actual completion status from backend
      }));
      setWorldsData(worlds);
    }

    setLoading(false);
  }, [isAuthenticated, location.state, user, navigate]);

  const handleWorldClick = (world) => {
    if (world.isLocked) {
      // Show upgrade prompt
      alert('This world is locked. Upgrade your subscription to unlock it!');
      navigate('/pricing');
      return;
    }

    // Navigate to practice page for this world
    navigate('/practice', { 
      state: { 
        worldId: world.id, 
        exam: selectedExam,
        worldTitle: world.title
      } 
    });
  };

  const handleExamChange = (newExam) => {
    setSelectedExam(newExam);
    if (examWorldConfigs[newExam]) {
      const worlds = examWorldConfigs[newExam].worlds.map((world, index) => ({
        ...world,
        isLocked: index >= getMaxUnlockedWorld(),
        progress: 0,
        completed: false
      }));
      setWorldsData(worlds);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--navy-950)',
        color: 'var(--text-primary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--border)',
            borderTop: '4px solid var(--accent-primary)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }} />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy-950)',
      color: 'var(--text-primary)'
    }}>
      {/* Header */}
      <header style={{
        background: 'var(--navy-900)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'var(--font-weight-bold)',
            cursor: 'pointer'
          }} onClick={() => navigate('/')}>
            Dr Fahm
          </h1>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              Welcome, {user?.name || 'Student'}
            </span>
            
            <button
              onClick={() => navigate('/settings')}
              style={{
                padding: '8px 16px',
                background: 'var(--navy-800)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        {/* Exam Selector */}
        <div style={{
          background: 'var(--navy-900)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'var(--font-weight-black)',
                marginBottom: '8px'
              }}>
                {selectedExam && examWorldConfigs[selectedExam]?.name}
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)'
              }}>
                Your subscription: <strong style={{ color: 'var(--accent-primary)', textTransform: 'capitalize' }}>{subscriptionTier}</strong>
                {' '}· Access to worlds 1-{getMaxUnlockedWorld()}
              </p>
            </div>

            <button
              onClick={() => navigate('/pricing')}
              style={{
                padding: '12px 24px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Upgrade Plan
            </button>
          </div>

          {/* Exam Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {Object.keys(examWorldConfigs).map((examKey) => (
              <button
                key={examKey}
                onClick={() => handleExamChange(examKey)}
                style={{
                  padding: '10px 20px',
                  background: selectedExam === examKey ? 'var(--accent-primary)' : 'var(--navy-800)',
                  border: `1px solid ${selectedExam === examKey ? 'var(--accent-primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  color: selectedExam === examKey ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
              >
                {examWorldConfigs[examKey].name}
              </button>
            ))}
          </div>
        </div>

        {/* World Map */}
        <div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '32px'
          }}>
            Your Learning Journey
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {worldsData.map((world) => (
              <div
                key={world.id}
                onClick={() => handleWorldClick(world)}
                style={{
                  background: world.isLocked ? 'var(--navy-900)' : 'var(--navy-800)',
                  border: `2px solid ${world.isLocked ? 'var(--border-subtle)' : 'var(--border-medium)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '32px',
                  cursor: world.isLocked ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  opacity: world.isLocked ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!world.isLocked) {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!world.isLocked) {
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {world.isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    fontSize: '24px'
                  }}>
                    🔒
                  </div>
                )}

                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: 'rgba(79, 70, 229, 0.1)',
                  border: '1px solid rgba(79, 70, 229, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--accent-primary)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  World {world.id}
                </div>

                <h4 style={{
                  fontSize: '22px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: '12px'
                }}>
                  {world.title}
                </h4>

                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px'
                }}>
                  {world.subject} · {world.questionCount} questions
                </p>

                {!world.isLocked && (
                  <>
                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'var(--navy-950)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        width: `${world.progress}%`,
                        height: '100%',
                        background: 'var(--accent-primary)',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>

                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      marginBottom: '16px'
                    }}>
                      Progress: {world.progress}%
                    </p>
                  </>
                )}

                {world.isLocked ? (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    color: '#EF4444',
                    textAlign: 'center'
                  }}>
                    Upgrade to unlock
                  </div>
                ) : (
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    background: world.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--accent-primary)',
                    border: world.completed ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                    borderRadius: 'var(--radius-md)',
                    color: world.completed ? '#10B981' : '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}>
                    {world.completed ? '✓ Completed' : 'Start Practice'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {subscriptionTier === 'free' && (
          <div style={{
            marginTop: '48px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, var(--navy-900) 100%)',
            border: '2px solid var(--accent-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'var(--font-weight-black)',
              marginBottom: '16px'
            }}>
              Unlock all 10 worlds
            </h3>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '32px'
            }}>
              Upgrade to Basic or Premium to access advanced practice and complete mastery
            </p>
            <button
              onClick={() => navigate('/pricing')}
              style={{
                padding: '16px 48px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              View Pricing Plans
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;