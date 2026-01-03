import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import styles from './CartSummary.module.css';

const CartSummary = () => {
    const { cartTotal } = useCart();
    const deliveryFee = 5.00;
    const total = cartTotal + deliveryFee;

    return (
        <div className={styles.summary}>
            <h2 className={styles.title}>Order Summary</h2>

            <div className={styles.row}>
                <span>Subtotal</span>
                <span className={styles.value}>${cartTotal.toFixed(2)}</span>
            </div>

            <div className={styles.row}>
                <span>Delivery Fee</span>
                <span className={styles.value}>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={`${styles.row} ${styles.total}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className={styles.checkoutBtn}>Proceed to Checkout</Link>
        </div>
    );
};

export default CartSummary;
