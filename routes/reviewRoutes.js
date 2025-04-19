import express from 'express';
import {
  addReview, getTurfReviews
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/:turfId', protect, addReview);
router.get('/:turfId', getTurfReviews);
export default router;
