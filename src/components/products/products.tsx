import React from 'react';
import styles from './products.module.css'; // Import CSS module

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <div className={styles.cardContent}>
            <img className={styles.productImg} src={product.image} alt={product.name} />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              {/* Apply different styles based on whether discountPrice exists */}
              <p className={product.discountPrice ? styles.discountPrice : styles.regularPrice}>
                Precio: ${product.price}
              </p>
              {product.discountPrice && (
                <p className={styles.discount}>Descuento: ${product.discountPrice}</p>
              )}
            </div>
          </div>
          {/* Description and buttons displayed on hover */}
          <div className={styles.cardOverlay}>
            <p>{product.description}</p>
            <div className={styles.buttons}>
              <button className={styles.button}>Favoritos</button>
              <button className={styles.button}>Agregar +</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

