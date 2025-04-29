import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Bus Route Scheduler</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Routes</Link>
          <Link to="/stops" className="text-white hover:text-gray-200">Stops</Link>
          <Link to="/tracker" className="text-white hover:text-gray-200">Tracker</Link>
          <button
            onClick={onLogout}
            className="text-white hover:text-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;