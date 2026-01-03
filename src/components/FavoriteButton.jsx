import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ id, type, size = 20 }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        const checkStatus = async () => {
            try {
                const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
                const response = await fetch(`http://127.0.0.1:5001/api/favorites/check/${type}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsFavorite(data.isFavorite);
                }
            } catch (error) {
                console.error(error);
            }
        };
        checkStatus();
    }, [id, type, user]);

    const handleToggle = async (e) => {
        e.preventDefault(); // Prevent link navigation if inside one
        e.stopPropagation();

        if (!user) {
            alert('Please login to save favorites!');
            return;
        }

        setLoading(true);
        try {
            const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
            const response = await fetch('http://127.0.0.1:5001/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ itemId: id, type })
            });
            const data = await response.json();
            if (response.ok) {
                setIsFavorite(data.isFavorite);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`${styles.btn} ${isFavorite ? styles.active : ''}`}
            onClick={handleToggle}
            disabled={loading}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart size={size} fill={isFavorite ? "#ff4b4b" : "none"} />
        </button>
    );
};

export default FavoriteButton;
