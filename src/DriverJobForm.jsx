import React, { useState } from 'react';
import './DriverForm.css';
const DriverJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    jobLocation: '',
    salary: '',
    workingHours: '',
    jobType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      jobTitle: formData.jobTitle,
      description: formData.description,
      jobLocation: formData.jobLocation,
      salary: formData.salary,
      workingHours: formData.workingHours,
      jobType: formData.jobType,
    };

    try {
      const response = await fetch('http://localhost:8080/jobs/createJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Job created successfully:', result);
        alert('Job posted successfully!');
      } else {
        console.error('API Error:', response.status);
        alert('Failed to post job.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <h2 className="form-title">🚚 Driver Job Details</h2>
        <form onSubmit={handleSubmit} className="driver-job-form">
          <div className="form-row">
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="jobLocation"
              placeholder="Job Location"
              value={formData.jobLocation}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="workingHours"
              placeholder="Working Hours"
              value={formData.workingHours}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="jobType"
              placeholder="Job Type (Full-Time/Part-Time)"
              value={formData.jobType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="submit-row">
            <button type="submit">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverJobForm;
