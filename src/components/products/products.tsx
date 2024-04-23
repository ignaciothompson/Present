import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './products.module.css';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const handleAddToCart = (product: Product, quantity: number) => {
    // Get existing cart items from local storage
    const existingCartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') || '[]')
      : [];

    // Check if the product already exists in the cart
    const existingCartItemIndex = existingCartItems.findIndex(
      (item: CartItem) => item.product.id === product.id
    );

    if (existingCartItemIndex !== -1) {
      // If the product exists, update the quantity
      const updatedCartItems = [...existingCartItems];
      updatedCartItems[existingCartItemIndex].quantity += quantity;

      // Save the updated cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      // If the product doesn't exist, add a new cart item
      const newCartItem = {
        product,
        quantity,
      };

      const updatedCartItems = [...existingCartItems, newCartItem];

      // Save the updated cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => {
        const [quantity, setQuantity] = useState(1);

        return (
          <div className={styles.card} key={product.id}>
            <div className={styles.cardContent}>
              <img className={styles.productImg} src={product.image} alt={product.name} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={product.discountPrice ? styles.discountPrice : styles.regularPrice}>
                  Precio: ${product.price}
                </p>
                {product.discountPrice && <p className={styles.discount}>Descuento: ${product.discountPrice}</p>}
              </div>
              <div className={styles.buttons}>
                <Link to={`/product/${product.id}`}>
                  <button className={styles.button}>Mas Info</button>
                </Link>
                <button className={styles.button} onClick={() => handleAddToCart(product, quantity)}>
                  Agregar
                </button>
                <input
                  type="number"
                  className={styles.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  min="1"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;