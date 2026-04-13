const Order = require('../models/Order.model');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress } = req.body;

        if (items && items.length === 0) {
            return res.status(400).json({ success: false, message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            deliveryAddress
        });

        const createdOrder = await order.save();
        res.status(201).json({ success: true, data: createdOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.food', 'name image');
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

            const updatedOrder = await order.save();
            res.json({ success: true, data: updatedOrder });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    updateOrderStatus
};
