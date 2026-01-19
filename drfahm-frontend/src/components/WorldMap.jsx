import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./WorldMap.css";

function WorldMap({ compact = false }) {
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredWorld, setHoveredWorld] = useState(null);

  // Fixed positions (SVG viewBox 1000x600)
  const worldPositions = useMemo(
    () => [
      { x: 8, y: 75 }, // World 1
      { x: 18, y: 65 }, // World 2
      { x: 28, y: 58 }, // World 3
      { x: 38, y: 50 }, // World 4
      { x: 48, y: 45 }, // World 5
      { x: 58, y: 42 }, // World 6
      { x: 68, y: 38 }, // World 7
      { x: 78, y: 32 }, // World 8
      { x: 88, y: 25 }, // World 9
      { x: 95, y: 18 }, // World 10
    ],
    []
  );

  useEffect(() => {
    if (!compact) fetchWorldsData();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact]);

  const fetchWorldsData = async () => {
    try {
      const response = await axios.get("/worlds");
      setWorlds(response.data.worlds || []);
    } catch (error) {
      console.error("Error fetching worlds:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWorldSection = (worldNum) => (worldNum <= 5 ? "VERBAL" : "MATH");
  const getWorldTheme = (worldNum) => (worldNum <= 5 ? "verbal" : "math");

  const getWorldStatus = (worldNum) => {
    if (compact) return worldNum === 1 ? "current" : "locked";

    const world = worlds.find((w) => w.world === worldNum);
    if (!world) return "locked";

    const completedCount = world.levels.filter((l) => l.is_completed).length;
    if (completedCount === 10) return "completed";
    if (completedCount > 0 || worldNum === 1) return "current";

    const prevWorld = worlds.find((w) => w.world === worldNum - 1);
    if (prevWorld && prevWorld.levels.filter((l) => l.is_completed).length === 10) {
      return "current";
    }

    return "locked";
  };

  const getCompletionPercentage = (worldNum) => {
    if (compact) return 0;
    const world = worlds.find((w) => w.world === worldNum);
    if (!world) return 0;
    const completed = world.levels.filter((l) => l.is_completed).length;
    return (completed / 10) * 100;
  };

  const getWorldProgressText = (worldNum) => {
    if (compact) return "Locked";
    const world = worlds.find((w) => w.world === worldNum);
    if (!world) return "Locked";
    const completed = world.levels.filter((l) => l.is_completed).length;
    return `${completed}/10 (${Math.round((completed / 10) * 100)}%)`;
  };

  const handleWorldClick = (worldNum) => {
    if (compact) return;
    const status = getWorldStatus(worldNum);
    if (status === "locked") return;

    const sectionEl = document.getElementById(`world-${worldNum}`);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const nodeEl = document.getElementById(`map-world-${worldNum}`);
    if (nodeEl) nodeEl.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Smooth path through points
  const generatePath = () => {
    const points = worldPositions.map((pos) => `${pos.x * 10},${pos.y * 6}`);
    let path = `M ${points[0]}`;

    for (let i = 1; i < points.length; i++) {
      const [x1, y1] = points[i - 1].split(",").map(Number);
      const [x2, y2] = points[i].split(",").map(Number);

      const cx = x1 + (x2 - x1) / 2;
      const cy = y1 + (y2 - y1) / 2;

      path += ` Q ${cx},${cy} ${x2},${y2}`;
    }

    return path;
  };

  const getTooltipAlignClass = (worldNum) => {
    if (worldNum <= 2) return "tooltip-right";
    if (worldNum >= 9) return "tooltip-left";
    return "tooltip-center";
  };

  if (loading && !compact) {
    return (
      <div className="world-map-loading">
        <div className="loading-spinner"></div>
        <p>Loading your journey...</p>
      </div>
    );
  }

  const worldsCompleted = compact
    ? 0
    : worlds.filter((w) => w.levels.filter((l) => l.is_completed).length === 10).length;

  const levelsCompleted = compact
    ? 0
    : worlds.reduce((acc, w) => acc + w.levels.filter((l) => l.is_completed).length, 0);

  return (
    <div className={`neo-world-map ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="map-header">
          <div className="map-title-section">
            <h2>Your Learning Journey</h2>
            <p>Complete each world at 100% to unlock the next</p>
          </div>

          <div className="map-stats">
            <div className="stat-item">
              <span className="stat-number">{worldsCompleted}</span>
              <span className="stat-label">Worlds Completed</span>
            </div>

            <div className="stat-item">
              <span className="stat-number">{levelsCompleted}</span>
              <span className="stat-label">Levels Completed</span>
            </div>
          </div>
        </div>
      )}

      <div className="map-canvas">
        {/* viewport keeps backgrounds clipped, but nodes/tooltips are NOT clipped */}
        <div className="map-viewport" aria-hidden="true">
          <div className="nebula-layer" />
          <div className="stars-layer stars-1" />
          <div className="stars-layer stars-2" />
          <div className="stars-layer stars-3" />
          <div className="streaks-layer" />
          <div className="scanline-layer" />
          <div className="noise-layer" />

          {/* Curved path - brand colors, no gradients */}
          <svg className="path-svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="7" result="blur1" />
                <feGaussianBlur stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={generatePath()}
              fill="none"
              stroke="#D8DDE1"
              strokeWidth="10"
              strokeLinecap="round"
              className="path-background"
            />

            <path
              d={generatePath()}
              fill="none"
              stroke="rgba(15, 93, 74, 0.3)"
              strokeWidth="18"
              strokeLinecap="round"
              filter="url(#glowStrong)"
              className="path-glow"
            />

            <path
              d={generatePath()}
              fill="none"
              stroke="#0F5D4A"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#softGlow)"
              className="main-path"
            />

            {/* moving highlight dash */}
            <path
              d={generatePath()}
              fill="none"
              stroke="rgba(30, 42, 56, 0.4)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="path-spark"
            />
          </svg>
        </div>

        {/* Nodes + tooltips (NOT clipped) */}
        <div className="world-nodes">
          {worldPositions.map((pos, index) => {
            const worldNum = index + 1;
            const status = getWorldStatus(worldNum);
            const completion = getCompletionPercentage(worldNum);
            const section = getWorldSection(worldNum);
            const theme = getWorldTheme(worldNum);

            const showTooltip = !compact && hoveredWorld === worldNum;

            return (
              <div
                key={worldNum}
                id={`map-world-${worldNum}`}
                className={`world-node ${status} ${theme} world-${worldNum}`}
                onClick={() => handleWorldClick(worldNum)}
                onMouseEnter={() => setHoveredWorld(worldNum)}
                onMouseLeave={() => setHoveredWorld(null)}
                onFocus={() => setHoveredWorld(worldNum)}
                onBlur={() => setHoveredWorld(null)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                role="button"
                tabIndex={0}
              >
                <div className="node-glow" aria-hidden="true" />

                {showTooltip && (
                  <div className={`world-tooltip ${getTooltipAlignClass(worldNum)}`}>
                    <div className="tooltip-title">World {worldNum}</div>
                    <div className="tooltip-row">
                      <span className="tooltip-label">Section</span>
                      <span className="tooltip-value">{section}</span>
                    </div>
                    <div className="tooltip-row">
                      <span className="tooltip-label">Status</span>
                      <span className="tooltip-value">
                        {status === "current"
                          ? "In Progress"
                          : status === "completed"
                          ? "Completed"
                          : "Locked"}
                      </span>
                    </div>
                    <div className="tooltip-row">
                      <span className="tooltip-label">Completion</span>
                      <span className="tooltip-value">{getWorldProgressText(worldNum)}</span>
                    </div>
                    <div className="tooltip-hint">Click to jump to this world.</div>
                    <div className="tooltip-arrow" />
                  </div>
                )}

                <div className="node-content">
                  <div className="node-circle">
                    <svg viewBox="0 0 100 100" className="progress-ring" aria-hidden="true">
                      <circle cx="50" cy="50" r="45" className="progress-bg" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="progress-bar"
                        style={{
                          strokeDasharray: `${completion * 2.827} 283`,
                        }}
                      />
                    </svg>

                    {/* inner station design differs for verbal/math */}
                    <div className="station-core" aria-hidden="true">
                      <div className="station-core-inner" />
                      <div className="station-core-rings" />
                    </div>

                    <div className="node-inner">
                      {status === "completed" ? (
                        <span className="node-icon">✓</span>
                      ) : status === "locked" ? (
                        <span className="node-icon">🔒</span>
                      ) : (
                        <span className="node-number">{worldNum}</span>
                      )}
                    </div>

                    <div className="node-sparkle" aria-hidden="true" />
                  </div>

                  {!compact && (
                    <>
                      <div className="node-label">World {worldNum}</div>
                      <div className="node-section">{section}</div>
                      {completion > 0 && completion < 100 && (
                        <div className="node-percentage">{Math.round(completion)}%</div>
                      )}
                    </>
                  )}
                </div>

                {status === "current" && !compact && (
                  <div className="current-indicator">
                    <div className="pulse-dot" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!compact && (
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-dot completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot current"></div>
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot locked"></div>
            <span>Locked</span>
          </div>
        </div>
      )}

      {!compact && <div className="map-divider" aria-hidden="true" />}
    </div>
  );
}

export default WorldMap;