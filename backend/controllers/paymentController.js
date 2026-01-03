const dotenv = require('dotenv');
dotenv.config();

// Safely initialize Stripe
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!stripe) {
            console.error("STRIPE_SECRET_KEY is missing in .env");
            return res.status(500).json({ message: "Stripe API Key is missing. Please set STRIPE_SECRET_KEY in backend/.env" });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd', // Assuming USD for now
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPaymentIntent };
