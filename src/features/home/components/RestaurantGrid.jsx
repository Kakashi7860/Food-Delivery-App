import React from 'react';
import { Star, Clock } from 'lucide-react';
import styles from './RestaurantGrid.module.css';

const RestaurantGrid = ({ restaurants }) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Popular Restaurants</h2>
                <a href="#" className={styles.viewAll}>View All</a>
            </div>

            <div className={styles.grid}>
                {restaurants.map((place) => (
                    <div key={place.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img src={place.image} alt={place.name} className={styles.image} />
                            {place.promoted && <span className={styles.badge}>Promoted</span>}
                            {place.discount && <span className={styles.discount}>{place.discount}</span>}
                            <div className={styles.timeBadge}>
                                <Clock size={12} /> {place.time}
                            </div>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.row}>
                                <h3 className={styles.name}>{place.name}</h3>
                                <div className={styles.rating}>
                                    <Star size={14} fill="#FFD700" color="#FFD700" />
                                    <span>{place.rating}</span>
                                    <span className={styles.reviews}>({place.reviews})</span>
                                </div>
                            </div>

                            <div className={styles.tags}>
                                {place.tags.join(' • ')}
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.delivery}>
                                    Delivery: <span className={styles.fee}>{place.deliveryFee}</span>
                                </div>
                                <button className={styles.addBtn}>Quick Add</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RestaurantGrid;
