import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

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
      verificationToken,
    });

    await newUser.save();

    const verifyLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<a href="${verifyLink}">Click here to verify your email</a>`,
    });

    res.status(201).json({ message: 'User registered, please check your email to verify' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Verify email route
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send('Email verified successfully! You can now login.');
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
