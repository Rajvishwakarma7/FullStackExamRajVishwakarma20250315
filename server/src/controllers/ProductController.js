const Product = require("../models/mongo/Product");

const ProductController = {
  async createProduct(req, res) {
    try {
      const { name, description, price, category, stock, image } = req.body;
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock,
        image,
      });
      await newProduct.save();
      res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = ProductController;
