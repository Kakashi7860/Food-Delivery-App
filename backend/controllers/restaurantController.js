const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await User.find({ role: 'restaurant' }).select('-password');
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get restaurant by ID with products
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await User.findById(req.params.id).select('-password');

        if (restaurant && restaurant.role === 'restaurant') {
            const products = await Product.find({ restaurant: restaurant._id });

            res.json({
                ...restaurant._doc,
                products
            });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
};
