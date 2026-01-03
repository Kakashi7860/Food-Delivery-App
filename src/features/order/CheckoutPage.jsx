import React, { useState, useEffect } from 'react';
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

    // Mock Payment State
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // No useEffect fetch for clientSecret anymore as we are using Mock Form

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();

        // Validate Mock Card if selected
        if (paymentMethod === 'Card') {
            if (cardNumber.length < 16 || cvc.length < 3 || !expiry) {
                alert("Please enter valid card details.");
                return;
            }
            setIsProcessing(true);
            // Simulate Payment Delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsProcessing(false);
        }

        setLoading(true);

        try {
            const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
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
                    paymentMethod: paymentMethod === 'Card' ? 'Credit Card' : paymentMethod,
                    instructions,
                    paymentResult: paymentMethod === 'Card' ? { id: 'mock_payment_123', status: 'completed' } : null
                }),
            });

            const data = await response.json();

            if (response.ok) {
                clearCart();
                navigate(`/order-tracking/${data._id}`);
            } else {
                alert('Order Failed: ' + (data.message || 'Unknown Error'));
                setLoading(false);
            }
        } catch (error) {
            console.error('Order Error:', error);
            alert(`Error: ${error.message}`);
            setLoading(false);
        }
    };

    if (cart.length === 0) return <div className={styles.container}>Your cart is empty</div>;

    // Helper to format card number
    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 16) val = val.slice(0, 16);
        setCardNumber(val);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles.grid}>
                <div className={styles.formCol}>
                    <h2 className={styles.sectionTitle}>Delivery Address</h2>
                    <form id="checkout-form" onSubmit={handlePlaceOrder}>
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
                            placeholder="e.g. Leave at door, Door code 123..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />

                        <div className={styles.payment}>
                            <h3 className={styles.sectionTitle}>Payment Method</h3>
                            <div className={styles.methodsGrid}>
                                <div className={`${styles.method} ${paymentMethod === 'COD' ? styles.activeMethod : ''}`} onClick={() => setPaymentMethod('COD')}>
                                    <input type="radio" checked={paymentMethod === 'COD'} readOnly />
                                    <span>Cash on Delivery</span>
                                </div>
                                <div className={`${styles.method} ${paymentMethod === 'Card' ? styles.activeMethod : ''}`} onClick={() => setPaymentMethod('Card')}>
                                    <input type="radio" checked={paymentMethod === 'Card'} readOnly />
                                    <span>Credit/Debit Card</span>
                                </div>
                                <div className={`${styles.method} ${paymentMethod === 'UPI' ? styles.activeMethod : ''}`} onClick={() => setPaymentMethod('UPI')}>
                                    <input type="radio" checked={paymentMethod === 'UPI'} readOnly />
                                    <span>UPI / GPay</span>
                                </div>
                            </div>
                        </div>

                        {/* Traditional Place Order Button for COD/UPI */}
                        {paymentMethod !== 'Card' && (
                            <button type="submit" className={styles.placeOrderBtn} disabled={loading}>
                                {loading ? 'Placing Order...' : `Place Order ($${cartTotal.toFixed(2)})`}
                            </button>
                        )}

                        {/* Mock Stripe Form */}
                        {paymentMethod === 'Card' && (
                            <div className={styles.stripeContainer}>
                                <div className={styles.stripeForm}>
                                    <div className={styles.formRow}>
                                        <label>Card Information</label>
                                        <div className={styles.cardInputWrapper}>
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                className={styles.cardInput}
                                                value={cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                                                onChange={handleCardNumberChange}
                                            />
                                            <div className={styles.cardIcons}>
                                                💳
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.formRowSplit}>
                                        <div>
                                            <label>Expiration</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className={styles.cardInput}
                                                maxLength="5"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label>CVC</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className={styles.cardInput}
                                                maxLength="3"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                                            />
                                        </div>
                                    </div>

                                    {isProcessing ? (
                                        <button disabled className={styles.payBtn}>
                                            Processing Payment... <span className={styles.spinner}>↻</span>
                                        </button>
                                    ) : (
                                        <button type="submit" className={styles.payBtn} disabled={loading}>
                                            {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                                        </button>
                                    )}
                                    <p className={styles.secureText}>🔒 Payments are secure and encrypted</p>
                                </div>
                            </div>
                        )}
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
