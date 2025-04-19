

import express from 'express';
import {
  createTurf,
  getAllTurfs,
  getTurfById,
  updateTurf,
  deleteTurf,
  approveTurf, 
} from '../controllers/turfController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin, isManager } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, isAdmin, createTurf);
router.get('/', getAllTurfs);
router.get('/:id', getTurfById);
router.put('/:id', protect, isManager, updateTurf);
router.delete('/:id', protect, isAdmin, deleteTurf);
router.put('/:id/approve', protect, isAdmin, approveTurf); 

export default router;
