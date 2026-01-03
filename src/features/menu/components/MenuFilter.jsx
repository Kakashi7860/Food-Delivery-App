import React from 'react';
import styles from './MenuFilter.module.css';

const MenuFilter = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className={styles.filterContainer}>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                    onClick={() => onSelectCategory(cat.id)}
                >
                    {cat.image && <img src={cat.image} alt="" className={styles.icon} />}
                    <span>{cat.name}</span>
                </button>
            ))}
        </div>
    );
};

export default MenuFilter;
