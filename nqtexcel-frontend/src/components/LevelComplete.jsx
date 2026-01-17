import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

function LevelComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();
  const { result, world, level } = location.state || {};

  React.useEffect(() => {
    // Refresh user profile to update XP
    fetchUserProfile();
  }, []);

  if (!result) {
    navigate('/dashboard');
    return null;
  }

  const isPerfect = result.score === 100;
  const percentage = Math.round(result.score);

  const handleNextLevel = () => {
    if (isPerfect) {
      if (level < 10) {
        navigate(`/level/${world}/${level + 1}`);
      } else if (world < 10) {
        navigate(`/level/${world + 1}/1`);
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleRetry = () => {
    navigate(`/level/${world}/${level}`);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="level-complete-container">
      <div className="level-complete-box">
        <div className={`result-header ${isPerfect ? 'perfect' : 'incomplete'}`}>
          <h1>{isPerfect ? 'Perfect Score!' : 'Keep Practicing!'}</h1>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p className="score-details">
              {result.correct_count} / {result.total_questions} correct
            </p>
          </div>
        </div>

        <div className="result-content">
          {isPerfect ? (
            <>
              <div className="xp-earned">
                <span className="xp-label">XP Earned</span>
                <span className="xp-value">+{result.xp_earned} XP</span>
              </div>
              <p className="success-message">
                Excellent work! You've unlocked the next level!
              </p>
            </>
          ) : (
            <>
              <p className="fail-message">
                You need 100% to advance to the next level.
              </p>
              <p className="encouragement">
                Review the questions and try again. You can do it!
              </p>
            </>
          )}

          <div className="level-info">
            <span>World {world}</span>
            <span>•</span>
            <span>Level {level}</span>
          </div>
        </div>

        <div className="result-actions">
          {isPerfect && (level < 10 || world < 10) && (
            <button onClick={handleNextLevel} className="btn-next">
              Next Level
            </button>
          )}
          {!isPerfect && (
            <button onClick={handleRetry} className="btn-retry">
              Retry Level
            </button>
          )}
          <button onClick={handleDashboard} className="btn-secondary">
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default LevelComplete;