import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import axios from 'axios';
import WorldMap from './WorldMap';

function Dashboard() {
  const { user, logout, fetchUserProfile } = useAuth();
  const navigate = useNavigate();
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorlds();
    fetchUserProfile();
  }, []);

  const fetchWorlds = async () => {
    try {
      const response = await axios.get('/worlds');
      setWorlds(response.data.worlds);
    } catch (err) {
      setError('Failed to load worlds');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartLevel = (world, level) => {
    navigate(`/level/${world}/${level}`);
  };

  const getWorldTitle = (worldNum) => {
    if (worldNum <= 5) {
      return `World ${worldNum}: Verbal Section`;
    } else {
      return `World ${worldNum}: Math Section`;
    }
  };

  // Brand-compliant colors: Academic Navy with slight variations
  const getWorldColor = (worldNum) => {
    // All worlds use Academic Navy theme
    // Verbal worlds (1-5): Academic Navy
    // Math worlds (6-10): Slightly lighter Navy
    return worldNum <= 5 ? '#1E2A38' : '#2A3847';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading your journey...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>DrFahm</h1>
        </div>
        <div className="navbar-right">
          <span className="user-info">Hello, {user?.username}</span>
          <span className="xp-badge">{user?.xp || 0} XP</span>
          <button onClick={() => navigate('/profile')} className="btn-nav">Profile</button>
          <button onClick={() => navigate('/leaderboard')} className="btn-nav">Leaderboard</button>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Your Journey</h2>
          <p>Complete each level with 100% to unlock the next!</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="world-map-section">
          <WorldMap />
        </div>

        <div className="worlds-grid">
          {worlds.map((world) => (
            <div key={world.world} id={`world-${world.world}`} className="world-card">
              <div 
                className="world-header" 
                style={{ backgroundColor: getWorldColor(world.world) }}
              >
                <h3>{getWorldTitle(world.world)}</h3>
                <p className="world-type">{world.section.toUpperCase()}</p>
              </div>
              
              <div className="levels-grid">
                {world.levels.map((level) => (
                  <button
                    key={level.level}
                    className={`level-btn ${level.is_completed ? 'completed' : ''} ${!level.is_unlocked ? 'locked' : ''}`}
                    onClick={() => level.is_unlocked && handleStartLevel(world.world, level.level)}
                    disabled={!level.is_unlocked}
                  >
                    <span className="level-number">{level.level}</span>
                    {level.is_completed && <span className="checkmark">✓</span>}
                    {!level.is_unlocked && <span className="lock">🔒</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;