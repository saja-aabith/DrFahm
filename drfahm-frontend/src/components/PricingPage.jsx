import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './marketing.css';

function PricingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Practice',
      subtitle: 'Trial',
      price: 'Free',
      priceAmount: 0,
      duration: 'Limited (eg 7 days)',
      worldsUnlocked: 'Worlds 1–2',
      questionBank: 'Limited',
      features: [
        'Basic practice questions',
        'Limited question bank',
        'Access to first 2 worlds',
        '7-day access',
        'Basic progress tracking'
      ],
      cta: 'Start Free Trial',
      highlight: false,
      stripe: false
    },
    {
      id: 'basic',
      name: 'Basic',
      subtitle: 'For dedicated students',
      price: 'SAR 199',
      priceAmount: 199,
      duration: '3 months',
      worldsUnlocked: 'Worlds 1–5',
      questionBank: 'Expanded',
      features: [
        'Expanded question bank',
        'Access to worlds 1-5',
        '3 months full access',
        'Progress tracking & analytics',
        'Email support',
        'Mobile & desktop access'
      ],
      cta: 'Subscribe to Basic',
      highlight: false,
      stripe: true,
      stripePriceId: 'price_basic_3months' // Replace with actual Stripe Price ID
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: '⭐ Best Value',
      price: 'SAR 299',
      priceAmount: 299,
      duration: '6 months',
      worldsUnlocked: 'Worlds 1–10',
      questionBank: 'Full',
      features: [
        'Full question bank access',
        'All 10 worlds unlocked',
        '6 months full access',
        'Advanced analytics & insights',
        'Priority email support',
        'Mobile & desktop access',
        'Downloadable progress reports'
      ],
      cta: 'Subscribe to Premium',
      highlight: true,
      stripe: true,
      stripePriceId: 'price_premium_6months' // Replace with actual Stripe Price ID
    }
  ];

  const handleSubscribe = async (plan) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // Store intended plan in sessionStorage to redirect back after login
      sessionStorage.setItem('intendedPlan', plan.id);
      navigate('/login', { state: { from: '/pricing', plan: plan.id } });
      return;
    }

    // If free trial, navigate to student page
    if (plan.id === 'free') {
      navigate('/student');
      return;
    }

    // For paid plans, process Stripe payment
    if (plan.stripe) {
      setIsProcessing(true);
      
      try {
        // Call your backend to create Stripe Checkout session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // If you use JWT
          },
          body: JSON.stringify({
            priceId: plan.stripePriceId,
            userId: user.id,
            planId: plan.id,
            successUrl: `${window.location.origin}/payment/success`,
            cancelUrl: `${window.location.origin}/pricing`
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { sessionId, url } = await response.json();

        // Redirect to Stripe Checkout
        if (url) {
          window.location.href = url;
        } else {
          // Fallback: use Stripe.js
          const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
          await stripe.redirectToCheckout({ sessionId });
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Failed to process payment. Please try again or contact support.');
        setIsProcessing(false);
      }
    }
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
              {isAuthenticated ? 'Dashboard' : 'Login / Sign Up'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="content-container-narrow">
          <h1 className="page-title">
            Choose your learning plan
          </h1>
          
          <p className="page-subtitle">
            Start with a free trial, then upgrade when you're ready for full access
          </p>

          <p className="page-body">
            All plans include bilingual practice (Arabic & English), instant feedback, 
            and progress tracking for NAFS, Qudurat, and Tahsili exams.
          </p>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Easy Access
          </h2>

          {/* Full Comparison Table */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto 48px',
            background: 'var(--navy-800)',
            border: '2px solid var(--border-medium)',
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
                    padding: '20px 24px',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)',
                    minWidth: '180px'
                  }}>
                    Feature
                  </th>
                  <th style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    Free Practice (Trial)
                  </th>
                  <th style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    Basic
                  </th>
                  <th style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent-primary)',
                    background: 'rgba(79, 70, 229, 0.05)'
                  }}>
                    Premium ⭐ Best Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 24px',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)'
                  }}>
                    Price
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    Free
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-primary)'
                  }}>
                    SAR 199
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent-primary)',
                    background: 'rgba(79, 70, 229, 0.05)'
                  }}>
                    SAR 299
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 24px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Access period
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Limited (eg 7 days)
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)'
                  }}>
                    3 months
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    background: 'rgba(79, 70, 229, 0.05)'
                  }}>
                    6 months
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '20px 24px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Worlds unlocked
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Worlds 1–2
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)'
                  }}>
                    Worlds 1–5
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    background: 'rgba(79, 70, 229, 0.05)'
                  }}>
                    Worlds 1–10
                  </td>
                </tr>
                <tr>
                  <td style={{
                    padding: '20px 24px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Question bank depth
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    Limited
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)'
                  }}>
                    Expanded
                  </td>
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--accent-primary)',
                    background: 'rgba(79, 70, 229, 0.05)'
                  }}>
                    Full
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, var(--navy-800) 100%)' : 'var(--navy-800)',
                  border: plan.highlight ? '3px solid var(--accent-primary)' : '2px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '40px 32px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent-primary)',
                    color: '#FFFFFF',
                    padding: '6px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: '0.5px'
                  }}>
                    BEST VALUE
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 'var(--font-weight-black)',
                    color: plan.highlight ? 'var(--accent-primary)' : 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {plan.subtitle}
                  </p>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: 'var(--font-weight-black)',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    {plan.price}
                  </div>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)'
                  }}>
                    {plan.duration}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  marginBottom: '24px',
                  flex: 1
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} style={{
                        padding: '10px 0',
                        borderBottom: index < plan.features.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        fontSize: '15px',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <span style={{
                          color: plan.highlight ? 'var(--accent-primary)' : 'var(--text-primary)',
                          fontSize: '18px',
                          flexShrink: 0
                        }}>
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: plan.highlight ? 'var(--accent-primary)' : 'var(--navy-950)',
                    border: plan.highlight ? 'none' : '2px solid var(--border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    color: plan.highlight ? '#FFFFFF' : 'var(--text-primary)',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-bold)',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)',
                    fontFamily: 'inherit',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                >
                  {isProcessing ? 'Processing...' : plan.cta}
                </button>

                {!isAuthenticated && plan.stripe && (
                  <p style={{
                    marginTop: '12px',
                    fontSize: '13px',
                    color: 'var(--text-tertiary)',
                    textAlign: 'center'
                  }}>
                    Login required to subscribe
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="content-section bg-slate">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Secure payment methods
          </h2>

          <p className="section-body" style={{
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '17px'
          }}>
            We accept Mada and major debit cards. All payments are processed securely through Stripe.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '16px 24px',
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '18px',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)'
            }}>
              MADA
            </div>
            <div style={{
              padding: '16px 24px',
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '18px',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)'
            }}>
              Visa
            </div>
          </div>

          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'rgba(79, 70, 229, 0.05)',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              🔒 Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="content-section">
        <div className="content-container-narrow">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Frequently asked questions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px'
          }}>
            <div style={{
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                Can I cancel anytime?
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Yes. Your subscription continues until the end of your current period, 
                then automatically cancels. No refunds for partial months.
              </p>
            </div>

            <div style={{
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                Can I upgrade from Basic to Premium?
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Yes. You'll be charged the prorated difference and your access will 
                immediately upgrade to Premium with all worlds unlocked.
              </p>
            </div>

            <div style={{
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                What happens after my subscription expires?
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Your progress is saved, but practice access is restricted to the free 
                trial level (Worlds 1-2) until you renew.
              </p>
            </div>

            <div style={{
              background: 'var(--navy-800)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                Do you offer refunds?
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                We offer a 7-day money-back guarantee. If you're not satisfied within 
                the first 7 days, contact support for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="content-container-narrow">
          <h2 className="cta-title">
            Start your free trial today
          </h2>
          
          <p className="cta-body">
            No payment required. Try the platform, see the results, 
            then upgrade when you're ready.
          </p>

          <button 
            onClick={() => navigate('/student')} 
            className="btn-final-large"
          >
            <span>Start Free Trial</span>
            <span className="btn-microcopy-inline">7 days · No credit card required</span>
          </button>
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
              <a href="/student" onClick={(e) => { e.preventDefault(); navigate('/student'); }}>For Students</a>
              <a href="/parent" onClick={(e) => { e.preventDefault(); navigate('/parent'); }}>For Parents</a>
              <a href="/schools" onClick={(e) => { e.preventDefault(); navigate('/schools'); }}>For Schools</a>
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

export default PricingPage;