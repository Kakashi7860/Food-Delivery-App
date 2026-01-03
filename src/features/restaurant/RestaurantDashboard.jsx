import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './RestaurantDashboard.module.css';

const RestaurantDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const fetchMyProducts = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('http://127.0.0.1:5001/api/products/my-products', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch products", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await fetch(`http://127.0.0.1:5001/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            fetchMyProducts(); // Refresh list
        } catch (error) {
            console.error("Delete failed", error);
        }
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Restaurant Dashboard</h1>
                    <p>Welcome back, {user?.name}</p>
                </div>
                <button className={styles.addBtn} onClick={() => navigate('/restaurant/add-item')}>
                    <Plus size={20} /> Add New Item
                </button>
            </header>

            <div className={styles.content}>
                <h2>Your Menu Items</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No items added yet. Start building your menu!</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {products.map(item => (
                            <div key={item._id} className={styles.card}>
                                <img src={item.image} alt={item.name} className={styles.image} />
                                <div className={styles.cardBody}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.price}>Rs. {item.price}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.actionBtn}><Edit size={16} /></button>
                                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(item._id)}>
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDashboard;
