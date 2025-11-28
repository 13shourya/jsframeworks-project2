import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add an author name']
  },
  publishYear: {
    type: Number,
    required: true,
    min: [1000, 'Year must be greater than 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: String,
    required: true,
    enum: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Biography', 'Fantasy']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

export default mongoose.model('Book', BookSchema);