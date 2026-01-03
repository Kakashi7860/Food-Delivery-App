import React from 'react';
import { Plus, Star } from 'lucide-react';
import styles from './MenuItemCard.module.css';

const MenuItemCard = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.image} />
                <span className={`${styles.vegBadge} ${item.isVeg ? styles.veg : styles.nonVeg}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <div className={styles.rating}>
                        <Star size={12} fill="#FFD700" color="#FFD700" />
                        <span>{item.rating}</span>
                    </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.footer}>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                    <button className={styles.addBtn}>
                        <Plus size={18} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
