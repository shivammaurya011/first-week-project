import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RouteManager from './components/RouteManager';
import StopManager from './components/StopManager';
import MapTracker from './components/MapTracker';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <RouteManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/stops"
            element={isAuthenticated ? <StopManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/tracker"
            element={isAuthenticated ? <MapTracker /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;