import burgerImg from '../../../assets/burger.png';
import pizzaImg from '../../../assets/pizza.png';
import sushiImg from '../../../assets/sushi.png';
import heroFood from '../../../assets/hero_food.png'; // Using hero image as a placeholder for burger place

export const categories = [
    { id: 1, name: 'Burger', image: burgerImg, count: 24, color: '#FFF2F2' },
    { id: 2, name: 'Pizza', image: pizzaImg, count: 18, color: '#F0F9FF' },
    { id: 3, name: 'Sushi', image: sushiImg, count: 12, color: '#F2FFF5' },
    { id: 4, name: 'Fried Chicken', image: heroFood, count: 15, color: '#FFF8F0' }, // Reusing hero for now
    { id: 5, name: 'Pasta', image: pizzaImg, count: 9, color: '#FFF2F9' },
    { id: 6, name: 'Dessert', image: burgerImg, count: 20, color: '#F2F2FF' },
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
        image: pizzaImg, // Placeholder
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
        image: heroFood, // Placeholder
        promoted: false,
    }
];
