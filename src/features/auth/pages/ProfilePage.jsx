import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { User, MapPin, Phone, ChefHat, Save } from 'lucide-react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const { user, login } = useAuth(); // login is helper to update user in context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        cuisine: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
                const response = await fetch('http://127.0.0.1:5001/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || '',
                        email: data.email || '',
                        address: data.address || '',
                        phone: data.phone || '',
                        cuisine: data.cuisine || '',
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
            const response = await fetch('http://127.0.0.1:5001/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email, // Usually usually immutable, but allowing edit if backend supports it
                    address: formData.address,
                    phone: formData.phone,
                    cuisine: formData.cuisine,
                    password: formData.password || undefined
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile Updated Successfully' });
                // Update local storage and context
                localStorage.setItem('userInfo', JSON.stringify(data));
                // We might need to reload or update context manually if login/register was setting context
                // For now, assuming user will refresh or we can trigger simple update? 
                // Actually, the context is populated from localStorage on mount. 
                // Ideally AuthContext should expose an 'updateUser' method.
                // Assuming 'login' might accept just user object too? No, it expects (email, pass).
                // Let's rely on localStorage update + page reload or just UI feedback for now.
            } else {
                setMessage({ type: 'error', text: data.message || 'Update failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>My Profile</h1>

                {message && (
                    <div className={`${styles.alert} ${message.type === 'error' ? styles.error : styles.success}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <div className={styles.inputWrapper}>
                            <User size={18} className={styles.icon} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled // Often email is immutable
                                className={styles.disabled}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <div className={styles.inputWrapper}>
                            <Phone size={18} className={styles.icon} />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Address</label>
                        <div className={styles.inputWrapper}>
                            <MapPin size={18} className={styles.icon} />
                            <textarea
                                name="address"
                                placeholder="Enter delivery address"
                                value={formData.address}
                                onChange={handleChange}
                                className={styles.textarea}
                            />
                        </div>
                    </div>

                    {user?.role === 'restaurant' && (
                        <div className={styles.formGroup}>
                            <label>Cuisine Type</label>
                            <div className={styles.inputWrapper}>
                                <ChefHat size={18} className={styles.icon} />
                                <input
                                    type="text"
                                    name="cuisine"
                                    value={formData.cuisine}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.divider}>Change Password</div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>New Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Leave blank to keep same"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.saveBtn} disabled={loading}>
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
