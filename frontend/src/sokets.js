import { io } from "socket.io-client";

// Configure the socket connection
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // Ensure WebSocket is the primary transport
  path: "/socket.io", // Match this path with your backend's configuration
  reconnection: true, // Enable reconnection on disconnection
  reconnectionAttempts: 5, // Limit the number of reconnection attempts
  timeout: 10000, // Set a timeout for connection in milliseconds
});

// Handle connection events for debugging
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
});

export default socket;

