const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Define allowed origins
const allowedOrigins = [
    'https://administrator-a9im-gbc8xvh3x-indhiran-gods-projects.vercel.app',
    'https://administrator-a9im.vercel.app'
];

// CORS configuration
app.use(cors({
    origin: allowedOrigins, // Allow specific frontend URLs
    credentials: true,      // Allow credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(cookieParser());

// Increase payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Set a request timeout
app.use((req, res, next) => {
    res.setTimeout(80000, () => { // 80 seconds timeout
        console.error('Request timed out.');
        res.status(408).json({ message: 'Request Timeout', error: true, success: false });
    });
    next();
});

// Handle CORS preflight requests across all routes
app.options('*', cors());

// API Routes
app.use("/api", router);

// Error-handling middleware
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'Payload too large. Please reduce the size of your request.',
        });
    }
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An unknown error occurred',
        error: true,
    });
});

// Set port for Vercel environment
const PORT = process.env.PORT || 8080;

// Start server and connect to DB
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to DB");
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
    });
