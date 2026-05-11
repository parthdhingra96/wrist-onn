const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    const orderItems = [];
    let totalAmount = 0;
    for (const item of cart.items) {
      const product = item.product;
      if (!product) continue;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
        });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.image || '',
      });
      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      status: 'pending',
      paymentMethod: req.body.paymentMethod || 'card',
    });
    cart.items = [];
    await cart.save();
    await order.populate('user', 'name email');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to place order' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to get orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to get orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'shipped', 'delivered'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use: pending, shipped, delivered' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    await order.save();
    await order.populate('user', 'name email');
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update order status' });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
