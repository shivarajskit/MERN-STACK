const express = require('express');
const app = express();

// Secure APIs
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// Middleware
app.use(express.json());
app.use(helmet()); // set security headers
app.use(cors({origin: '*'})); // allow all origins (adjust in prod)
//app.use(mongoSanitize()); // prevent NoSQL injection

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter); // apply rate limiting to all requests

const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');



// Connect MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // register, login

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: err.message});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});