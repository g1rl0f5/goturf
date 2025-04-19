import Payment from '../models/Payment.js';

export const createPayment = async (req, res) => {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  };

export const recordPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json(payment);
};

export const getPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.user._id });
  res.json(payments);
};
