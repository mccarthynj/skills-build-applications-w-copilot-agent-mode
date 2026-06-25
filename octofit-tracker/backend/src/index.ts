import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API server running on port ${PORT}`);
});
