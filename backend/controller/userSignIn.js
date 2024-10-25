const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password", success: false });

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Required for cross-site cookies on HTTPS
            sameSite: 'None'  // Required for cross-origin requests
        }).status(200).json({
            message: "Login successful",
            success: true
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message, success: false });
    }
}

module.exports = userSignInController;
