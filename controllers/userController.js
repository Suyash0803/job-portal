const User = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());

const updateController = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please enter all fields" });
    }

    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);  // Hash the password before saving

        await user.save();

        const token = user.createJWT();  // Ensure this method exists in your model

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: {
                email: user.email,
                role: user.role,
                name: user.name
            },
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateController;
