import React, { useState, useEffect } from 'react';
import MenuFilter from './components/MenuFilter';
import MenuItemCard from './components/MenuItemCard';
import { categories } from '../home/data/mockData';
import styles from './MenuPage.module.css';

const MenuPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/api/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredItems = products.filter((item) => {
        if (activeCategory === 'all') return true;
        if (activeCategory === 'veg') return item.isVeg;
        if (activeCategory === 'non_veg') return !item.isVeg;
        // Simple case-insensitive check for now, until we unify categories
        return item.category.toLowerCase() === activeCategory.toLowerCase() ||
            item.category.toLowerCase().replace(' ', '_') === activeCategory.toLowerCase();
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Our Menu</h1>
                <p className={styles.subtitle}>Delicious food from the best restaurants</p>
            </header>

            <MenuFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            {loading ? (
                <div className={styles.loading}>
                    <p>Loading tasty items...</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredItems.map((item) => (
                        <MenuItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}

            {!loading && filteredItems.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No items found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
