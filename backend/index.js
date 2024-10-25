// Import required modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

<<<<<<< HEAD
// CORS configuration
=======
// Define allowed origins
const allowedOrigins = [process.env.FRONTEND_URL];

// CORS Configuration
>>>>>>> 7d8001d5746fe9a779a81cdac96de25a72c72c19
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow your frontend URL
    credentials: true,  // Allow credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
<<<<<<< HEAD
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/api", router);
=======
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true  // Allow credentials like cookies
}));

// Middleware for parsing cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Set a response timeout
app.use((req, res, next) => {
    res.setTimeout(30000, () => {  // 30 seconds timeout
        console.log('Request has timed out.');
        res.sendStatus(408);  // Send a 408 Request Timeout status code
    });
    next();
});

// Handle CORS preflight requests across all routes
app.options('*', cors());  // Preflight for all routes

// API Routes with correct headers for Vercel deployment
app.use("/api", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Ensure Vercel sends the correct origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}, router);

// Set port for Vercel environment
const PORT = 8080;
>>>>>>> 7d8001d5746fe9a779a81cdac96de25a72c72c19

// Start server and connect to DB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection failed:", err.message);
});
