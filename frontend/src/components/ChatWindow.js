import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, handleQuickButtonClicked } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  
  // Simulate a bot greeting when the chat is opened
  useEffect(() => {
    addResponseMessage("Hello! How can I assist you with your order today?");
  }, []);
  
  // Handle sending the user's message and integrating it with the backend
  const handleNewUserMessage = async (newMessage) => {
    addResponseMessage("Processing your order...");
    
    // Send user message to backend (adjust the route as needed)
    try {
      const response = await axios.post("http://localhost:3000/api/orders", {
        userId: "user123",  // For demo purposes
        products: [
          { productId: "tv001", quantity: 1, price: 500 },
          { productId: "fridge001", quantity: 1, price: 300 }
        ],
        totalAmount: 800,
      });
      
      if (response.status === 201) {
        addResponseMessage(`Your order has been placed successfully!`);
      } else {
        addResponseMessage(`Sorry, there was an issue placing your order. Please try again.`);
      }
    } catch (error) {
      console.error(error);
      addResponseMessage(`Error: Couldn't process your request.`);
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
