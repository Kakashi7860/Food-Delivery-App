import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Check, ChefHat, Bike, Clock } from 'lucide-react';
import styles from './OrderTrackingPage.module.css';

const OrderTrackingPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
                const response = await fetch(`http://127.0.0.1:5001/api/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setOrder(data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Fetch Order Error:", error);
                setLoading(false);
            }
        };

        fetchOrder();

        // Poll every 10 seconds to update status
        const interval = setInterval(fetchOrder, 10000);
        return () => clearInterval(interval);
    }, [id, user]);

    if (loading) return <div className={styles.loading}>Loading Order Details...</div>;
    if (!order) return <div className={styles.loading}>Order not found</div>;

    const getStatusStep = () => {
        if (order.status === 'Delivered') return 3;
        if (order.status === 'Preparing') return 2;
        return 1;
    };

    const currentStep = getStatusStep();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Order Tracking</h1>
                <span className={styles.orderId}>Order #{order._id.slice(-6)}</span>
            </div>

            <div className={styles.statusCard}>
                <div className={styles.steps}>
                    <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
                        <div className={styles.icon}><Check size={24} /></div>
                        <span>Placed</span>
                    </div>
                    <div className={`${styles.line} ${currentStep >= 2 ? styles.activeLine : ''}`} />
                    <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
                        <div className={styles.icon}><ChefHat size={24} /></div>
                        <span>Preparing</span>
                    </div>
                    <div className={`${styles.line} ${currentStep >= 3 ? styles.activeLine : ''}`} />
                    <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
                        <div className={styles.icon}><Bike size={24} /></div>
                        <span>Delivered</span>
                    </div>
                </div>

                <div className={styles.statusMessage}>
                    {order.status === 'Placed' && "Your order has been placed. The restaurant will start preparing it shortly."}
                    {order.status === 'Preparing' && "The chef is preparing your delicious food!"}
                    {order.status === 'Delivered' && "Your order has been delivered. Enjoy your meal!"}
                </div>
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                    <h3>Items</h3>
                    {order.items.map((item, index) => (
                        <div key={index} className={styles.itemRow}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className={styles.totalRow}>
                        <span>Total Paid</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <h3>Delivery Location</h3>
                    <p className={styles.address}>{order.address}</p>

                    {order.status !== 'Delivered' && (
                        <div className={styles.eta}>
                            <Clock size={20} />
                            <span>Estimated Delivery: 5 mins</span>
                        </div>
                    )}
                </div>
            </div>

            <Link to="/" className={styles.homeBtn}>Back to Home</Link>
        </div>
    );
};

export default OrderTrackingPage;
