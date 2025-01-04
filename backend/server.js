const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");
const reviewRoutes = require("./routes/reviewRoutes");
const recommendationRoutes = require('./routes/recommendation');
const socketIo = require('socket.io');
const http = require('http');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// routes placing 
const orderRoutes = require("./routes/orderRoutes");
const itemRoutes = require("./routes/itemRoutes");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Create the server and initialize Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// routing placing completess here 
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api', recommendationRoutes); 

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Emit an event to notify all connected clients about a new order (example)
  socket.emit('newNotification', { message: 'A new order has been placed!' });
});

// testing -1 [done]
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// testing -2 [done]
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.post('/test', (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: 'Request received', data: req.body });
  } catch (err) {
    console.error('Error parsing JSON:', err.message);
    res.status(400).json({ error: 'Invalid JSON input' });
  }
});

app.post('/api/reviews', (req, res) => {
  console.log(req.body); // Debugging line
  if (!req.body.title || !req.body.description || !req.body.rating) {
      return res.status(400).json({ message: "All fields are required." });
  }
  // Proceed with saving data...
});
