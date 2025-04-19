import Booking from '../models/Booking.js';
import Turf from '../models/Turf.js';


export const getManagerTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({ manager: req.user._id });
    res.json(turfs);
  } catch (err) {
    console.error('Error fetching manager turfs:', err);
    res.status(500).json({ message: 'Server error while fetching turfs' });
  }
};


export const getManagerBookings = async (req, res) => {
  try {
    const turfs = await Turf.find({ manager: req.user._id });
    const turfIds = turfs.map(turf => turf._id);

    const bookings = await Booking.find({ turf: { $in: turfIds } });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching manager bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

export const getManagerDashboard = async (req, res) => {
  try {
    const turfs = await Turf.find({ manager: req.user._id });
    const turfIds = turfs.map(turf => turf._id);

    const bookingCount = await Booking.countDocuments({ turf: { $in: turfIds } });

    res.json({
      turfCount: turfs.length,
      bookingCount,
    });
  } catch (err) {
    console.error('Error fetching manager dashboard:', err);
    res.status(500).json({ message: 'Server error while loading dashboard' });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('turf');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.turf.manager.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = 'approved';
    await booking.save();

    res.json({ message: 'Booking approved successfully' });
  } catch (error) {
    console.error('🔥 Error approving booking:', error); // Add this
    res.status(500).json({ message: 'Server error while approving booking', error: error.message });
  }
};

