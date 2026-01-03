const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentMethod, instructions } = req.body;

        if (items && items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentMethod,
            instructions,
            status: 'Placed', // Initial status
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get order by ID with Status Simulation
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            // SIMULATION LOGIC
            // Calculate time passed since creation
            const now = new Date();
            const created = new Date(order.createdAt);
            const diffMs = now - created;
            const diffMins = Math.floor(diffMs / 60000);

            let newStatus = order.status;

            // 0-1 minute: Placed
            // 1-5 minutes: Preparing
            // 5+ minutes: Delivered
            if (diffMins < 1) {
                newStatus = 'Placed';
            } else if (diffMins < 5) {
                newStatus = 'Preparing';
            } else {
                newStatus = 'Delivered';
            }

            // Update status in DB if changed
            if (order.status !== newStatus) {
                order.status = newStatus;
                await order.save();
            }

            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

        // Apply status simulation to all orders (optional, but good for consistency)
        const updatedOrders = [];
        const now = new Date();

        for (let order of orders) {
            const created = new Date(order.createdAt);
            const diffMs = now - created;
            const diffMins = Math.floor(diffMs / 60000);
            let newStatus = order.status;

            if (diffMins < 1) newStatus = 'Placed';
            else if (diffMins < 5) newStatus = 'Preparing';
            else newStatus = 'Delivered';

            if (order.status !== newStatus) {
                order.status = newStatus;
                await order.save();
            }
            updatedOrders.push(order);
        }

        res.json(updatedOrders);
    } catch (error) {
        console.error("Get My Orders Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getMyOrders,
};
