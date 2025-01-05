import React, { useEffect, useState } from "react";
import axios from "../utils/api"; // Axios instance for API calls
import "../styles/AdminPage"; // Import CSS for styling

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, feedbackResponse] = await Promise.all([
          axios.get("/orders"), // Endpoint to fetch orders
          axios.get("/feedback"), // Endpoint to fetch feedback
        ]);
        setOrders(ordersResponse.data);
        setFeedbacks(feedbackResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="admin-loading">Loading...</div>;

  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Orders Section */}
      <section className="admin-section">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customerName}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Feedback Section */}
      <section className="admin-section">
        <h2>Customer Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul className="feedback-list">
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

export default AdminPage;
