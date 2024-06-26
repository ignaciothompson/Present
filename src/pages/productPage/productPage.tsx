import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './product.module.css';
import { Product, CartItem } from '../../types';
 

const ProductPage: React.FC = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [showAlert, setShowAlert] = React.useState(Boolean);

  useEffect(() => {
      const productData = location.state?.product;
      if (productData) {
        setProduct(productData);
      }
  }, [location.state]);

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
  
  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <>
    <div className={styles.productContainer}>
      <div className={styles.goBack}>
        <button className={styles.goBackBtn} onClick={() => window.history.back()}>Atras</button>
      </div>
    {product ? (
      <>
        <div className={styles.imageContainer}>
        <img
          // src={product.photoPath ?? "/images/default.jpg"} uncomment when the api is ready
          src="/images/detergente.jpg"
          alt={product.name}
        />
        </div>
        <div className={styles.infoContainer}>
          <h2>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Price: ${product.price}</p>
          {/* {product.priceWithDiscount && <p>Discount Price: ${product.priceWithDiscount}</p>} */}
          <button 
            className={styles.button} 
            onClick={() => {
              handleAddToCart(product, quantity);
              setShowAlert(true);
            }}
            >
              Agregar
          </button>
          <input
            type="number"
            className={styles.quantity}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            min="1"
          />
          {showAlert && (
            <div className={styles.alertProduct + " alert-primary"}>
              <p>Agregaste el producto al carrito</p>
              <span className={"open"}>
                <Link to="/carrito"><img src="/images/open.svg" alt="Ver carrito" /></Link>
              </span>
              <span className="close" onClick={() => setShowAlert(false)}>
                <img src="/images/close.svg" alt="Cerrar" />
              </span>
            </div>
            )}
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  </>
  );
};

export default ProductPage;