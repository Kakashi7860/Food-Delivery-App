import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Auth.module.css';

const SignupPage = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRestaurant, setIsRestaurant] = useState(searchParams.get('role') === 'restaurant');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = isRestaurant ? 'restaurant' : 'customer';

        const address = e.target.address?.value;
        const cuisine = e.target.cuisine?.value;
        const phone = e.target.phone?.value;

        const result = await register(name, email, password, role, address, cuisine, phone);
        if (result.success) {
            if (role === 'restaurant') {
                navigate('/restaurant/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    {isRestaurant ? 'Partner Registration' : 'Create Account'}
                </h1>
                <p className={styles.subtitle}>
                    {isRestaurant ? 'Grow your business with us' : 'Sign up to get started'}
                </p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label>{isRestaurant ? 'Restaurant Name' : 'Full Name'}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder={isRestaurant ? "e.g., Pizza Palace" : "John Doe"}
                        />
                    </div>

                    <div className={styles.group}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className={styles.group}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    {isRestaurant && (
                        <>
                            <div className={styles.group}>
                                <label>Restaurant Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="e.g., 123 Food Street, Downtown"
                                />
                            </div>
                            <div className={styles.group}>
                                <label>Cuisine Type</label>
                                <input
                                    type="text"
                                    name="cuisine"
                                    required
                                    placeholder="e.g., Italian, Fast Food"
                                />
                            </div>
                            <div className={styles.group}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    placeholder="e.g., +1 234 567 890"
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.groupCheckbox}>
                        <input
                            type="checkbox"
                            id="isRestaurant"
                            checked={isRestaurant}
                            onChange={(e) => setIsRestaurant(e.target.checked)}
                        />
                        <label htmlFor="isRestaurant">Register as Restaurant Partner</label>
                    </div>

                    <button type="submit" className={styles.btn}>
                        {isRestaurant ? 'Register Restaurant' : 'Sign Up'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
