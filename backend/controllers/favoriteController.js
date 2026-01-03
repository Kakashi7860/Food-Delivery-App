const Favorite = require('../models/Favorite');

// @desc    Toggle Favorite (Add/Remove)
// @route   POST /api/favorites
// @access  Private
const toggleFavorite = async (req, res) => {
    const { itemId, type } = req.body; // itemId can be productId or restaurantId

    try {
        let query = { user: req.user._id, type };
        if (type === 'product') query.product = itemId;
        if (type === 'restaurant') query.restaurant = itemId;

        const existingFavorite = await Favorite.findOne(query);

        if (existingFavorite) {
            await existingFavorite.deleteOne();
            res.json({ message: 'Removed from favorites', isFavorite: false });
        } else {
            const newFavorite = new Favorite({
                user: req.user._id,
                type,
                product: type === 'product' ? itemId : undefined,
                restaurant: type === 'restaurant' ? itemId : undefined,
            });
            await newFavorite.save();
            res.json({ message: 'Added to favorites', isFavorite: true });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get My Favorites
// @route   GET /api/favorites
// @access  Private
const getMyFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id })
            .populate('product')
            .populate('restaurant', 'name image address cuisine'); // Populate restaurant fields

        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check if item is favorite
// @route   GET /api/favorites/check/:type/:id
// @access  Private
const checkFavorite = async (req, res) => {
    try {
        const { type, id } = req.params;
        let query = { user: req.user._id, type };
        if (type === 'product') query.product = id;
        if (type === 'restaurant') query.restaurant = id;

        const exists = await Favorite.findOne(query);
        res.json({ isFavorite: !!exists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { toggleFavorite, getMyFavorites, checkFavorite };
