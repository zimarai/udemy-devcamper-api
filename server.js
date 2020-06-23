const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Create new express app
const app = express();

// Body parser, this allow us to get req.body of a JSON request
app.use(express.json());

// Logging middleware "morgan"
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

// Custom error Handler
app.use(errorHandler);

// Configure port
const PORT = process.env.PORT || 5000;

// Initialize server through listen method
const server = app.listen(PORT, () => {
  console.log(`App runnning in ${process.env.NODE_ENV} on port ${PORT}!`);
});

// Handle rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

