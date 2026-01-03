import React, { useState } from 'react';
import { User, Star } from 'lucide-react';
import styles from './ProductTabs.module.css';

const ProductTabs = ({ nutrition, reviews }) => {
    const [activeTab, setActiveTab] = useState('reviews');

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
                    onClick={() => setActiveTab('details')}
                >
                    Details
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
                    onClick={() => setActiveTab('nutrition')}
                >
                    Nutrition
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Customer Reviews
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'details' && (
                    <div className={styles.panel}>
                        <p>Detailed information about the sourcing and preparation of this dish.</p>
                        <p>Made with high-quality ingredients sourced locally.</p>
                    </div>
                )}

                {activeTab === 'nutrition' && (
                    <div className={styles.panel}>
                        <div className={styles.nutritionGrid}>
                            <div className={styles.nutriItem}>
                                <span className={styles.nutriLabel}>Calories</span>
                                <span className={styles.nutriValue}>{nutrition.calories || 'N/A'}</span>
                            </div>
                            <div className={styles.nutriItem}>
                                <span className={styles.nutriLabel}>Protein</span>
                                <span className={styles.nutriValue}>{nutrition.protein || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.reviewsList}>
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review.id} className={styles.reviewCard}>
                                    <div className={styles.reviewer}>
                                        <div className={styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <div className={styles.reviewerInfo}>
                                            <span className={styles.reviewerName}>{review.user}</span>
                                            <div className={styles.reviewRating}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        fill={i < review.rating ? '#FFD700' : '#E0E0E0'}
                                                        color={i < review.rating ? '#FFD700' : '#E0E0E0'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.reviewText}>{review.comment}</p>
                                    <span className={styles.reviewDate}>{review.date}</span>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noReviews}>No reviews yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
