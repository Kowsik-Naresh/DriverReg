import React, { useState } from 'react';
import './DriverForm.css';

const Cars = () => {
  const [formData, setFormData] = useState({
    carName: '',
    ownerName: '',
    ownerContact: '',
    location: '',
    pricePerDay: '',
    seatingCapacity: '',
    fuelType: '',
    transmission: '',
    carNumber: '',
    carPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const carPhotoBase64 = await toBase64(formData.carPhoto);

      const payload = {
        carName: formData.carName,
        ownerName: formData.ownerName,
        ownerContact: formData.ownerContact,
        location: formData.location,
        pricePerDay: formData.pricePerDay,
        seatingCapacity: formData.seatingCapacity,
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        carNumber: formData.carNumber,
        carPhoto: carPhotoBase64,
      };

      const response = await fetch('http://localhost:8080/cars/createCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Car added successfully:', result);
        alert('Car added successfully!');
      } else {
        console.error('API Error:', response.status);
        alert('Failed to add car.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <h2 className="form-title">🚘 Add New Car</h2>
        <form onSubmit={handleSubmit} className="driver-form">
          <div className="form-row">
            <input type="text" name="carName" placeholder="Car Name" value={formData.carName} onChange={handleChange} required />
            <input type="text" name="carNumber" placeholder="Car Number" value={formData.carNumber} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} required />
            <input type="text" name="ownerContact" placeholder="Owner Contact" value={formData.ownerContact} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input type="number" name="pricePerDay" placeholder="Price Per Day (₹)" value={formData.pricePerDay} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input type="number" name="seatingCapacity" placeholder="Seating Capacity" value={formData.seatingCapacity} onChange={handleChange} required />
            <input type="text" name="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input type="text" name="transmission" placeholder="Transmission" value={formData.transmission} onChange={handleChange} required />
            <label className="file-label">
              Upload Car Photo
              <input type="file" name="carPhoto" onChange={handleChange} accept="image/*" required />
            </label>
          </div>

          <div className="submit-row">
            <button type="submit">Add Car</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cars;
