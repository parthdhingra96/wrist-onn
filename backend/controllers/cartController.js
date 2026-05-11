const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to get cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + quantity;
      if (product.stock < newQty) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[existingIndex].quantity = newQty;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to add to cart' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity == null || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }
    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to remove from cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
};
