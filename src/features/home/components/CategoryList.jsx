import React from 'react';
import styles from './CategoryList.module.css';

const CategoryList = ({ categories }) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Top Categories</h2>
                <a href="#" className={styles.viewAll}>View All</a>
            </div>

            <div className={styles.list}>
                {categories.map((cat) => (
                    <div key={cat.id} className={styles.card} style={{ backgroundColor: cat.color }}>
                        <div className={styles.imageWrapper}>
                            <img src={cat.image} alt={cat.name} className={styles.image} />
                        </div>
                        <span className={styles.name}>{cat.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryList;
