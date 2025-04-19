import Review from '../models/Review.js';

export const addReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id, // Assuming user is attached to req.user from auth middleware
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review' });
  }
};

export const getTurfReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ turf: req.params.turfId });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this turf.' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};
