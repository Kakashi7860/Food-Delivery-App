import React, { useState } from 'react';
import MenuFilter from './components/MenuFilter';
import MenuItemCard from './components/MenuItemCard';
import { categories, menuItems } from '../home/data/mockData';
import styles from './MenuPage.module.css';

const MenuPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredItems = menuItems.filter((item) => {
        if (activeCategory === 'all') return true;
        if (activeCategory === 'veg') return item.isVeg;
        if (activeCategory === 'non_veg') return !item.isVeg;
        return item.category === activeCategory;
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

            <div className={styles.grid}>
                {filteredItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No items found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
