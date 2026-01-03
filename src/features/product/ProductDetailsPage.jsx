import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import { menuItems } from '../home/data/mockData';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const product = menuItems.find(item => item.id === parseInt(id));

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h2>Product not found</h2>
                <Link to="/menu" className={styles.backLink}>Back to Menu</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Link to="/menu" className={styles.backBtn}>
                <ArrowLeft size={20} /> Back to Menu
            </Link>

            <div className={styles.topSection}>
                <div className={styles.galleryCol}>
                    <ProductGallery images={product.images || [product.image]} />
                </div>
                <div className={styles.infoCol}>
                    <ProductInfo product={product} />
                </div>
            </div>

            <ProductTabs
                nutrition={{ calories: product.calories, protein: product.protein }}
                reviews={product.reviews || []}
            />
        </div>
    );
};

export default ProductDetailsPage;
