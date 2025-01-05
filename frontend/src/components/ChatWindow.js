



// src/components/ChatWindow.js

import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext'; // Import the notification context
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from 'axios';
import 'react-chat-widget/lib/styles.css';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const { addNotification } = useNotifications(); // Using the notification context

  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    addResponseMessage("Hello! How can I assist you with your order today?");
  }, []);
  
  const handleNewUserMessage = async (newMessage) => {
    addResponseMessage("Processing your order...");
    
    try {
      const response = await axios.post("http://localhost:3000/api/orders", {
        userId: "user123",
        products: [{ productId: "tv001", quantity: 1, price: 500 }],
        totalAmount: 500,
      });
      
      if (response.status === 201) {
        addResponseMessage(`Your order has been placed successfully!`);
        addNotification('Your order was placed successfully!'); // Trigger notification
      } else {
        addResponseMessage(`Sorry, there was an issue placing your order. Please try again.`);
        addNotification('Error placing order. Please try again.'); // Trigger notification
      }
    } catch (error) {
      console.error(error);
      addResponseMessage(`Error: Couldn't process your request.`);
      addNotification('An error occurred while processing your request.'); // Trigger notification
    }
  };

  return (
    <div className="chat-window">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Order Assistant"
        subtitle="How can I help you?"
      />
    </div>
  );
};

export default ChatWindow;
