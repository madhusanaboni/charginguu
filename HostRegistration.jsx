import React, { useState } from 'react';
import './HostRegistration.css';

const HostRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    businessName: '',
    contactPerson: '',
    businessType: '',
    businessAddress: '',
    
    // Step 2: Contact Information
    phoneNumber: '',
    email: '',
    
    // Step 3: Bank Details
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Terms
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const businessTypes = [
    'Cafe',
    'Office',
    'Retail Store',
    'Home',
    'Restaurant',
    'Hotel',
    'Shopping Mall',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Please select business type';
    }
    
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.accountNumber.replace(/\s/g, ''))) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }
    
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
    }
    
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOtp = () => {
    if (formData.phoneNumber && !errors.phoneNumber) {
      // Simulate OTP sending
      console.log('OTP sent to:', formData.phoneNumber);
      setOtpSent(true);
      // In real app, you would call your OTP service here
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep3()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Registration submitted successfully!');
    }
  };

  const ProgressBar = () => (
    <div className="progress-bar">
      <div className="progress-steps">
        {[1, 2, 3].map(step => (
          <div key={step} className="step-container">
            <div className={`step-circle ${currentStep >= step ? 'active' : ''}`}>
              {step}
            </div>
            <div className="step-label">
              {step === 1 && 'Basic Info'}
              {step === 2 && 'Contact'}
              {step === 3 && 'Bank Details'}
            </div>
          </div>
        ))}
      </div>
      <div className="progress-line">
        <div 
          className="progress-fill"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="host-registration">
      {/* Header */}
      <div className="registration-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1 className="registration-title">Become a Host</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Introduction */}
      <div className="introduction">
        <p>Monetize your spare power outlets and earn with Charginguu!</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>Basic Information</h2>
            
            <div className="input-group">
              <label htmlFor="businessName">Business Name / Host Name *</label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                className={errors.businessName ? 'error' : ''}
              />
              {errors.businessName && <span className="error-text">{errors.businessName}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="contactPerson">Contact Person *</label>
              <input
                id="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Full name of contact person"
                className={errors.contactPerson ? 'error' : ''}
              />
              {errors.contactPerson && <span className="error-text">{errors.contactPerson}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="businessType">Business Type *</label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className={errors.businessType ? 'error' : ''}
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && <span className="error-text">{errors.businessType}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="businessAddress">Business Address *</label>
              <textarea
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                placeholder="Enter complete business address"
                rows="3"
                className={errors.businessAddress ? 'error' : ''}
              />
              {errors.businessAddress && <span className="error-text">{errors.businessAddress}</span>}
            </div>

            <button type="button" className="next-btn" onClick={handleNext}>
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>Contact Information</h2>
            
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <div className="phone-input-container">
                <input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className={errors.phoneNumber ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="otp-btn"
                  onClick={handleSendOtp}
                  disabled={!formData.phoneNumber || errors.phoneNumber}
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
              
              {otpSent && (
                <div className="otp-verification">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                  />
                  <small>OTP sent to {formData.phoneNumber}</small>
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="step-buttons">
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Bank Details */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>Bank Account Details</h2>
            <p className="section-description">For payout processing</p>
            
            <div className="input-group">
              <label htmlFor="accountName">Account Holder Name *</label>
              <input
                id="accountName"
                type="text"
                value={formData.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                placeholder="Name as in bank account"
                className={errors.accountName ? 'error' : ''}
              />
              {errors.accountName && <span className="error-text">{errors.accountName}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                id="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter account number"
                className={errors.accountNumber ? 'error' : ''}
                maxLength="18"
              />
              {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="ifscCode">IFSC Code *</label>
              <input
                id="ifscCode"
                type="text"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                placeholder="e.g., SBIN0000123"
                className={errors.ifscCode ? 'error' : ''}
                maxLength="11"
              />
              {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
            </div>

            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                />
                <span className="checkmark"></span>
                I agree to Host Terms and Conditions
              </label>
              {errors.agreedToTerms && <span className="error-text">{errors.agreedToTerms}</span>}
            </div>

            <div className="step-buttons">
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button type="submit" className="submit-btn">
                Register as Host
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default HostRegistration;