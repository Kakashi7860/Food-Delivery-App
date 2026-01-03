import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className={styles.item}>
            <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.image} />
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                </div>

                <div className={styles.actions}>
                    <div className={styles.qtyControl}>
                        <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={16} />
                        </button>
                        <span className={styles.qty}>{item.quantity}</span>
                        <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        className={styles.deleteBtn}
                        onClick={() => removeFromCart(item.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
