import React from 'react';
import styles from './InspirationSection.module.css';
import burgerImg from '../../../assets/burger.png';
import pizzaImg from '../../../assets/pizza.png';
import sushiImg from '../../../assets/sushi.png';
import drinkImg from '../../../assets/drink.png';
import dessertImg from '../../../assets/dessert.png';
import saladImg from '../../../assets/salad.png';

const InspirationSection = () => {
    const items = [
        { name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Pizza', image: pizzaImg },
        { name: 'Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Veg Meal', image: saladImg },
        { name: 'Burger', image: burgerImg },
        { name: 'Chicken', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Inspiration for your first order</h2>
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.image} />
                            </div>
                            <p className={styles.name}>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InspirationSection;
