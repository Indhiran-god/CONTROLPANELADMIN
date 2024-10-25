const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  // Allow requests with no origin (like mobile apps or curl)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Allow credentials like cookies
}));

// You don't need app.options('*', cors()); if CORS is correctly configured
// This already handles preflight OPTIONS requests based on the CORS configuration above.

app.use(cookieParser());
app.use(express.json());

// Set a longer timeout for requests
app.use((req, res, next) => {
    res.setTimeout(30000, () => {  // 30 seconds
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
    });
}).catch(err => {
    console.error("Database connection failed:", err.message);
});