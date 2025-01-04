import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import { Snackbar } from '@mui/material';   // dynamic UI will use from here 

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('orderUpdate', (data) => {
      setNotifications((prev) => [...prev, data]);
      setMessage(data.message);
      setOpen(true);
    });

    return () => {
      socket.off('orderUpdate');
    };
  }, []);

  //tougher than normal calls 
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} />  
      {notifications.map((note, index) => (
        <p key={index}>{note.message}</p>
      ))}
    </div>
  );
};

export default Notification;
