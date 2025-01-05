import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import Recommendation from '../components/Recommendation';
import '../styles/HomePage.css'; // Styling for the homepage

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate data loading for enhanced user experience
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate an API call or other asynchronous operations
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please refresh the page.");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>Your central hub for notifications and AI recommendations.</p>
      </header>

      {loading && <p className="loading">Loading content, please wait...</p>}

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <main className="home-content">
          {/* Notifications Section */}
          <section className="notifications-section">
            <h2>Notifications</h2>
            <Notification />
          </section>

          {/* Recommendations Section */}
          <section className="recommendations-section">
            <h2>AI Recommendations</h2>
            <Recommendation />
          </section>
        </main>
      )}
    </div>
  );
};

export default HomePage;

