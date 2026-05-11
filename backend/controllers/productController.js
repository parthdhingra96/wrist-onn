const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch product' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    if (!name || !description || price == null || !category || stock == null) {
      return res.status(400).json({ message: 'Please provide name, description, price, category and stock' });
    }
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image: image || '',
      category,
      stock: Number(stock),
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to add product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const { name, description, price, image, category, stock } = req.body;
    if (name != null) product.name = name;
    if (description != null) product.description = description;
    if (price != null) product.price = Number(price);
    if (image != null) product.image = image;
    if (category != null) product.category = category;
    if (stock != null) product.stock = Number(stock);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
