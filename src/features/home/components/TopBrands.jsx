import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopBrands.module.css';

import kfcImg from '../../../assets/kfc.png';
import pizzaHutImg from '../../../assets/pizzahut.png';

const TopBrands = () => {
    const [brands, setBrands] = React.useState([]);

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/api/restaurants');
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Error fetching top brands:", error);
            }
        };
        fetchRestaurants();
    }, []);

    // Helper to get image
    const getBrandImage = (name, serverImage) => {
        // If server has image, use it (in future)
        if (serverImage) return serverImage;

        // Fallback to local assets for demo names
        const lowerName = name.toLowerCase();
        if (lowerName.includes('kfc')) return kfcImg;
        if (lowerName.includes('pizza hut')) return pizzaHutImg;
        if (lowerName.includes('domino')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/200px-Dominos_pizza_logo.svg.png';
        if (lowerName.includes('mcdonald')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png';
        if (lowerName.includes('burger king')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/200px-Burger_King_2020.svg.png';
        if (lowerName.includes('subway')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/200px-Subway_2016_logo.svg.png';

        // Default placeholder
        return 'https://placehold.co/100?text=Brand';
    };

    if (brands.length === 0) return null; // Or show loading/placeholder

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Top brands for you</h2>
                <div className={styles.grid}>
                    {brands.map((brand, index) => (
                        <Link to={`/restaurants/${brand._id}`} key={brand._id || index} className={styles.itemLink}>
                            <div className={styles.item}>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.circle}>
                                        <img
                                            src={getBrandImage(brand.name, brand.image)}
                                            alt={brand.name}
                                            className={styles.image}
                                        />
                                    </div>
                                </div>
                                <h3 className={styles.name}>{brand.name}</h3>
                                <p className={styles.time}>{brand.cuisine || '30 min'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopBrands;
