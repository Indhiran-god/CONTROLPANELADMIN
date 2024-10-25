const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        console.log("Request Origin:", origin);  // Log incoming request origin for debugging
        if (allowedOrigins.includes(origin) || !origin) {  // Allow requests with no origin (e.g., mobile apps or curl)
            callback(null, true);
        } else {
            console.error("Blocked by CORS:", origin);  // Log blocked origins for better debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],  // Expanded headers
    credentials: true  // Allow credentials like cookies
}));

// Body Parsing and Cookie Parsing Middleware
app.use(cookieParser());
app.use(express.json());

// Set a longer timeout for requests
app.use((req, res, next) => {
    res.setTimeout(30000, () => {  // 30 seconds timeout
        console.log('Request has timed out.');
        res.sendStatus(408);  // Send a 408 Request Timeout status code
    });
    next();
});

// API Routes
app.use("/api", router);

// Start server and connect to DB
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
        console.log("Allowed Origins:", allowedOrigins);  // Log allowed origins at startup
    });
}).catch(err => {
    console.error("Database connection failed:", err.message);
});
