const express = require("express");
const Review = require("../models/review");

const router = express.Router();

// Add review
router.post("/", async (req, res) => {
  const { user, comment, rating } = req.body;

  if (!user || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const review = new Review({ user, comment, rating });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user", "name email");
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
