const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        },
    ],
    address: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'COD'
    },
    instructions: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['Placed', 'Preparing', 'Delivered'],
        default: 'Placed',
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
