const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check if MongoDB URI is available
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('⚠️  MONGO_URI not found in .env file');
  console.log('📝 Please create a .env file in the backend directory with:');
  console.log('MONGO_URI=your_mongodb_connection_string');
  console.log('PORT=5000');
  console.log('');
  console.log('🔗 Get free MongoDB Atlas at: https://www.mongodb.com/atlas');
  console.log('📖 Or install MongoDB locally: https://www.mongodb.com/try/download/community');
  console.log('');
  console.log('🚀 Starting server without database connection...');
  console.log('⚠️  API endpoints will return mock data for testing');
} else {
  // Connect to DB only if URI is available
  const connectDB = require('./config/db');
  connectDB().catch(err => {
    console.error('❌ MongoDB connection failed, but server will continue running');
    console.log('📖 Check MONGODB_SETUP.md for setup instructions');
  });
}

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/claimRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Test the API: http://localhost:${PORT}/test`);
  if (!mongoURI) {
    console.log('⚠️  Running in mock mode - no database connection');
  }
}); 