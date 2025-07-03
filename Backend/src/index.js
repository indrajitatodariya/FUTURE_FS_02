const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// ✅ Define cart schema (you can put in a new file if you want)
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: Number,
      title: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

// ✅ Get user's cart
router.get('/cart/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart ? cart.items : []);
});

// ✅ Add/update cart
router.post('/cart/:userId', async (req, res) => {
  const { product } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });

  if (!cart) {
    cart = new Cart({ userId: req.params.userId, items: [] });
  }

  const existing = cart.items.find(item => item.productId === product.productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }

  await cart.save();
  res.json(cart.items);
});

// ✅ Remove item
router.delete('/cart/:userId/item/:productId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (cart) {
    cart.items = cart.items.filter(item => item.productId != req.params.productId);
    await cart.save();
  }
  res.json(cart ? cart.items : []);
});

module.exports = router;
