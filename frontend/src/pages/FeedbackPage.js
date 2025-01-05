import React, { useEffect, useState } from "react";
import axios from "../utils/api"; // Axios instance for API calls
import "../styles/FeedbackPage.css"; // Import CSS for styling

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formInput, setFormInput] = useState({ user: "", comment: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch existing feedbacks from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/feedback");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formInput.user || !formInput.comment) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("/feedback", formInput);
      if (response.status === 201) {
        setFeedbacks((prev) => [response.data, ...prev]);
        setFormInput({ user: "", comment: "" });
        setSuccess(true);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-page">
      <h1>Feedback</h1>

      {/* Feedback Form */}
      <section className="feedback-form">
        <h2>Submit Your Feedback</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Feedback submitted successfully!</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formInput.user}
            onChange={(e) => setFormInput({ ...formInput, user: e.target.value })}
          />
          <textarea
            placeholder="Your Feedback"
            value={formInput.comment}
            onChange={(e) => setFormInput({ ...formInput, comment: e.target.value })}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* Feedback Display */}
      <section className="feedback-list">
        <h2>Recent Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id}>
                <strong>{feedback.user}</strong>: {feedback.comment}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default FeedbackPage;
