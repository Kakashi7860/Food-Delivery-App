import burgerImg from '../../../assets/burger.png';
import pizzaImg from '../../../assets/pizza.png';
import sushiImg from '../../../assets/sushi.png';
import heroFood from '../../../assets/hero_food.png';
import drinkImg from '../../../assets/drink.png';
import dessertImg from '../../../assets/dessert.png';
import saladImg from '../../../assets/salad.png';

export const categories = [
    { id: 'all', name: 'All', image: null, count: 0, color: '#FFFFFF' },
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
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, onions, and our special secret sauce. Served on a toasted brioche bun.',
        category: 'fast_food',
        image: burgerImg,
        images: [burgerImg, heroFood, burgerImg], // Mock gallery
        isVeg: false,
        rating: 4.5,
        calories: 650,
        protein: '35g',
        tags: ['American', 'Cheesy', 'Main Course'],
        reviews: [
            { id: 1, user: 'John Doe', rating: 5, comment: 'Best burger in town!', date: '2 days ago' },
            { id: 2, user: 'Jane Smith', rating: 4, comment: 'Very juicy but slightly salty.', date: '1 week ago' }
        ]
    },
    {
        id: 102,
        name: 'Margherita Pizza',
        price: 12.50,
        description: 'Classic Margherita with fresh basil, mozzarella di bufala, and San Marzano tomato sauce on a thin crispy crust.',
        category: 'veg',
        image: pizzaImg,
        images: [pizzaImg, pizzaImg, pizzaImg],
        isVeg: true,
        rating: 4.7,
        calories: 800,
        protein: '25g',
        tags: ['Italian', 'Vegetarian', 'Pizza'],
        reviews: []
    },
    {
        id: 103,
        name: 'Chicken Pepperoni Pizza',
        price: 14.99,
        description: 'Spicy chicken pepperoni slices with extra mozzarella cheese and a sprinkle of oregano.',
        category: 'non_veg',
        image: pizzaImg,
        images: [pizzaImg, pizzaImg],
        isVeg: false,
        rating: 4.6,
        calories: 900,
        protein: '40g',
        tags: ['Italian', 'Spicy', 'Pizza'],
        reviews: []
    },
    {
        id: 104,
        name: 'Dragon Roll Sushi',
        price: 18.00,
        description: 'Premium eel and cucumber roll topped with fresh avocado slices and tobiko (fish roe). Served with soy sauce and wasabi.',
        category: 'non_veg',
        image: sushiImg,
        images: [sushiImg, sushiImg],
        isVeg: false,
        rating: 4.9,
        calories: 500,
        protein: '20g',
        tags: ['Japanese', 'Seafood', 'Luxury'],
        reviews: []
    },
    {
        id: 105,
        name: 'Fresh Garden Salad',
        price: 9.50,
        description: 'A refreshing mix of crisp lettuce, cherry tomatoes, cucumber, avocado, red onion, and sweet corn. Dressed with a light lemon vinaigrette.',
        category: 'veg',
        image: saladImg,
        images: [saladImg, saladImg],
        isVeg: true,
        rating: 4.4,
        calories: 320,
        protein: '8g',
        tags: ['Healthy', 'Vegan', 'Low Calorie'],
        reviews: [
            { id: 1, user: 'Alice', rating: 5, comment: 'Super fresh and crunchy!', date: '3 days ago' }
        ]
    },
    {
        id: 106,
        name: 'Crispy Fried Chicken',
        price: 11.99,
        description: 'Golden fried chicken pieces seasoned with our signature spice blend. Served with a side of creamy coleslaw.',
        category: 'fast_food',
        image: heroFood,
        images: [heroFood, heroFood],
        isVeg: false,
        rating: 4.8,
        calories: 750,
        protein: '45g',
        tags: ['American', 'Fried', 'Crispy'],
        reviews: []
    },
    {
        id: 107,
        name: 'Strawberry Chocolate Cake',
        price: 6.50,
        description: 'Decadent rich chocolate layer cake topped with fresh, sweet strawberries and a drizzle of strawberry sauce.',
        category: 'dessert',
        image: dessertImg,
        images: [dessertImg, dessertImg],
        isVeg: true,
        rating: 4.9,
        calories: 450,
        protein: '6g',
        tags: ['Dessert', 'Sweet', 'Indulgent'],
        reviews: []
    },
    {
        id: 108,
        name: 'Iced Cola with Lemon',
        price: 2.99,
        description: 'Ice-cold cola served with plenty of ice cubes and a fresh slice of lemon for that extra zing.',
        category: 'drinks',
        image: drinkImg,
        images: [drinkImg, drinkImg],
        isVeg: true,
        rating: 4.2,
        calories: 140,
        protein: '0g',
        tags: ['Drink', 'Refreshing', 'Cold'],
        reviews: []
    },
    {
        id: 109,
        name: 'Veggie Burger',
        price: 7.99,
        description: 'Wholesome plant-based patty with fresh lettuce, tomato, and vegan mayo on a whole wheat bun.',
        category: 'veg',
        image: burgerImg,
        images: [burgerImg, burgerImg],
        isVeg: true,
        rating: 4.3,
        calories: 550,
        protein: '18g',
        tags: ['Healthy', 'Burger', 'Vegetarian'],
        reviews: []
    },
];
