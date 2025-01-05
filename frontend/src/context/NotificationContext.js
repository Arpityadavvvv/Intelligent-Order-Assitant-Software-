import React, { createContext, useState, useContext } from 'react';

// Create a context to manage notifications globally
const NotificationContext = createContext();

// Custom hook to use notifications context
export const useNotifications = () => useContext(NotificationContext);

// Provider component to encapsulate and provide notification state
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to add new notification
  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  // Value provided to components wrapped in NotificationProvider
  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

