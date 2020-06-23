const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
//const connectDB = require('connectDB');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

const bootcamps = require('./routes/bootcamps');
// 0.- Create new express app
const app = express();

// Body parser, this allow us to get req.body of a JSON request
app.use(express.json());

// Logging middleware "morgan"
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

// 2.- Configure port
const PORT = process.env.PORT || 5000;

// 3.- Initialize server through listen method
const server = app.listen(PORT, () => {
  console.log(`App runnning in ${process.env.NODE_ENV} on port ${PORT}!`);
});

// Handle rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

