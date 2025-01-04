const axios = require('axios');

// Function to interact with Google Gemini (or any LLM model)
const getGeminiResponse = async (userMessage) => {
  try {
    const response = await axios.post("https://gemini.api.url", {
      prompt: userMessage,
      model: "gemini-xyz",  // Your LLM model ID
    });

    return response.data;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return { error: "Error processing your request" };
  }
};

module.exports = { getGeminiResponse };
