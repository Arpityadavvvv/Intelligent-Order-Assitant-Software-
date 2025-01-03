const express = require("express");
const router = express.Router();
const Item = require("../models/item"); // Product model

// 1. GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST: Add a new product
router.post("/", async (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Name, price, and stock are required" });
  }

  const newItem = new Item({
    name,
    description,
    price,
    stock,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. GET: Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Item.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. PUT: Update a product's details
router.put("/:id", async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    item.name = name ||  item.name;
    item.description = description ||  item.description;
    item.price = price ||  item.price;
    item.stock = stock ||  item.stock;

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. DELETE: Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const  item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    await item.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
