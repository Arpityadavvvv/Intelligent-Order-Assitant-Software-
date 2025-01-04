const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize the GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyAIn3OpXU_ifb2pM18duEGEoE5zkKiCRRw");  // Replace with your actual API Key

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Create a POST route for generating recommendations based on a prompt
router.post('/recommendation', async (req, res) => {
  const { input } = req.body;

  try {
    // Generate content by sending the input to the Gemini model
    const result = await model.generateContent(input);
    
    // Send the generated content back in the response
    res.status(200).json({ recommendation: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: "Error generating recommendations" });
  }
});

module.exports = router;
