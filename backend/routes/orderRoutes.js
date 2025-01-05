const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Order model
const Joi = require("joi"); // Joi validation

// Order schema for validation
const orderSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array().items(Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().positive().required(),
  })).required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string().valid('Pending', 'Shipped', 'Delivered').default('Pending'),
});

// 1. GET: Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 2. POST: Create a new order
router.post("/", async (req, res) => {
  // Validate the request body using Joi
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { userId, products, totalAmount, status } = req.body;

  const newOrder = new Order({
    userId,
    products,
    totalAmount,
    status,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving order" });
  }
});

// 3. GET: Fetch a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
});

// 4. PUT: Update an order's status
router.put("/:id", async (req, res) => {
  // Validate the request body for status update
  const { status } = req.body;
  if (!status || !['Pending', 'Shipped', 'Delivered'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order" });
  }
});

// 5. DELETE: Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = router;
