import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../auth/pages/Auth.module.css'; // Reusing Auth styles for form

const AddEditProduct = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Burger',
        image: '',
        isVeg: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('http://127.0.0.1:5001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/restaurant/dashboard');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding product');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} style={{ maxWidth: '600px' }}>
                <h1 className={styles.title}>Add New Item</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label>Item Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className={styles.group}>
                        <label>Price</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className={styles.group}>
                        <label>Description</label>
                        <input name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className={styles.group}>
                        <label>Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." />
                    </div>

                    <div className={styles.group}>
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                        >
                            {['Burger', 'Pizza', 'Dessert', 'Drinks', 'Salad', 'Sushi', 'Fast Food', 'Veg', 'Non-Veg', 'Other'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.groupCheckbox}>
                        <input
                            type="checkbox"
                            id="isVeg"
                            name="isVeg"
                            checked={formData.isVeg}
                            onChange={handleChange}
                        />
                        <label htmlFor="isVeg">Is Vegetarian?</label>
                    </div>

                    <button type="submit" className={styles.btn}>Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddEditProduct;
