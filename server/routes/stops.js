const express = require('express');
const jwt = require('jsonwebtoken');
const Stop = require('../models/Stop');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', auth, async (req, res) => {
  try {
    const stops = await Stop.find();
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const stop = new Stop(req.body);
    await stop.save();
    res.status(201).json(stop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Stop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stop deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;