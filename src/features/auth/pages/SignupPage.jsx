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
        const result = await register(name, email, password, role);
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
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
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

                    <div className={styles.groupCheckbox}>
                        <input
                            type="checkbox"
                            id="isRestaurant"
                            checked={isRestaurant}
                            onChange={(e) => setIsRestaurant(e.target.checked)}
                        />
                        <label htmlFor="isRestaurant">Register as Restaurant Partner</label>
                    </div>

                    <button type="submit" className={styles.btn}>Sign Up</button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
