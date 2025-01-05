import React, { useState } from 'react';
import axios from '../utils/api';  // Import the axios instance configured for your backend

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // State to manage loading state
  const [error, setError] = useState(null);  // State to manage error messages

  // Handle form submission to request recommendations
  const fetchRecommendations = async () => {
    if (!input.trim()) {
      return; // Do nothing if input is empty or only whitespace
    }

    setLoading(true);
    setError(null);  // Reset error before making a new request

    try {
      const { data } = await axios.post('/recommendation', { input });
      setRecommendations(data.recommendation);  // Set the recommendation state with the response
    } catch (error) {
      console.error('Error fetching recommendations', error);
      setError('Failed to fetch recommendations. Please try again later.');
    } finally {
      setLoading(false);  // Stop loading once the request is complete
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
        disabled={loading}  // Disable input while loading
      />
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}
      {recommendations && recommendations.length > 0 && (
        <div>
          <h3>Recommendations:</h3>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
