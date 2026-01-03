import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, ChefHat } from 'lucide-react';
import MenuItemCard from '../menu/components/MenuItemCard';
import FavoriteButton from '../../components/FavoriteButton';
import styles from './RestaurantPublicPage.module.css';

const RestaurantPublicPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5001/api/restaurants/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setRestaurant(data);
                }
            } catch (error) {
                console.error("Fetch Restaurant Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) return <div className={styles.loading}>Loading Restaurant Profile...</div>;
    if (!restaurant) return <div className={styles.loading}>Restaurant not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.titleRow}>
                        <h1 className={styles.name}>{restaurant.name}</h1>
                        <FavoriteButton id={restaurant._id} type="restaurant" size={24} />
                    </div>
                    <div className={styles.meta}>
                        <span className={styles.cuisine}><ChefHat size={16} /> {restaurant.cuisine || 'Multi-Cuisine'}</span>
                        <span className={styles.location}><MapPin size={16} /> {restaurant.address || 'Location N/A'}</span>
                    </div>
                </div>
                <div className={styles.ratingBox}>
                    <span className={styles.rating}>4.5 <Star size={16} fill="white" /></span>
                    <span className={styles.reviews}>500+ ratings</span>
                </div>
            </div>

            <div className={styles.menuSection}>
                <h2 className={styles.sectionTitle}>Menu</h2>
                {restaurant.products && restaurant.products.length > 0 ? (
                    <div className={styles.grid}>
                        {restaurant.products.map(product => (
                            <MenuItemCard key={product._id} item={product} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>No menu items available yet.</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantPublicPage;
