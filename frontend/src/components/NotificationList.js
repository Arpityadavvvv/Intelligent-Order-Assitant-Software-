// src/components/NotificationList.js

import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Snackbar } from '@mui/material'; // We'll use MUI's Snackbar for better UX
import "../styles/NotificationList.css";


const NotificationList = () => {
  const { notifications } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState('');

  // This effect will show a Snackbar when a new notification arrives
  React.useEffect(() => {
    if (notifications.length > 0) {
      setCurrentMessage(notifications[notifications.length - 1]);
      setOpen(true);
    }
  }, [notifications]);

  const handleClose = () => setOpen(false);

  return (
    <div>
      {notifications.length > 0 && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={currentMessage}
        />
      )}
    </div>
  );
};

export default NotificationList;
