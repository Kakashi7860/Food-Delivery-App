const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        // Using a placeholder for now if no image is provided
        default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    category: {
        type: String,
        required: true,
        enum: ['Burger', 'Pizza', 'Dessert', 'Drinks', 'Salad', 'Sushi', 'Fast Food', 'Veg', 'Non-Veg', 'Other'],
    },
    isVeg: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [], // Placeholder for reviews
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
