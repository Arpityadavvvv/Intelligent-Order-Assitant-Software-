const express = require("express");
const router = express.Router();
const Item = require("../models/item"); // Product model
const { body, validationResult } = require("express-validator");

// 1. GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to fetch products", error: error.message });
  }
});

// 2. POST: Add a new product with validation
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, stock } = req.body;

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
      res.status(500).json({ message: "Server error: Failed to save product", error: error.message });
    }
  }
);

// 3. GET: Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Item.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to fetch product", error: error.message });
  }
});

// 4. PUT: Update a product's details with validation
router.put(
  "/:id",
  [
    body("name").optional().isString(),
    body("price").optional().isFloat({ min: 0 }),
    body("stock").optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, stock } = req.body;

    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { name, description, price, stock },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Server error: Failed to update product", error: error.message });
    }
  }
);

// 5. DELETE: Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to delete product", error: error.message });
  }
});

module.exports = router;
