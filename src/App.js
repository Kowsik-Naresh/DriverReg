import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DriverForm from './DriverForm';
import Cars from './Cars';
import DriverJobForm from './DriverJobForm';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">  Admin</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/">Add Cars</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/driver-form">Add Driver</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/driverjob-form">Add Driver job</Link>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/driver-form" element={<DriverForm />} />
          <Route path="/driverjob-form" element={<DriverJobForm/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
