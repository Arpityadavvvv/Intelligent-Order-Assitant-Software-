const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

// Routes
const User = require('./models/User');
const recommendationRoutes = require('./routes/recommendation');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Load environment variables
dotenv.config();

// Check if environment variables are set correctly
if (!process.env.MONGODB_URL || !process.env.GEMINI_API_KEY || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing required environment variables!');
  process.exit(1);
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // Replace '*' with specific origin in production
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Rate limiting for sensitive routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB connected successfully!'))
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process on DB connection failure
  });

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Chatbot endpoint for Google Gemini integration
app.post(
  '/api/chat',
  body('message').isString().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;

    try {
      const response = await axios.post(
        'https://gemini.googleapis.com/v1alpha1/chatbot',
        { message },
        { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
      );
      const botResponse = response.data.reply;

      res.status(200).json({ reply: botResponse });
    } catch (error) {
      logger.error('Error in Gemini integration:', error);
      next(error); // Pass the error to centralized error handler
    }
  }
);

// WebSocket for real-time communication
io.on('connection', (socket) => {
  logger.info('User connected');
  socket.on('disconnect', () => {
    logger.info('User disconnected');
  });
});

// Test route for email sending
app.post(
  '/api/send-email',
  body('email').isEmail(),
  body('orderDetails').isString().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, orderDetails } = req.body;

    try {
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
      logger.error('Error sending email:', error);
      next(error);
    }
  }
);

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});


// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// Start the server
// Remove this duplicate declaration if it's already there
// const PORT = process.env.PORT || 5000;

// Use the existing PORT declaration
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

