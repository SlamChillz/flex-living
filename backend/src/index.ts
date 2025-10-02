import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewsController from './controllers/reviewsController.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/reviews/hostaway', (req, res) => reviewsController.getHostawayReviews(req, res));
app.patch('/api/reviews/:reviewId/approval', (req, res) => reviewsController.updateReviewApproval(req, res));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
