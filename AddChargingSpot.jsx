import React, { useState } from 'react';
import './AddChargingSpot.css';

const AddChargingSpot = () => {
  const [formData, setFormData] = useState({
    spotName: '',
    location: '',
    latitude: '',
    longitude: '',
    plugTypes: [],
    numberOfPorts: 1,
    pricingPerMinute: '',
    operatingHours: {
      monday: { open: '', close: '', closed: false },
      tuesday: { open: '', close: '', closed: false },
      wednesday: { open: '', close: '', closed: false },
      thursday: { open: '', close: '', closed: false },
      friday: { open: '', close: '', closed: false },
      saturday: { open: '', close: '', closed: false },
      sunday: { open: '', close: '', closed: false }
    },
    amenities: [],
    photos: [],
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);

  const plugTypes = [
    { id: 'usb-a', label: 'USB-A', icon: '🔌' },
    { id: 'usb-c', label: 'USB-C', icon: '⚡' },
    { id: 'micro-usb', label: 'Micro-USB', icon: '📱' },
    { id: 'lightning', label: 'Lightning', icon: '🍎' },
    { id: 'wall-outlet', label: 'Wall Outlet', icon: '🔋' }
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { id: 'seating', label: 'Seating', icon: '💺' },
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
    { id: 'restroom', label: 'Restroom', icon: '🚻' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'cafe', label: 'Cafe', icon: '☕' },
    { id: 'security', label: 'Security', icon: '👮' },
    { id: 'waiting-area', label: 'Waiting Area', icon: '⏳' }
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + formData.photos.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }

    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const removePhoto = (id) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== id)
    }));
  };

  const handleLocationSelect = () => {
    // Simulate map location selection
    setShowMap(true);
    // In real app, integrate with Google Maps or similar
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: '123 Main Street, Business District, City - 560001',
        latitude: '12.9716',
        longitude: '77.5946'
      }));
      setShowMap(false);
    }, 2000);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.spotName.trim()) {
      newErrors.spotName = 'Spot name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.plugTypes.length === 0) {
      newErrors.plugTypes = 'Select at least one plug type';
    }

    if (!formData.pricingPerMinute || formData.pricingPerMinute <= 0) {
      newErrors.pricingPerMinute = 'Valid pricing is required';
    }

    // Validate operating hours
    const hasValidHours = Object.values(formData.operatingHours).some(day => 
      !day.closed && day.open && day.close
    );
    
    if (!hasValidHours) {
      newErrors.operatingHours = 'Set operating hours for at least one day';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Charging spot added successfully!');
    }
  };

  const handleBack = () => {
    console.log('Navigate back');
    // Add your back navigation logic here
  };

  return (
    <div className="add-charging-spot">
      {/* Header */}
      <div className="spot-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1 className="spot-title">Add New Charging Spot</h1>
        <div className="header-spacer"></div>
      </div>

      <form onSubmit={handleSubmit} className="spot-form">
        {/* Spot Name */}
        <div className="form-section">
          <label htmlFor="spotName" className="form-label">
            Spot Name *
          </label>
          <input
            id="spotName"
            type="text"
            value={formData.spotName}
            onChange={(e) => handleInputChange('spotName', e.target.value)}
            placeholder="e.g., Front Desk Charger, Cafe Seating Area"
            className={`form-input ${errors.spotName ? 'error' : ''}`}
          />
          {errors.spotName && <span className="error-text">{errors.spotName}</span>}
        </div>

        {/* Location */}
        <div className="form-section">
          <label className="form-label">
            Location *
          </label>
          <div className="location-input-container">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Select location on map or enter address"
              className={`form-input ${errors.location ? 'error' : ''}`}
              readOnly
            />
            <button 
              type="button" 
              className="map-picker-btn"
              onClick={handleLocationSelect}
            >
              📍 Map
            </button>
          </div>
          {errors.location && <span className="error-text">{errors.location}</span>}
          
          {showMap && (
            <div className="map-preview">
              <div className="map-placeholder">
                <div className="map-loading">Loading map...</div>
                <div className="map-instructions">
                  Click on the map to select location
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plug Types */}
        <div className="form-section">
          <label className="form-label">
            Plug Types Available *
          </label>
          <div className="checkbox-grid">
            {plugTypes.map(plug => (
              <label key={plug.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.plugTypes.includes(plug.id)}
                  onChange={(e) => handleCheckboxChange('plugTypes', plug.id, e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-icon">{plug.icon}</span>
                <span className="checkbox-label">{plug.label}</span>
              </label>
            ))}
          </div>
          {errors.plugTypes && <span className="error-text">{errors.plugTypes}</span>}
        </div>

        {/* Number of Ports & Pricing */}
        <div className="form-row">
          <div className="form-section">
            <label htmlFor="numberOfPorts" className="form-label">
              Number of Ports/Outlets
            </label>
            <div className="number-input-container">
              <button
                type="button"
                className="number-btn"
                onClick={() => handleInputChange('numberOfPorts', Math.max(1, formData.numberOfPorts - 1))}
              >
                -
              </button>
              <input
                id="numberOfPorts"
                type="number"
                value={formData.numberOfPorts}
                onChange={(e) => handleInputChange('numberOfPorts', parseInt(e.target.value) || 1)}
                min="1"
                max="20"
                className="number-input"
              />
              <button
                type="button"
                className="number-btn"
                onClick={() => handleInputChange('numberOfPorts', Math.min(20, formData.numberOfPorts + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="pricingPerMinute" className="form-label">
              Pricing per Minute (₹) *
            </label>
            <div className="price-input-container">
              <span className="currency-symbol">₹</span>
              <input
                id="pricingPerMinute"
                type="number"
                value={formData.pricingPerMinute}
                onChange={(e) => handleInputChange('pricingPerMinute', parseFloat(e.target.value) || '')}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`form-input ${errors.pricingPerMinute ? 'error' : ''}`}
              />
              <span className="price-unit">/min</span>
            </div>
            {errors.pricingPerMinute && <span className="error-text">{errors.pricingPerMinute}</span>}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="form-section">
          <label className="form-label">
            Operating Hours *
          </label>
          <div className="operating-hours">
            {daysOfWeek.map(day => (
              <div key={day.key} className="day-schedule">
                <label className="day-checkbox">
                  <input
                    type="checkbox"
                    checked={!formData.operatingHours[day.key].closed}
                    onChange={(e) => handleOperatingHoursChange(day.key, 'closed', !e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="day-label">{day.label}</span>
                </label>
                
                {!formData.operatingHours[day.key].closed && (
                  <div className="time-inputs">
                    <input
                      type="time"
                      value={formData.operatingHours[day.key].open}
                      onChange={(e) => handleOperatingHoursChange(day.key, 'open', e.target.value)}
                      className="time-input"
                    />
                    <span className="time-separator">to</span>
                    <input
                      type="time"
                      value={formData.operatingHours[day.key].close}
                      onChange={(e) => handleOperatingHoursChange(day.key, 'close', e.target.value)}
                      className="time-input"
                    />
                  </div>
                )}
                
                {formData.operatingHours[day.key].closed && (
                  <span className="closed-label">Closed</span>
                )}
              </div>
            ))}
          </div>
          {errors.operatingHours && <span className="error-text">{errors.operatingHours}</span>}
        </div>

        {/* Amenities */}
        <div className="form-section">
          <label className="form-label">
            Amenities
          </label>
          <div className="checkbox-grid">
            {amenitiesList.map(amenity => (
              <label key={amenity.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity.id)}
                  onChange={(e) => handleCheckboxChange('amenities', amenity.id, e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-icon">{amenity.icon}</span>
                <span className="checkbox-label">{amenity.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="form-section">
          <label className="form-label">
            Photos of Spot
          </label>
          <div className="photo-upload-container">
            <input
              type="file"
              id="photo-upload"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="photo-input"
            />
            <label htmlFor="photo-upload" className="photo-upload-btn">
              📸 Add Photos
            </label>
            <span className="photo-hint">Max 5 photos</span>
          </div>
          
          {formData.photos.length > 0 && (
            <div className="photo-preview-grid">
              {formData.photos.map(photo => (
                <div key={photo.id} className="photo-preview">
                  <img src={photo.url} alt="Spot preview" />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => removePhoto(photo.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="form-section">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Additional notes for users about this charging spot..."
            rows="4"
            className="form-textarea"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Save Spot
        </button>
      </form>
    </div>
  );
};

export default AddChargingSpot;