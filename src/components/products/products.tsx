import React from "react";
import { Link } from "react-router-dom";
import styles from "./products.module.css";
import { Product, CartItem, ProductsProps } from "../../types";

const Products: React.FC<ProductsProps> = ({ products }) => {
  // console.log(products);
  const [quantities, setQuantities] = React.useState<number[]>(
    products.map(() => 1)
  );

  const handleAddToCart = (product: Product, quantity: number) => {
    // Get existing cart items from local storage
    const existingCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
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
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      // If the product doesn't exist, add a new cart item
      const newCartItem = {
        product,
        quantity,
      };

      const updatedCartItems = [...existingCartItems, newCartItem];

      // Save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  return (
    <div className={styles.productsContainer}>
      {products.map((product, index) => {
        return (
            <div className={styles.card} key={product.id}>
              <Link
                to={`/product/${product.id}`}
                state={{ product }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.imgContainer}>
                    <img
                      className={styles.productImg}
                      // src={product.photoPath ?? "/images/default.jpg"} uncomment when the api is ready
                      src="/images/detergente.jpg"
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    {/* <p className={product.discountPrice ? styles.discountPrice : styles.regularPrice}> */}
                    <p className={styles.regularPrice}>
                      ${Math.round(product.price)}
                    </p>
                    {/* {product.discountPrice && <p className={styles.discount}>Descuento: ${product.discountPrice}</p>} */}
                  </div>
                </div>
              </Link>
              <div className={styles.buttons}>
                <input
                  type="number"
                  className={styles.quantity}
                  value={quantities[index]}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  min="1"
                />
                <button
                  className={styles.button}
                  onClick={() => handleAddToCart(product, quantities[index])}
                >
                  Agregar
                </button>
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default Products;
