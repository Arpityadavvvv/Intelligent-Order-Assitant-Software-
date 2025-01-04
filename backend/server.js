const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const User = require('./models/User');
const recommendationRoutes = require('./routes/recommendation');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Chatbot endpoint for Google Gemini integration
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://gemini.googleapis.com/v1alpha1/chatbot', // Adjust to the actual API endpoint
      { message },
      { headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` } }
    );
    const botResponse = response.data.reply;

    res.status(200).json({ reply: botResponse });
  } catch (error) {
    console.error('Error in Gemini integration:', error);
    res.status(500).json({ error: 'Failed to communicate with chatbot service' });
  }
});

// WebSocket for real-time communication
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Test route for email sending
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, orderDetails } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      text: `Order Details: \n${orderDetails}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
