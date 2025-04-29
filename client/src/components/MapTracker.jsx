import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

function MapTracker() {
  const mapRef = useRef(null);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    // Initialize Leaflet map
    mapRef.current = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Listen for bus location updates
    socket.on('busLocation', (data) => {
      const { busId, latitude, longitude } = data;
      const marker = L.marker([latitude, longitude]).addTo(mapRef.current);
      marker.bindPopup(`Bus ${busId}`).openPopup();
      mapRef.current.setView([latitude, longitude], 13);
    });

    return () => {
      socket.disconnect();
      mapRef.current.remove();
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Real-Time Bus Tracker</h2>
      <div id="map" className='rounded-lg shadow-md'></div>
    </div>
  );
}

export default MapTracker;