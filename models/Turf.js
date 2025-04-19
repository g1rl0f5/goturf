

import mongoose from 'mongoose';

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: [{ type: String }],
  price: { type: Number, required: true },
  image: { type: String, default: '/uploads/default.jpg' },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

const Turf = mongoose.model('Turf', turfSchema);
export default Turf;
