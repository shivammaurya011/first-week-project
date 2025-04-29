import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RouteManager() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ name: '', start: '', end: '' });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/routes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoutes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/routes`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({ name: '', start: '', end: '' });
      fetchRoutes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/routes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchRoutes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Routes</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Route Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Start Location"
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="End Location"
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Route
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {routes.map((route) => (
          <div key={route._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{route.name}</h3>
              <p>{route.start} to {route.end}</p>
            </div>
            <button
              onClick={() => handleDelete(route._id)}
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

export default RouteManager;