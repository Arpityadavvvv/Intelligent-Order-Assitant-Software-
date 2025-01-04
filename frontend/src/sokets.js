// src/socket.js

import io from 'socket.io-client';


const soket = io('http://localhost:3000', {
  transports: ['websocket'], // Use WebSockets (Socket.io default)
  path: '/socket.io', // Ensure the path matches your backend configuration
});

export default soket;
