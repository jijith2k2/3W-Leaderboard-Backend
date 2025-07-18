const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('MongoDB URI is not defined. Please set MONGO_URI in your .env file');
      console.log('You can use MongoDB Atlas (free) or install MongoDB locally');
      console.log('For MongoDB Atlas: https://www.mongodb.com/atlas');
      console.log('For local MongoDB: https://www.mongodb.com/try/download/community');
      throw new Error('MONGO_URI not defined');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Please check your MongoDB connection string');
    console.log('For MongoDB Atlas, make sure your IP is whitelisted');
    throw err; // Re-throw the error instead of exiting
  }
};

module.exports = connectDB; 