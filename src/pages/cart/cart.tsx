import React, { useEffect, useState } from "react";
import { CartItem, Order } from "../../types";
import styles from "./cart.module.css";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleRemoveFromCart = (item: CartItem) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const handlePlus = (item: CartItem, num: string) => {
    const newQuantity = parseInt(num);
    const updatedItem = { ...item, quantity: newQuantity };
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem === item ? updatedItem : cartItem
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const street = (document.getElementById("street") as HTMLInputElement)
      .value;
    const number = parseInt(
      (document.getElementById("phone") as HTMLInputElement).value
    );
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const takeAway = (document.getElementById("takeAway") as HTMLInputElement)
      .checked;
    const apartmentNumber = (
      document.getElementById("apartmentNumber") as HTMLInputElement
    ).value;
    const annotation = (
      document.getElementById("annotation") as HTMLInputElement
    ).value;
    const cash = (document.getElementById("cash") as HTMLInputElement).checked;
    const debitCard = (document.getElementById("debitCard") as HTMLInputElement)
      .checked;
    const creditCard = (
      document.getElementById("creditCard") as HTMLInputElement
    ).checked;

    // Collect all checked payment methods
    const paymentMethods = () => {
      const methods = [];
      if (cash) {
        methods.push("CASH");
      }
      if (debitCard) {
        methods.push("DEBIT_CARD");
      }
      if (creditCard) {
        methods.push("CREDIT_CARD");
      }
      if (!cash && !debitCard && !creditCard) {
        methods.push("UNDEFINED");
      }
      return methods.join(", ");
    };

    const order: Order = {
      name,
      street,
      number,
      email,
      takeAway,
      apartmentNumber,
      annotation,
      cart: cartItems.map((item) => ({
        product: [item],
        quantity: item.quantity,
      })),
      paymentMethod: paymentMethods(), // Join all selected methods as a string
      firstPurchase: true,
    };

    console.log(order); // For testing purposes, you can remove this line in production
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <div className={styles.imageContainer}>
                  {/* <img src={item.product.photoPath || 'default-image-path.jpg'} alt={item.product.name} /> */}
                  <img src='/images/detergente.jpg' alt={item.product.name}  className={styles.cartImage}/>
                  </div>
                  <div className={styles.textContainer}>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <div className={styles.itemInfo}>
                  <p>
                    <input
                      type="number"
                      onChange={(e) => handlePlus(item, e.target.value)}
                      defaultValue={item.quantity}
                      className={styles.quantityInput}
                    />
                  </p>
                  <p>
                    Total: ${Math.round(item.product.price * item.quantity)}
                  </p>
                  <button 
                    onClick={() => handleRemoveFromCart(item)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                  </div>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.cartForm}>
        <form onSubmit={handleSubmit}>
          <label>Datos Personales</label>
          <div>
            <input type="text" id="name" placeholder="Nombre y Apellido" />
            <input type="text" id="phone" placeholder="Telefono" />
            <input type="email" id="email" placeholder="Correo electronico" />
            <input type="radio" name="deliveryOption" id="shipping" />
            <label htmlFor="shipping">Envío a domicilio</label>
            <input type="radio" name="deliveryOption" id="takeAway" />
            <label htmlFor="takeAway">Retira en local</label>
          </div>
          <label>Direccion</label>
          <div>
            <input type="text" id="street" placeholder="Direccion" />
            <input type="text" id="apartmentNumber" placeholder="Apto/Casa" />
            <input type="text" id="corner" placeholder="Esquina" />
          </div>
          <label>Forma de pago</label>
          <div>
            <input type="checkbox" id="cash" value="Efectivo" />
            Efectivo
            <input type="checkbox" id="debitCard" value="Tarjeta Debito" />
            Tarjeta Debito
            <input type="checkbox" id="creditCard" value="Tarjeta Credito" />
            Tarjeta Credito
          </div>
          <div>
            <input type="text-area" id="annotation" />
          </div>
          <button type="submit">Hacer pedido</button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
