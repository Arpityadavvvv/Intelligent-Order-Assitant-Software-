const express = require("express");
const Review = require("../models/review");
const router = express.Router();

// POST: Add review
router.post("/", async (req, res) => {
  const { user, comment, rating } = req.body;

  // Check if all fields are provided
  if (!user || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create and save the new review
    const review = new Review({ user, comment, rating });
    const savedReview = await review.save();
    
    res.status(201).json(savedReview);
  } catch (error) {
    // Return error response with the error message
    res.status(500).json({ message: "Failed to save review.", error: error.message });
  }
});

// GET: Fetch all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews.", error: error.message });
  }
});

// GET: Fetch review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user", "name email");
    
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review.", error: error.message });
  }
});

// DELETE: Delete review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review.", error: error.message });
  }
});

module.exports = router;
