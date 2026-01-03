import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Check if it's a mock ID (number) or real MongoDB ID (string)
                // Actually, let's just try fetching from backend regardless. 
                // If it fails (404/500), we could fallback to mock, but better to stick to real data now.
                const response = await fetch(`http://127.0.0.1:5001/api/products/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

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
                    <ProductGallery images={product.images || (product.image ? [product.image] : [])} />
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
