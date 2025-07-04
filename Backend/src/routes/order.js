import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


router.post("/create", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to create order" });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to get orders" });
  }
});

export default router;
