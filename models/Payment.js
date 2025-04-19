import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: Number,
  method: String,
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;