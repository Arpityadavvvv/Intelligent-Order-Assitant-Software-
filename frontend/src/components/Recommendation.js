import React, { useState } from 'react';
import axios from '../utils/api';  // Import the axios instance configured for your backend

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [input, setInput] = useState('');

  // Handle form submission to request recommendations
  const fetchRecommendations = async () => {
    try {
      const { data } = await axios.post('/recommendation', { input });
      setRecommendations(data.recommendation);  // Set the recommendation state with the response
    } catch (error) {
      console.error('Error fetching recommendations', error);
    }
  };

  return (
    <div>
      <h2>AI Recommendations</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}  // Update the input state on user change
        placeholder="Ask a question or provide a prompt"
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      {recommendations && <p>{recommendations}</p>}  {/* Display the recommendation */}
    </div>
  );
};

export default Recommendation;
