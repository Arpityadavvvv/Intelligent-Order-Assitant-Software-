const axios = require('axios');

// Function to interact with Google Gemini (or any LLM model)
const getGeminiResponse = async (userMessage) => {
  try {
    // Make a POST request to the Gemini API
    const response = await axios.post("https://gemini.api.url", {
      prompt: userMessage,
      model: "gemini-xyz",  // Your LLM model ID
    });

    // Return the response from the API
    return response.data;
  } catch (error) {
    // Log the error and return a descriptive error message
    console.error("Error with Gemini API:", error.message || error);
    return { error: "Failed to process your request. Please try again later." };
  }
};

module.exports = { getGeminiResponse };

