import User from '../models/User.js';
import Turf from '../models/Turf.js'; 
import generateToken from '../utils/generateToken.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.deleteOne();
  res.json({ message: 'User deleted successfully' });
};

export const getUnapprovedTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({ approved: false });
    res.json(turfs);
  } catch (error) {
    console.error('🔥 Error in getUnapprovedTurfs:', error); // 👈 full error log
    res.status(500).json({ message: error.message });
  }
};

export const approveTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) return res.status(404).json({ message: 'Turf not found' });

    turf.approved = true;
    await turf.save();
    res.json({ message: 'Turf approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while approving turf' });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const turfCount = await Turf.countDocuments();
    const unapprovedTurfCount = await Turf.countDocuments({ approved: false });
    const allTurfs = await Turf.find().populate('manager', 'name email'); // Include manager info

    res.json({
      stats: {
        users: userCount,
        turfs: turfCount,
        unapprovedTurfs: unapprovedTurfCount,
      },
      allTurfs, 
      message: "Admin dashboard data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while loading dashboard' });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (role) user.role = role;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Make sure to hash the password if updated

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('🔥 Error while updating user:', error); // 👈 Log the error for more details
    res.status(500).json({ message: 'Server error while updating user', error: error.message });
  }
};

export const deleteTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) return res.status(404).json({ message: 'Turf not found' });

    await turf.deleteOne();
    res.json({ message: 'Turf deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting turf' });
  }
};

export const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find().populate('manager', 'name email');
    res.json(turfs);
  } catch (error) {
    console.error('Error fetching all turfs:', error);
    res.status(500).json({ message: 'Server error while fetching all turfs' });
  }
};
