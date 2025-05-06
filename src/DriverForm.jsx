import React, { useState } from 'react';
import './DriverForm.css'; // Custom CSS for styling

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  
    try {
      const profileImageBase64 = await toBase64(formData.profileImage);
      const licenseImageBase64 = await toBase64(formData.licenseImage);
  
      const payload = {
        driverName: formData.driverName,
        mobileNumber: formData.mobileNumber,
        experience: formData.experience,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        proofNumber: formData.proofNumber,
        profileImage: profileImageBase64,
        licenseImage: licenseImageBase64,
      };
  
      const response = await fetch('http://localhost:8080/drivers/createDriver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Driver created successfully:', result);
        alert('Driver registered successfully!');
      } else {
        console.error('API Error:', response.status);
        alert('Failed to register driver.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    }
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
