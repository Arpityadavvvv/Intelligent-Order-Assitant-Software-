import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import OrderSummary from "./components/OrderSummary";
import Footer from "./components/Footer"; // Import Footer component
import Header from "./components/Header"; // Import Header component
import Recommendation from "./components/Recommendation"; // Import the Recommendation component
import NotificationList from "./components/NotificationList"; // Import the NotificationList component
import { NotificationProvider } from "./context/NotificationContext"; // Import NotificationProvider

const App = () => {
  return (
    <NotificationProvider> {/* Wrap the entire app with NotificationProvider */}
      <Router>
        <div className="app-container">
          <Header /> {/* Add the Header component */}
          <NotificationList /> {/* Add the NotificationList component */}
          <Routes>
            {/* Route for the chat window */}
            <Route path="/" element={<ChatWindow />} />
            {/* Route for the order summary */}
            <Route path="/order-summary" element={<OrderSummary />} />
            {/* Route for the recommendation */}
            <Route path="/recommendation" element={<Recommendation />} />
          </Routes>
          <Footer /> {/* Add the Footer component */}
        </div>
      </Router>
    </NotificationProvider>
  );
};

export default App;

