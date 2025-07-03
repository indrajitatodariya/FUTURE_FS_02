import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// 📧 Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("✅ EMAIL_USER in auth.js:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS in auth.js:", process.env.EMAIL_PASS);

// 📌 Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();

    const verifyLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email address',
      html: `<h2>Email Verification</h2>
             <p>Click the link below to verify your email address:</p>
             <a href="${verifyLink}">${verifyLink}</a>
             <p>If you did not request this, please ignore.</p>`,
    });

    res.status(201).json({ message: 'User registered, please check your email to verify' });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 📌 Verify email route
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send('Invalid or expired verification token');

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send('✅ Email verified successfully! You can now log in.');
  } catch (err) {
    console.error("Error in verification:", err);
    res.status(500).send('Server error during verification');
  }
});

// 📌 Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
