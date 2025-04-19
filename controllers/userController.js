import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
