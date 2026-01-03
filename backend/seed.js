
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // Removed to avoid error if file missing
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order'); // Import Order model
const bcrypt = require('bcryptjs');

dotenv.config();

// Connect to DB manually if config/db doesn't exist or just to be safe in this script
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data? Maybe safer not to delete everything if user has some data, 
        // but for a clean "optimization" start, let's clear Restaurants and Products.
        // We will keep 'customer' users though.
        await User.deleteMany({ role: 'restaurant' });
        await Product.deleteMany({});
        await Order.deleteMany({}); // Clear old orders to prevent broken links

        console.log('Cleared existing Restaurants, Products, and Orders...');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const restaurants = [
            {
                name: "Burger King",
                email: "bk@example.com",
                password: hashedPassword,
                role: "restaurant",
                address: "45 Food Court, Downtown",
                cuisine: "Burgers, Fast Food",
                phone: "555-0101",
                image: "/logos/burger-king.png", // Burger place image
                items: [
                    { name: "Whopper", price: 5.99, description: "Flame-grilled beef patty, topped with tomatoes, cut lettuce, mayo, ketchup, pickles, and white onions on a soft sesame seed bun.", category: "Burger", isVeg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", calories: 660, protein: "28g", tags: ["Best Seller", "Signature"] },
                    { name: "Chicken Royale", price: 6.49, description: "Crispy chicken breast with lettuce and mayo on a sesame seed bun.", category: "Burger", isVeg: false, image: "https://images.unsplash.com/photo-1615297928064-24977384d0f9?w=800&q=80", calories: 600, protein: "24g", tags: ["Crispy", "Chicken"] },
                    { name: "Veggie Bean Burger", price: 5.49, description: "Vegetable patty with lettuce, tomato, ketchup and vegan mayo.", category: "Burger", isVeg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", calories: 550, protein: "18g", tags: ["Vegan Friendly"] },
                    { name: "Fries (Medium)", price: 2.99, description: "Classic salted french fries.", category: "Fast Food", isVeg: true, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80", calories: 320, protein: "4g", tags: ["Side"] },
                    { name: "Coke", price: 1.99, description: "Chilled Coca-Cola can.", category: "Drinks", isVeg: true, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80", calories: 140, protein: "0g", tags: ["Cold"] },
                ]
            },
            {
                name: "Pizza Hut",
                email: "pizzahut@example.com",
                password: hashedPassword,
                role: "restaurant",
                address: "123 Pizza Lane",
                cuisine: "Pizza, Italian",
                phone: "555-0102",
                image: "/logos/pizza-hut.png", // Pizza place image
                items: [
                    { name: "Pepperoni Feast", price: 14.99, description: "Pepperoni, pepperoni and more pepperoni.", category: "Pizza", isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80", calories: 280, protein: "12g", tags: ["Popular", "Spicy"] },
                    { name: "Veggie Supreme", price: 13.99, description: "Mushrooms, mixed peppers, red onions and sweetcorn.", category: "Pizza", isVeg: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", calories: 250, protein: "10g", tags: ["Veg Loaded"] },
                    { name: "Margherita", price: 10.99, description: "Classic mozzarella cheese and tomato sauce.", category: "Pizza", isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", calories: 220, protein: "10g", tags: ["Classic"] },
                    { name: "Garlic Bread", price: 4.99, description: "Crunchy baguette slices with garlic butter.", category: "Fast Food", isVeg: true, image: "https://images.unsplash.com/photo-1619535860434-7f0863384d41?w=800&q=80", calories: 180, protein: "5g", tags: ["Side", "Crunchy"] },
                ]
            },
            {
                name: "Sushi Master",
                email: "sushi@example.com",
                password: hashedPassword,
                role: "restaurant",
                address: "88 Ocean Drive",
                cuisine: "Japanese, Sushi",
                phone: "555-0103",
                image: "/logos/sushi-master.png",
                items: [
                    { name: "Salmon Nigiri Box", price: 12.99, description: "6 pieces of fresh salmon nigiri.", category: "Sushi", isVeg: false, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", calories: 350, protein: "22g", tags: ["Fresh", "Raw"] },
                    { name: "California Roll", price: 8.99, description: "Crab, avocado, and cucumber rolled inside-out.", category: "Sushi", isVeg: false, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80", calories: 320, protein: "12g", tags: ["Popular"] },
                    { name: "Miso Soup", price: 3.50, description: "Traditional Japanese soup with tofu and seaweed.", category: "Other", isVeg: true, image: "https://images.unsplash.com/photo-1547592166-23acbe3229b7?w=800&q=80", calories: 80, protein: "4g", tags: ["Warm", "Healthy"] },
                    { name: "Vegetable Tempura", price: 9.99, description: "Crispy fried assorted vegetables.", category: "Veg", isVeg: true, image: "https://images.unsplash.com/photo-1601314167099-e9e6c38db230?w=800&q=80", calories: 400, protein: "8g", tags: ["Crispy", "Veg"] },
                ]
            },
            {
                name: "KFC",
                email: "kfc@example.com",
                password: hashedPassword,
                role: "restaurant",
                address: "99 Crispy Rd",
                cuisine: "Chicken, Fast Food",
                phone: "555-0104",
                image: "/logos/kfc.png", // Fried chicken place image
                items: [
                    { name: "Fried Chicken Bucket", price: 18.99, description: "10 pieces of our signature original recipe chicken.", category: "Fast Food", isVeg: false, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80", calories: 2500, protein: "180g", tags: ["Shareable", "Fried"] },
                    { name: "Zinger Burger", price: 6.99, description: "Spicy chicken fillet burger.", category: "Burger", isVeg: false, image: "https://images.unsplash.com/photo-1619250914856-12c8b822d645?w=800&q=80", calories: 550, protein: "24g", tags: ["Spicy"] },
                    { name: "Coleslaw", price: 2.99, description: "Freshly prepared cabbage and carrot salad.", category: "Salad", isVeg: true, image: "https://images.unsplash.com/photo-1620579930883-7c98097b6925?w=800&q=80", calories: 150, protein: "1g", tags: ["Side"] },
                ]
            },
            {
                name: "Sweet Cravings",
                email: "sweet@example.com",
                password: hashedPassword,
                role: "restaurant",
                address: "21 Baker St",
                cuisine: "Desserts, Bakery",
                phone: "555-0105",
                image: "/logos/sweet-cravings.png", // Bakery image
                items: [
                    { name: "Chocolate Cake Slice", price: 4.99, description: "Rich and moist chocolate cake with ganache.", category: "Dessert", isVeg: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", calories: 450, protein: "6g", tags: ["Sweet", "Rich"] },
                    { name: "Strawberry Cheesecake", price: 5.99, description: "Creamy cheesecake with fresh strawberries.", category: "Dessert", isVeg: true, image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80", calories: 400, protein: "8g", tags: ["Fruity"] },
                    { name: "Donut Box (6)", price: 8.99, description: "Assorted donuts including glazed and chocolate.", category: "Dessert", isVeg: true, image: "https://images.unsplash.com/photo-1551024601-563799a63b7e?w=800&q=80", calories: 1500, protein: "20g", tags: ["Shareable"] }
                ]
            }
        ];

        for (const r of restaurants) {
            // Create User/Restaurant
            const user = await User.create({
                name: r.name,
                email: r.email,
                password: r.password,
                role: r.role,
                address: r.address,
                cuisine: r.cuisine,
                phone: r.phone,
                // image: r.image // We updated User model to have image, but haven't updated this script to save it.
                // Ah, I missed adding 'image: r.image' in the User.create call previously. Let's add it now.
                image: r.image
            });

            console.log(`Created Restaurant: ${user.name} `);

            // Create Products
            for (const item of r.items) {
                await Product.create({
                    ...item,
                    restaurant: user._id, // Set the relationship
                    rating: 4.5, // Default nice rating
                    reviews: []
                });
            }
        }

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
