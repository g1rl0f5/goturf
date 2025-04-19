import express from 'express';
import {
  getManagerDashboard,
  getManagerTurfs,
  getManagerBookings,
  approveBooking,
} from '../controllers/managerController.js';
import { createTurf , updateTurf } from '../controllers/turfController.js'; 
import { protect } from '../middlewares/authMiddleware.js';
import { isManager } from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

router.get('/dashboard', protect, isManager, getManagerDashboard);
router.get('/turfs', protect, isManager, getManagerTurfs);
router.get('/bookings', protect, isManager, getManagerBookings);
router.post('/turfs', protect, isManager, createTurf); // ✅ Manager turf creation
router.put('/turfs/:id', protect, isManager, updateTurf);
router.put('/bookings/:id/approve',protect,isManager,approveBooking);

export default router;

