import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.user._id });
  res.status(201).json(booking);
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
};

 export const cancelBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking canceled' });
};

export const approveBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id).populate('turf');
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (booking.turf.manager.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to approve this booking' });
      }
  
      booking.status = 'confirmed';
      await booking.save();
  
      res.json({ message: 'Booking approved', booking });
    } catch (error) {
      console.error('Error approving booking:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };