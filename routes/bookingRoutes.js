import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  approveBooking 
} from '../controllers/bookingController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isManager } from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.delete('/:id', protect, cancelBooking);


router.put('/:id/approve', protect, isManager, approveBooking);

export default router;
