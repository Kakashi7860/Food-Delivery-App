import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import MenuItemCard from '../menu/components/MenuItemCard';
import { ChefHat, Heart } from 'lucide-react';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
                const response = await fetch('http://127.0.0.1:5001/api/favorites', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user]);

    if (loading) return <div className={styles.loading}>Loading favorites...</div>;

    const restaurants = favorites.filter(f => f.type === 'restaurant').map(f => f.restaurant);
    const products = favorites.filter(f => f.type === 'product').map(f => f.product);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Favorites <Heart fill="#ff4b4b" color="#ff4b4b" size={28} style={{ marginLeft: 10 }} /></h1>

            {favorites.length === 0 && (
                <div className={styles.empty}>
                    <p>You haven't saved any favorites yet.</p>
                    <Link to="/menu" className={styles.link}>Explore Menu</Link>
                </div>
            )}

            {restaurants.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>Restaurants</h2>
                    <div className={styles.list}>
                        {restaurants.map(r => (
                            <Link to={`/restaurants/${r._id}`} key={r._id} className={styles.restaurantCard}>
                                <div className={styles.restIcon}><ChefHat size={24} /></div>
                                <div>
                                    <h3>{r.name}</h3>
                                    <p>{r.cuisine}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {products.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>Dishes</h2>
                    <div className={styles.grid}>
                        {products.map(p => (
                            <MenuItemCard key={p._id} item={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
