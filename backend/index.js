// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');  // Import API routes

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Set up CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Allows requests only from specified frontend URL
  credentials: true,                 // Allows cookies and HTTP auth with cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],     // Allowed headers in requests
};

// Use CORS with specified options
app.use(cors(corsOptions));

// Parse JSON bodies for this app
app.use(express.json());

// Register API routes
app.use('/api', apiRoutes);

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
