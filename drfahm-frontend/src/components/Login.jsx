import React, { useState } from 'react';
import { useAuth } from '../App';
import axios from 'axios';

function Login() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (isRegister) {
      if (!formData.username) {
        setError('Username is required');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister 
        ? { email: formData.email, username: formData.username, password: formData.password }
        : { email: formData.email, password: formData.password };

      console.log('Sending request to:', endpoint);
      const response = await axios.post(endpoint, payload);
      console.log('Response:', response.data);
      
      if (response.data.access_token) {
        login(response.data.user, response.data.access_token);
      } else {
        setError('No access token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Hero Content */}
      <div className="login-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🎓</span>
            <span>Trusted by 10,000+ Students</span>
          </div>
          
          <h1 className="hero-title">
            Master Your
            <br />
            <span className="hero-highlight">Exam Journey</span>
          </h1>
          
          <p className="hero-subtitle">
            Prepare for QUDURAT, NAFS & TAHSILI exams with our gamified learning platform. 
            Progress through 10 worlds, unlock achievements, and compete with top students.
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <div className="feature-text">
                <h3>2,000 Questions</h3>
                <p>Comprehensive coverage of all exam topics</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎮</div>
              <div className="feature-text">
                <h3>Gamified Learning</h3>
                <p>Earn XP, unlock levels, track progress</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <div className="feature-text">
                <h3>Global Leaderboard</h3>
                <p>Compete with students nationwide</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Real Exam Format</h3>
                <p>Timed questions, instant feedback</p>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-number">100</span>
              <span className="stat-label">Levels</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">10</span>
              <span className="stat-label">Worlds</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">2K+</span>
              <span className="stat-label">Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container">
        <div className="login-box">
          <div className="login-header">
            <h1>DrFahm</h1>
            <p>Master QUDURAT, NAFS & TAHSILI</p>
          </div>

          <div className="login-tabs">
            <button 
              className={!isRegister ? 'active' : ''}
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
            >
              Login
            </button>
            <button 
              className={isRegister ? 'active' : ''}
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username (3-20 characters)"
                  minLength="3"
                  maxLength="20"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login')}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isRegister ? 'Already have an account? ' : "Don't have an account? "}
              <span 
                className="link"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setFormData({ email: '', username: '', password: '', confirmPassword: '' });
                }}
              >
                {isRegister ? 'Login here' : 'Register here'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;