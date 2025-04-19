import express from 'express';
import { getAllUsers, deleteUser , approveTurf, getUnapprovedTurfs , getAdminDashboard , deleteTurf , updateUser, getAllTurfs} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/users', protect, isAdmin, getAllUsers );
router.delete('/users/:id', protect, isAdmin, deleteUser);

router.get('/turfs', protect, isAdmin, getUnapprovedTurfs);
router.put('/turfs/:id/approve', protect, isAdmin, approveTurf);
router.get('/dashboard', protect, isAdmin, getAdminDashboard);
router.delete('/turfs/:id', protect, isAdmin, deleteTurf);
router.put('/users/:id', protect, isAdmin, updateUser);
router.get('/turfs/all', protect, isAdmin, getAllTurfs); // ✅ Get all turfs

export default router;