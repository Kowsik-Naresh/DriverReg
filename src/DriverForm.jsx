import React, { useState } from 'react';
import './DriverForm.css';
import CropImageModal from './CropImageModal';

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

  const [showCropModal, setShowCropModal] = useState(false);
  const [rawProfileImage, setRawProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      const is18OrOlder =
        age > 18 ||
        (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (!is18OrOlder) {
        alert('You must be at least 18 years old.');
        return;
      }
    }

    if (name === 'profileImage') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setRawProfileImage(reader.result);
          setShowCropModal(true);
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCroppedProfile = (croppedImageURL) => {
    fetch(croppedImageURL)
      .then((res) => res.blob())
      .then((blob) => {
        const croppedFile = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        setFormData((prev) => ({
          ...prev,
          profileImage: croppedFile,
        }));
        setShowCropModal(false);
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
        headers: { 'Content-Type': 'application/json' },
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
            <input type="text" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required />
            <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="text" name="proofNumber" placeholder="Proof Number" value={formData.proofNumber} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required />
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label className="file-label">
              Upload Profile Image
              <input type="file" name="profileImage" onChange={handleChange} accept="image/*" required />
            </label>
            <label className="file-label">
              Upload License Image
              <input type="file" name="licenseImage" onChange={handleChange} accept="image/*" required />
            </label>
          </div>
          <div className="submit-row">
            <button type="submit">Register Now</button>
          </div>
        </form>
      </div>

      {showCropModal && rawProfileImage && (
        <CropImageModal
          imageSrc={rawProfileImage}
          onCropDone={handleCroppedProfile}
          onCancel={() => setShowCropModal(false)}
        />
      )}
    </div>
  );
};

export default DriverForm;
