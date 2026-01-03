import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;

            // Format items for backend
            const orderItems = cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                product: item._id || item.id,
            }));

            const response = await fetch('http://127.0.0.1:5001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: orderItems,
                    totalAmount: cartTotal,
                    address,
                    paymentMethod,
                    instructions
                }),
            });

            const data = await response.json();

            if (response.ok) {
                clearCart();
                navigate(`/order-tracking/${data._id}`);
            } else {
                alert('Order Failed: ' + data.message);
            }
        } catch (error) {
            console.error('Order Error:', error);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return <div className={styles.container}>Your cart is empty</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles.grid}>
                <div className={styles.formCol}>
                    <h2 className={styles.sectionTitle}>Delivery Address</h2>
                    <form onSubmit={handlePlaceOrder}>
                        <textarea
                            className={styles.textarea}
                            placeholder="Enter your full address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <h2 className={styles.sectionTitle}>Delivery Instructions</h2>
                        <textarea
                            className={`${styles.textarea} ${styles.smallTextarea}`}
                            placeholder="e.g. Leave at door, Door code 1234..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />

                        <div className={styles.payment}>
                            <h3 className={styles.sectionTitle}>Payment Method</h3>
                            <div className={styles.methodsGrid}>
                                <div
                                    className={`${styles.method} ${paymentMethod === 'Card' ? styles.activeMethod : ''}`}
                                    onClick={() => setPaymentMethod('Card')}
                                >
                                    <input type="radio" checked={paymentMethod === 'Card'} readOnly />
                                    <span>Credit/Debit Card</span>
                                </div>
                                <div
                                    className={`${styles.method} ${paymentMethod === 'UPI' ? styles.activeMethod : ''}`}
                                    onClick={() => setPaymentMethod('UPI')}
                                >
                                    <input type="radio" checked={paymentMethod === 'UPI'} readOnly />
                                    <span>UPI / GPay</span>
                                </div>
                                <div
                                    className={`${styles.method} ${paymentMethod === 'COD' ? styles.activeMethod : ''}`}
                                    onClick={() => setPaymentMethod('COD')}
                                >
                                    <input type="radio" checked={paymentMethod === 'COD'} readOnly />
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={styles.placeOrderBtn} disabled={loading}>
                            {loading ? 'Placing Order...' : `Place Order ($${cartTotal.toFixed(2)})`}
                        </button>
                    </form>
                </div>

                <div className={styles.summaryCol}>
                    <h2 className={styles.sectionTitle}>Order Summary</h2>
                    <div className={styles.items}>
                        {cart.map(item => (
                            <div key={item.id} className={styles.item}>
                                <span>{item.quantity}x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.total}>
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
