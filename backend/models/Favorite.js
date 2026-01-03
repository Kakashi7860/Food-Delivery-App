const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['product', 'restaurant'],
        required: true
    }
}, {
    timestamps: true,
});

// Ensure a user can't favorite the same thing twice
favoriteSchema.index({ user: 1, product: 1, restaurant: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
