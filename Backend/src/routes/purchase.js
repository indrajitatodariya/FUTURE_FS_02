import express from 'express';
import Purchase from '../models/purchase.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  const { userId, items, shippingDetails } = req.body;

  try {
    
    const newPurchase = new Purchase({
      userId,
      items,
      shippingDetails,
      purchasedAt: new Date(),
    });

    await newPurchase.save();

    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    );

    res.status(201).json({ success: true, message: 'Purchase completed and cart cleared' });
  } catch (err) {
    console.error('Error saving purchase:', err);
    res.status(500).json({ success: false, message: 'Server error while saving purchase' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.params.userId }).sort({ purchasedAt: -1 });
    res.json(purchases);
  } catch (err) {
    console.error('Error fetching purchase history:', err);
    res.status(500).json({ message: 'Server error while fetching purchase history' });
  }
});

export default router;
