import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import styles from './MenuItemCard.module.css';

const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <Link to={`/product/${item.id}`} className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.image} />
                <span className={`${styles.vegBadge} ${item.isVeg ? styles.veg : styles.nonVeg}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
            </Link>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>
                        <Link to={`/product/${item.id}`} className={styles.link}>
                            {item.name}
                        </Link>
                    </h3>
                    <div className={styles.rating}>
                        <Star size={12} fill="#FFD700" color="#FFD700" />
                        <span>{item.rating}</span>
                    </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.footer}>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                    <button className={styles.addBtn} onClick={() => addToCart(item)}>
                        <Plus size={18} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
