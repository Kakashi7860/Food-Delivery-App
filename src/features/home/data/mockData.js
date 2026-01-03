import burgerImg from '../../../assets/burger.png';
import pizzaImg from '../../../assets/pizza.png';
import sushiImg from '../../../assets/sushi.png';
import heroFood from '../../../assets/hero_food.png';
import drinkImg from '../../../assets/drink.png';
import dessertImg from '../../../assets/dessert.png';
import saladImg from '../../../assets/salad.png';

export const categories = [
    { id: 'all', name: 'All', image: null, count: 0, color: '#FFFFFF' }, // Special category
    { id: 'fast_food', name: 'Fast Food', image: burgerImg, count: 24, color: '#FFF2F2' },
    { id: 'veg', name: 'Veg', image: saladImg, count: 18, color: '#F0F9FF' },
    { id: 'non_veg', name: 'Non Veg', image: heroFood, count: 15, color: '#FFF8F0' },
    { id: 'drinks', name: 'Drinks', image: drinkImg, count: 12, color: '#F2FFF5' },
    { id: 'dessert', name: 'Dessert', image: dessertImg, count: 20, color: '#F2F2FF' },
];

export const restaurants = [
    {
        id: 1,
        name: 'Burger King Premium',
        rating: 4.8,
        reviews: '1.2k',
        time: '20-25 min',
        deliveryFee: '$2.00',
        tags: ['Burger', 'American', 'Fast Food'],
        image: heroFood,
        promoted: true,
    },
    {
        id: 2,
        name: 'Sushi Master',
        rating: 4.9,
        reviews: '850',
        time: '45-55 min',
        deliveryFee: 'Free',
        tags: ['Japanese', 'Sushi', 'Gourmet'],
        image: sushiImg,
        promoted: false,
        discount: '20% OFF',
    },
    {
        id: 3,
        name: 'Italiano Pizza',
        rating: 4.5,
        reviews: '2k+',
        time: '30-35 min',
        deliveryFee: '$1.50',
        tags: ['Pizza', 'Italian', 'Comfort Food'],
        image: pizzaImg,
        promoted: false,
    },
    {
        id: 4,
        name: 'Spicy House',
        rating: 4.2,
        reviews: '500+',
        time: '15-25 min',
        deliveryFee: '$3.99',
        tags: ['Asian', 'Spicy', 'Noodles'],
        image: heroFood,
        promoted: false,
    }
];

export const menuItems = [
    {
        id: 101,
        name: 'Classic Cheeseburger',
        price: 8.99,
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce.',
        category: 'fast_food',
        image: burgerImg,
        isVeg: false,
        rating: 4.5,
    },
    {
        id: 102,
        name: 'Margherita Pizza',
        price: 12.50,
        description: 'Fresh basil, mozzarella cheese, and tomato sauce suitable for vegetarians.',
        category: 'veg',
        image: pizzaImg,
        isVeg: true,
        rating: 4.7,
    },
    {
        id: 103,
        name: 'Chicken Pepperoni Pizza',
        price: 14.99,
        description: 'Spicy chicken pepperoni with extra cheese and oregano.',
        category: 'non_veg',
        image: pizzaImg,
        isVeg: false,
        rating: 4.6,
    },
    {
        id: 104,
        name: 'Dragon Roll Sushi',
        price: 18.00,
        description: 'Eel and cucumber inside, topped with avocado and tobiko.',
        category: 'non_veg',
        image: sushiImg,
        isVeg: false,
        rating: 4.9,
    },
    {
        id: 105,
        name: 'Fresh Garden Salad',
        price: 9.50,
        description: 'Mix of fresh greens, cherry tomatoes, cucumber, and vinaigrette dressing.',
        category: 'veg',
        image: saladImg,
        isVeg: true,
        rating: 4.4,
    },
    {
        id: 106,
        name: 'Crispy Fried Chicken',
        price: 11.99,
        description: 'Golden fried chicken pieces with a side of coleslaw.',
        category: 'fast_food',
        image: heroFood,
        isVeg: false,
        rating: 4.8,
    },
    {
        id: 107,
        name: 'Strawberry Chocolate Cake',
        price: 6.50,
        description: 'Rich chocolate layer cake topped with fresh strawberries.',
        category: 'dessert',
        image: dessertImg,
        isVeg: true, // Vegetarian (contains egg/milk usually but often classified as veg in some contexts, let's assume 'lacto-ovo' is veg for now or strictly veg if eggless. I'll mark veg for simplicity)
        rating: 4.9,
    },
    {
        id: 108,
        name: 'Iced Cola with Lemon',
        price: 2.99,
        description: 'Refreshing cola drink served with ice and lemon slice.',
        category: 'drinks',
        image: drinkImg,
        isVeg: true,
        rating: 4.2,
    },
    {
        id: 109,
        name: 'Veggie Burger',
        price: 7.99,
        description: 'Plant-based patty with fresh veggies and vegan mayo.',
        category: 'veg',
        image: burgerImg, // reusing burger img
        isVeg: true,
        rating: 4.3,
    },
];
