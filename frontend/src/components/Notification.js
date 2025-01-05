import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import { Snackbar, SnackbarContent } from '@mui/material'; // Using Snackbar from Material UI

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for order updates from the backend via WebSocket
    socket.on('orderUpdate', (data) => {
      setNotifications((prev) => [...prev, data]);
      setMessage(data.message);  // Update the message state
      setOpen(true);  // Open the Snackbar notification
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off('orderUpdate');
    };
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Close the Snackbar
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Notifications</h2>

      {/* Snackbar UI component from Material UI */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust Snackbar position
      />

      {/* Display notifications in a list */}
      <div>
        {notifications.map((note, index) => (
          <SnackbarContent
            key={index}
            message={note.message}
            style={{ marginBottom: '10px' }}  // Style to separate notifications
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;

