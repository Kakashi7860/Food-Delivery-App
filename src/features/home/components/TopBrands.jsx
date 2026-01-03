import React from 'react';
import styles from './TopBrands.module.css';

const TopBrands = () => {
    // Using placeholder logos
    const brands = [
        { name: "McDonald's", time: '31 min', image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg' },
        { name: 'Burger King', time: '39 min', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/800px-Burger_King_2020.svg.png' },
        { name: "Domino's Pizza", time: '24 min', image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg' },
        { name: 'KFC', time: '34 min', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KFC_Logo.svg/1024px-KFC_Logo.svg.png' },
        { name: 'Pizza Hut', time: '40 min', image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza_Hut_logo_%282014%29.svg' },
        { name: 'Subway', time: '25 min', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Subway_2016_logo.svg' },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Top brands for you</h2>
                <div className={styles.grid}>
                    {brands.map((brand, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.imageWrapper}>
                                <div className={styles.circle}>
                                    <img src={brand.image} alt={brand.name} className={styles.image} />
                                </div>
                            </div>
                            <h3 className={styles.name}>{brand.name}</h3>
                            <p className={styles.time}>{brand.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopBrands;
