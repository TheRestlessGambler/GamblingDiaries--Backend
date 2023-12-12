const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();




// Connect to MongoDB


// Define a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phoneNumber: String,
  gender: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Register a new user and generate a JWT token
router.post('/', async (req, res) => {
  try {
    const { username, email, password, phoneNumber, gender } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the registered user
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '24h',
    });

    res.status(201).json({ message: 'User registered successfully', token , user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the app and User model
module.exports = {router,User};

