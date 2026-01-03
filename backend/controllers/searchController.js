const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Search for restaurants and products
// @route   GET /api/search?q=query
// @access  Public
const search = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.json({ restaurants: [], products: [] });
    }

    try {
        // Case insensitive regex
        const regex = new RegExp(query, 'i');

        // Search Restaurants (by name or cuisine)
        const restaurants = await User.find({
            role: 'restaurant',
            $or: [{ name: regex }, { cuisine: regex }]
        }).select('name cuisine image _id');

        // Search Products (by name or category)
        const products = await Product.find({
            $or: [{ name: regex }, { category: regex }, { description: regex }]
        }).populate('restaurant', 'name');

        res.json({ restaurants, products });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { search };
