const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Handle preflight requests
app.options('*', cors()); // Enable pre-flight across-the-board

// Set a longer timeout for requests
app.use((req, res, next) => {
    res.setTimeout(30000, () => { // 30 seconds
        console.log('Request has timed out.');
        res.sendStatus(408); // Send a 408 Request Timeout status code
    });
    next();
});

// API Routes
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

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
