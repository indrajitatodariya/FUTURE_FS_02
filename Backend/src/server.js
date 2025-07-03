import dotenv from 'dotenv';
import path from 'path';

// ✅ Load .env
dotenv.config({ path: path.resolve('./.env') });
console.log("✅ EMAIL_USER in auth.js:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS in auth.js:", process.env.EMAIL_PASS);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import purchaseRoutes from './routes/purchase.js'; 
import orderRoutes from './routes/order.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchase', purchaseRoutes); 
app.use('/api/order', orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
