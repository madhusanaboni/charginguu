import React, { useState } from 'react';
import { FaCoffee, FaCheckCircle, FaStar, FaRegStar, FaHeart, FaRegHeart, FaFileInvoice, FaRedo, FaExclamationCircle } from 'react-icons/fa';
import './PostSessionSummary.css';
import {useNavigate} from 'react-router-dom';


const PostSessionSummary = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    if (selectedRating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    
    setShowSuccess(true);
    console.log(`Rating submitted: ${selectedRating} stars, Review: ${reviewText}`);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleAddToFavorites = () => {
    setIsFavorited(true);
    setTimeout(() => {
      // Optional: Reset the visual feedback after 2 seconds
    }, 2000);
  };

  const handleViewInvoice = () => {
    alert('Invoice would be displayed or downloaded in a real application.');
  };

  const handleBookAgain = () => {
   // alert('Redirecting to booking page...');
   navigate('/AddChargingSpot');
  };

  const handleReportIssue = () => {
    alert('Opening issue report form...');
  };

  // Render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const rating = index + 1;
      return (
        <div
          key={rating}
          className={`star ${selectedRating >= rating ? 'active' : ''}`}
          onClick={() => handleStarClick(rating)}
        >
          {selectedRating >= rating ? <FaStar /> : <FaRegStar />}
        </div>
      );
    });
  };

  return (
    <div className="post-session-container">
      {/* Header */}
      <div className="header">
        <h1>Session Summary</h1>
        <p>Thank you for using our service</p>
      </div>

      {/* Summary Card */}
      <div className="summary-card">
        <div className="spot-name">
          <FaCoffee />
          Cafe Aura
        </div>
        
        <div className="summary-details">
          <div className="detail-item">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">July 29, 2025, 2:00 PM - 2:35 PM</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-value">35 minutes</span>
          </div>
        </div>
        
        <div className="cost-breakdown">
          <div className="cost-item">
            <span>Charging Cost</span>
            <span>₹150.00</span>
          </div>
          <div className="cost-item">
            <span>Overtime charge</span>
            <span>₹25.00</span>
          </div>
          <div className="cost-item">
            <span>Total Cost</span>
            <span>₹175.00</span>
          </div>
        </div>
        
        <div className="payment-status">
          <FaCheckCircle />
          <span>Payment Successful</span>
        </div>
      </div>

      {/* Rating Section */}
      <div className="rating-section">
        <div className="section-title">Rate your experience at Cafe Aura:</div>
        
        <div className="stars-container">
          {renderStars()}
        </div>
        
        <textarea 
          className="review-input" 
          placeholder="Share your experience (optional)"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        
        <button className="submit-rating" onClick={handleSubmitRating}>
          Submit Rating
        </button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div 
          className={`action-btn ${isFavorited ? 'favorited' : ''}`} 
          onClick={handleAddToFavorites}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
          <span>{isFavorited ? 'Added to Favorites' : 'Add to Favorites'}</span>
        </div>
        <div className="action-btn" onClick={handleViewInvoice}>
          <FaFileInvoice />
          <span>View Invoice</span>
        </div>
        <div className="action-btn book-again" onClick={handleBookAgain}>
          <FaRedo />
          <span>Book Again</span>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <a href="#" className="feedback-link" onClick={handleReportIssue}>
          <FaExclamationCircle />
          Report an issue
        </a>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message show">
          <FaCheckCircle /> Thank you for your rating!
        </div>
      )}
    </div>
  );
};

export default PostSessionSummary;