import { io } from 'socket.io-client';

// Use environment variable to define socket server URL
const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000', {
  transports: ['websocket'], // Ensure using WebSocket transport
  reconnectionAttempts: 5,    // Retry 5 times if connection fails
  reconnectionDelay: 1000,    // Wait 1 second before trying to reconnect
  reconnectionDelayMax: 5000, // Max wait time between retries
  timeout: 10000,             // Timeout for establishing a connection
});

socket.on('connect', () => {
  console.log('Connected to the Socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from the Socket server');
});

export default socket;
