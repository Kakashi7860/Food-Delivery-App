import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './MyOrdersPage.module.css';

const MyOrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
                const response = await fetch('http://127.0.0.1:5001/api/orders/myorders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.error("Fetch Orders Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <div className={styles.loading}>Loading your orders...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#10B981'; // Green
            case 'Preparing': return '#F59E0B'; // Orange
            default: return '#3B82F6'; // Blue
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Orders</h1>

            {orders.length === 0 ? (
                <div className={styles.empty}>
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/menu" className={styles.shopBtn}>Browse Menu</Link>
                </div>
            ) : (
                <div className={styles.ordersList}>
                    {orders.map(order => (
                        <div key={order._id} className={styles.orderCard}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <span className={styles.orderId}>Order #{order._id.slice(-6)}</span>
                                    <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span
                                    className={styles.statusBadge}
                                    style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className={styles.items}>
                                {order.items.map((item, index) => (
                                    <span key={index}>{item.quantity}x {item.name}{index < order.items.length - 1 ? ', ' : ''}</span>
                                ))}
                            </div>

                            <div className={styles.cardFooter}>
                                <span className={styles.total}>Total: ${order.totalAmount.toFixed(2)}</span>
                                <Link to={`/order-tracking/${order._id}`} className={styles.trackBtn}>
                                    Track Order
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
