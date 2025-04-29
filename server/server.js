const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/routes');
const stopRoutes = require('./routes/stops');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://first-week-project-coral.vercel.app',
    methods: ['GET', 'POST', 'DELETE'],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://shivammaurya011:shivam224155@projects.zaghnbn.mongodb.net/first-week-project?retryWrites=true&w=majority&appName=projects', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/stops', stopRoutes);

// Socket.IO for real-time bus tracking
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('busUpdate', (data) => {
    io.emit('busLocation', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));