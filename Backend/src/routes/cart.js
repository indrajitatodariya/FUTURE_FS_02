import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Save cart
router.post("/save", async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userId, items });
      await cart.save();
    }
    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
