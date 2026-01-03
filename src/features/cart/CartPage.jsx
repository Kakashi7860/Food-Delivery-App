import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';

const CartPage = () => {
    const { cartItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.iconCircle}>
                    <ShoppingBag size={48} />
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu" className={styles.browseBtn}>Browse Menu</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Your Cart ({cartItems.length} items)</h1>
            <div className={styles.content}>
                <div className={styles.itemsList}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <div className={styles.summaryCol}>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
