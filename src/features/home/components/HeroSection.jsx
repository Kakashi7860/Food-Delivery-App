import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';
import heroImage from '../../../assets/hero_food.png';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <span className={styles.tagline}>Fastest Delivery & Easy Pickup</span>
                    <h1 className={styles.title}>
                        Order Your Favorite <span className={styles.highlight}>Food</span> Anytime
                    </h1>
                    <p className={styles.description}>
                        Experience the best food delivery service with our premium selection of restaurants. Fresh, hot, and delicious.
                    </p>
                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryBtn}>
                            Order Now <ArrowRight size={20} />
                        </button>
                        <button className={styles.secondaryBtn}>
                            Watch Video
                        </button>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50k+</span>
                            <span className={styles.statLabel}>Happy Customers</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>Restaurants</span>
                        </div>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <div className={styles.blob}></div>
                    <img src={heroImage} alt="Delicious Food" className={styles.heroImage} />

                    <div className={styles.floatingCard}>
                        <span className={styles.cardIcon}>🔥</span>
                        <div className={styles.cardText}>
                            <span className={styles.cardTitle}>Hot & Spicy</span>
                            <span className={styles.cardSubtitle}>Best Seller</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
