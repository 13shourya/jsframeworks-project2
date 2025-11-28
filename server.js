import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Book from './models/Book.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log(' Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' MongoDB Connected Successfully!');
  } catch (error) {
    console.log(' MongoDB Connection Error:', error.message);
  }
};

connectDB();

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Book API is working! 🎉',
    endpoints: {
      createBook: 'POST /api/books',
      test: 'GET /'
    }
  });
});

// CREATE operation - Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully!',
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create book',
      error: error.message
    });
  }
});

// Get all books (optional - for testing)
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Test endpoints at: http://localhost:${PORT}`);
});