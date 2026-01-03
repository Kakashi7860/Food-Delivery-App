import React, { useState } from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ product }) => {
    const { addToCart } = useCart();
    const [servings, setServings] = useState(1);
    const totalPrice = (product.price * servings).toFixed(2);

    const handleAddToCart = () => {
        addToCart(product, servings);
    };

    return (
        <div className={styles.info}>
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.ratingRow}>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(product.rating) ? '#FFD700' : '#E0E0E0'}
                            color={i < Math.floor(product.rating) ? '#FFD700' : '#E0E0E0'}
                        />
                    ))}
                </div>
                <span className={styles.reviewCount}>({product.reviews.length} reviews)</span>
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.tags}>
                {product.isVeg ? (
                    <span className={`${styles.badge} ${styles.veg}`}>Veg</span>
                ) : (
                    <span className={`${styles.badge} ${styles.nonVeg}`}>Non Veg</span>
                )}
                {product.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                ))}
            </div>

            <div className={styles.divider}></div>

            <div className={styles.row}>
                <span className={styles.label}>Price</span>
                <span className={styles.priceValue}>Rs. {product.price}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Serves</span>
                <div className={styles.servingSelector}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <button
                            key={num}
                            className={`${styles.serveBtn} ${servings === num ? styles.activeServe : ''}`}
                            onClick={() => setServings(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <div className={styles.totalPrice}>
                    Total: <span>${totalPrice}</span>
                </div>
                <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductInfo;
