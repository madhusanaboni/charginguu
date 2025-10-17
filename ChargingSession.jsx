import React, { useState, useEffect } from 'react';
import './ChargingSession.css';
import PostSessionSummary from './PostSessionSummary';
import { useNavigate } from 'react-router-dom';

const ChargingSession = () => {
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [cost, setCost] = useState(0);
  const [isCharging, setIsCharging] = useState(true);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(25); // Simulated battery level
  const navigate=useNavigate();

  // Session configuration
  const ratePerMinute = 5; // ₹5 per minute
  const spotName = "Cafe Aura";

  useEffect(() => {
    let timer;
    
    if (isCharging) {
      timer = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1);
        
        // Update cost every second (ratePerMinute / 60)
        setCost(prevCost => prevCost + (ratePerMinute / 60));
        
        // Simulate battery charging (increase by 1% every 10 seconds)
        if (sessionTime % 10 === 0 && batteryLevel < 100) {
          setBatteryLevel(prev => Math.min(prev + 1, 100));
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCharging, sessionTime, batteryLevel]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCost = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const handleEndSession = () => {
    setShowEndConfirm(true);
    navigate('/PostSessionSummary')
  };

  const confirmEndSession = () => {
    setIsCharging(false);
    setShowEndConfirm(false);
    // In real app, you would call API to end session and process payment
    console.log('Session ended:', { duration: sessionTime, totalCost: cost });
    alert(`Session ended! Total cost: ${formatCost(cost)}`);
  };

  const handleBack = () => {
    if (isCharging) {
      if (window.confirm('Your charging session is still active. Are you sure you want to leave?')) {
        console.log('Navigate back');
        // Add your back navigation logic here
      }
    } else {
      console.log('Navigate back');
      // Add your back navigation logic here
    }
  };

 /* const getBatteryIcon = () => {
    if (batteryLevel >= 80) return '🔋';
    if (batteryLevel >= 60) return '🔋';
    if (batteryLevel >= 40) return '🔋';
    if (batteryLevel >= 20) return '🔋';
    return '🔋';
  }; */

  const getChargingStatus = () => {
    if (!isCharging) return 'Session Ended';
    if (batteryLevel >= 95) return 'Almost Fully Charged';
    if (batteryLevel >= 80) return 'Charging Rapidly';
    return 'Charging...';
  };

  return (
    <div className="charging-session">
      {/* Header */}
      <div className="session-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1 className="session-title">Charging Session</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="session-container">
        {/* Spot Name */}
        <div className="spot-name-section">
          <h2 className="spot-name">{spotName}</h2>
          <div className={`status-indicator ${isCharging ? 'charging' : 'ended'}`}>
            {getChargingStatus()}
          </div>
        </div>

        {/* Charging Animation */}
        <div className="charging-animation">
          <div className="battery-container">
            <div className="battery">
              <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
              <div className="battery-tip"></div>
            </div>
            <div className="charging-bolt">⚡</div>
          </div>
          <div className="battery-percentage">{batteryLevel}%</div>
        </div>

        {/* Session Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">⏱️</div>
            <div className="card-content">
              <div className="card-label">Session Duration</div>
              <div className="card-value">{formatTime(sessionTime)}</div>
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <div className="card-label">Current Cost</div>
              <div className="card-value">{formatCost(cost)}</div>
            </div>
          </div>
        </div>

        {/* Rate Information */}
        <div className="rate-info">
          <div className="rate-item">
            <span className="rate-label">Rate:</span>
            <span className="rate-value">₹{ratePerMinute}/min</span>
          </div>
          <div className="rate-item">
            <span className="rate-label">Estimated Full Charge:</span>
            <span className="rate-value">~{Math.round((100 - batteryLevel) * 0.8)} min</span>
          </div>
        </div>

        {/* Instructions & Reminders */}
        <div className="instructions-section">
          <h3 className="instructions-title">Important Reminders</h3>
          <div className="instructions-list">
            <div className="instruction-item">
              <span className="instruction-icon">🔒</span>
              <span className="instruction-text">Ensure your device is securely connected</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">🚫</span>
              <span className="instruction-text">Do not unplug without ending session</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">📱</span>
              <span className="instruction-text">Keep your device within safe distance</span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">⚠️</span>
              <span className="instruction-text">Session will auto-end at 100% battery</span>
            </div>
          </div>
        </div>

        {/* End Session Button */}
        <button 
          className={`end-session-btn ${!isCharging ? 'ended' : ''}`}
          onClick={handleEndSession}
          disabled={!isCharging}
        >
          {isCharging ? 'End Session' : 'Session Ended'}
        </button>

        {/* Quick Actions */}
        {isCharging && (
          <div className="quick-actions">
            <button className="quick-action-btn">
              <span className="action-icon">🔔</span>
              Set Reminder
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">📊</span>
              Usage Stats
            </button>
          </div>
        )}
      </div>

      {/* End Session Confirmation Dialog */}
      {showEndConfirm && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-icon">⚠️</div>
            <h3 className="dialog-title">End Charging Session?</h3>
            <p className="dialog-message">
              Are you sure you want to end your session? Any outstanding balance will be charged to your payment method.
            </p>
            
            <div className="session-summary">
              <div className="summary-item">
                <span>Duration:</span>
                <span>{formatTime(sessionTime)}</span>
              </div>
              <div className="summary-item">
                <span>Total Cost:</span>
                <span>{formatCost(cost)}</span>
              </div>
            </div>

            <div className="dialog-actions">
              <button 
                className="dialog-btn cancel-btn"
                onClick={() => setShowEndConfirm(false)}
              >
                Continue Charging
              </button>
              <button 
                className="dialog-btn confirm-btn"
                onClick={confirmEndSession}
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargingSession;