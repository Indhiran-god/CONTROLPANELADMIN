const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Extract token from cookie or Authorization header
        const token = req.cookies?.token || req.headers['authorization']?.split(" ")[1];
        
        console.log("Extracted Token:", token);  // Debugging

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "User not logged in or token missing",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err);  // Debugging
                return res.status(403).json({
                    message: "Token is invalid or expired",
                    error: true,
                    success: false
                });
            }
            
            console.log("Decoded Token Data:", decoded);  // Debugging

            // Ensure req.user object exists
            req.user = req.user || {};
            req.userId = decoded?._id;  // Set the user ID from token payload

            next();  // Proceed to the next middleware/route handler
        });

    } catch (err) {
        console.error("Authorization Middleware Error:", err);  // Debugging
        res.status(400).json({
            message: err.message || "Authorization error",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
