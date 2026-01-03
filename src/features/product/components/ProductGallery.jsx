import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
                <img src={selectedImage} alt="Product Detail" className={styles.mainImage} />
            </div>

            <div className={styles.thumbnails}>
                {images.map((img, index) => (
                    <button
                        key={index}
                        className={`${styles.thumbBtn} ${selectedImage === img ? styles.active : ''}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`View ${index + 1}`} className={styles.thumbImage} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
