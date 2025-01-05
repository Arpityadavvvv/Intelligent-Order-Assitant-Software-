const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET: Fetch all users
router.get("/", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Return an error response if fetching users fails
    res.status(500).json({ message: "Failed to fetch users.", error: error.message });
  }
});

module.exports = router;
