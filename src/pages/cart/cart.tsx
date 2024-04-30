import React, { useEffect, useState, useCallback } from "react";
import { CartItem, Order } from "../../types";
import styles from "./cart.module.css";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [newAddress, setNewAddress] = useState(Boolean);
  const [currentAddress, setCurrentAddress] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [takeAway, setTakeAway] = useState(Boolean);
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [x, setX] = useState(Boolean);


  const getFormData = () => {
    if(newAddress){
    setX(true);
    setName((document.getElementById("name") as HTMLInputElement).value);
    setStreet((document.getElementById("street") as HTMLInputElement).value);
    setNumber(parseInt((document.getElementById("phone") as HTMLInputElement).value));
    setEmail((document.getElementById("email") as HTMLInputElement).value);
    setTakeAway((document.getElementById("takeAway") as HTMLInputElement).checked);
    setApartmentNumber((document.getElementById("apartmentNumber") as HTMLInputElement).value);
    setAnnotation((document.getElementById("annotation") as HTMLInputElement).value);
    const cash = ((document.getElementById("cash") as HTMLInputElement).checked);
    const debitCard = (document.getElementById("debitCard") as HTMLInputElement).checked;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).checked;
  
    // Collect all checked payment methods
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
    setPaymentMethods(methods.join(", "));
    return methods.join(", "); // Return the payment methods string
  }else{
    setX(false);
    console.log(localStorage.getItem("order"));
    return localStorage.getItem("order");
  }
  };

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

  const handleChangeAddress = (event: React.FormEvent) => {
    event.preventDefault();
    setNewAddress(true);
    console.log("Cambiando direccion...");
  };

  const handleSaveData = (event: React.FormEvent) => {
    event.preventDefault();
    getFormData();
    handleAddress(street, apartmentNumber);
    setNewAddress(false);
    console.log("Guardando datos...");
  };

  const handleAddress = useCallback((street: string, apartmentNumber: string) => {
    const order = JSON.parse(localStorage.getItem("order") || '{}');
    if (!newAddress) {
      const address = [order.street, order.apartmentNumber];
      setCurrentAddress(address.join(", "));
    } else {
      if(street && apartmentNumber != ""){
        const address = [street, apartmentNumber];
        setCurrentAddress(address.join(", "));
      }else{
        const address = [order.street, order.apartmentNumber];
        setCurrentAddress(address.join(", "));
      }
    }
  }, [newAddress, street, apartmentNumber]); // Add dependencies here

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order") || '{}');
    setTakeAway(order.takeAway);
    handleAddress(order.street, order.apartmentNumber);
  }, [handleAddress]); // Added dependency array to ensure this effect runs only once on component mount

  const handleShipping = () => {
    const shippingElement = document.getElementById("shipping") as HTMLInputElement;
    if (shippingElement) {
      const isShippingChecked = shippingElement.checked;
      setTakeAway(!isShippingChecked);
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(x){
      getFormData();
      const order: Order = {
        name: name,
        street: street,
        number: number,
        email: email,
        takeAway: takeAway,
        apartmentNumber: apartmentNumber,
        annotation: annotation,
        cart: cartItems.map((item) => ({
          product: [item],
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethods,
        firstPurchase: true,
      };
      localStorage.setItem("order", JSON.stringify(order));
      console.log(order, "se cambio la direccion");
    } else {
      const order = JSON.parse(localStorage.getItem("order") || '{}');
      order.takeAway = !(document.getElementById("shipping") as HTMLInputElement).checked;
      localStorage.setItem("order", JSON.stringify(order));
      console.log(order, "no se cambio la direccion");
    }
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
      <div className={styles.cartTotal}>
        <p>Total: ${cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</p>
        <input type="radio" name="deliveryOption" id="shipping" defaultChecked={!takeAway} onChange={handleShipping} />
        <label htmlFor="shipping">Envío a domicilio</label>
        <input type="radio" name="deliveryOption" id="takeAway" defaultChecked={takeAway} onChange={handleShipping} />
        <label htmlFor="takeAway">Retira en local</label>
        {!takeAway ? (
          <>
            <p>Direccion actual: {currentAddress}</p>
            <button onClick={handleChangeAddress}>
              Cambiar dirección
            </button>
          </>
        ) : (
          <p>Dirección del local: Cooper 2109</p>
        )}
        
        <button 
          type="submit"
          onClick={handleSubmit}
        >
          Hacer pedido
        </button>
      </div>
      <div className={styles.cartForm}>
        {newAddress ? (
          <form onSubmit={handleSaveData}>
            <label>Datos Personales</label>
            <div>
              <input type="text" id="name" placeholder="Nombre y Apellido" />
              <input type="text" id="phone" placeholder="Telefono" />
              <input type="email" id="email" placeholder="Correo electronico" />
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
            <button type="submit">Guardar</button>
          </form>
        ) : (
          <div onClick={handleChangeAddress}>
            <p>Cambiar la dirección</p>
            <img src="/images/chevron-down.svg" alt="dropdown arrow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
