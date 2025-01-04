import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');  // same mongoDb url here
export default socket;