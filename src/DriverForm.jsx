import React, { useState } from 'react';
import './DriverForm.css'; // 👈 We'll use a custom CSS file for styling

const DriverForm = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    mobileNumber: '',
    experience: '',
    dateOfBirth: '',
    email: '',
    proofNumber: '',
    profileImage: null,
    licenseImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <h2 className="form-title">🚗 Driver Registration</h2>
        <form onSubmit={handleSubmit} className="driver-form">
          <div className="form-row">
            <input
              type="text"
              name="driverName"
              placeholder="Driver Name"
              value={formData.driverName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="proofNumber"
              placeholder="Proof Number"
              value={formData.proofNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label className="file-label">
              Upload Profile Image
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </label>

            <label className="file-label">
              Upload License Image
              <input
                type="file"
                name="licenseImage"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </label>
          </div>

          <div className="submit-row">
            <button type="submit">Register Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
