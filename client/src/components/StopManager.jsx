import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StopManager() {
  const [stops, setStops] = useState([]);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/stops`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/stops`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({ name: '', latitude: '', longitude: '' });
      fetchStops();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/stops/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchStops();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Stops</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Stop Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Latitude"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            didn t
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Stop
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {stops.map((stop) => (
          <div key={stop._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{stop.name}</h3>
              <p>Lat: {stop.latitude}, Lon: {stop.longitude}</p>
            </div>
            <button
              onClick={() => handleDelete(stop._id)}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StopManager;