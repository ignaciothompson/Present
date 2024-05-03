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

  // Retrieve form data from DOM elements
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
    } else {
      setX(false);
      console.log(localStorage.getItem("order"));
      return localStorage.getItem("order");
    }
  };

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Remove an item from the cart
  const handleRemoveFromCart = (item: CartItem) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  // Update quantity of a cart item
  const handlePlus = (item: CartItem, num: string) => {
    const newQuantity = parseInt(num);
    const updatedItem = { ...item, quantity: newQuantity };
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem === item ? updatedItem : cartItem
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Handle address change
  const handleChangeAddress = (event: React.FormEvent) => {
    event.preventDefault();
    setNewAddress(true);
  };

  // Save form data and update address
  const handleSaveData = (event: React.FormEvent) => {
    event.preventDefault();
    getFormData();
    setTimeout(() => {
      handleAddress();
    }, 0);
    console.log("Guardando datos...");
  };

  // Update current address based on form input or stored order
  const handleAddress = useCallback(() => {
    const order = JSON.parse(localStorage.getItem("order") || '{}');
    if (!newAddress) {
      const address = [order.street, order.apartmentNumber, order.corner, order.number];
      setCurrentAddress(address.join(", "));
    } else {
      if(street && apartmentNumber != ""){
        const address = [street, apartmentNumber, number];
        setCurrentAddress(address.join(", "));
      }else{
        const address = [order.street, order.apartmentNumber, order.number];
        setCurrentAddress(address.join(", "));
      }
    }
  }, [newAddress, street, apartmentNumber, number]); // Add dependencies here

  // Set initial delivery option and address
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order") || '{}');
    setTakeAway(order.takeAway);
    handleAddress();
  }, [handleAddress]);

  // Toggle delivery option based on user selection
  const handleShipping = () => {
    const shippingElement = document.getElementById("shipping") as HTMLInputElement;
    if (shippingElement) {
      const isShippingChecked = shippingElement.checked;
      setTakeAway(!isShippingChecked);
    }
  }

  // Collect and set payment methods based on user selection
  const handlePayment = () => {
    const cash = ((document.getElementById("cash") as HTMLInputElement).checked);
    const debitCard = (document.getElementById("debitCard") as HTMLInputElement).checked;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).checked;
  
    const methods = [];
    if (cash) methods.push("CASH");
    if (debitCard) methods.push("DEBIT_CARD");
    if (creditCard) methods.push("CREDIT_CARD");
    if (!cash && !debitCard && !creditCard) methods.push("UNDEFINED");
    
    setPaymentMethods(methods.join(", "));
    return methods.join(", ");
  }

  const handleError = () => {
    console.log(x);
    if (x) {
      if (name === "" || street === "" || number === 0 || apartmentNumber === "") {
        console.log("Error en la nueva direccion");
        return false;
      }
    } else {
      const order = JSON.parse(localStorage.getItem("order") || '{}');
      if (order.name === "" || order.street === "" || order.number === 0 || order.apartmentNumber === "") {
        console.log("Error con preguardado");
        return false;
      }
    }
    console.log("Todo bien");
    return true;
  }

  // Handle form submission for order
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
      if(handleError()){
        localStorage.setItem("order", JSON.stringify(order));
        console.log(order, "se cambio la direccion");
      }
    } else {
      const order = JSON.parse(localStorage.getItem("order") || '{}');
      order.paymentMethod = paymentMethods;
      order.takeAway = !(document.getElementById("shipping") as HTMLInputElement).checked;
      if(handleError()){
        localStorage.setItem("order", JSON.stringify(order));
        console.log(order, "no se cambio la direccion");
      }
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
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.cartTotal}>
        <p className={styles.totalDisplay}>Total: ${cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</p>
        <input type="radio" name="deliveryOption" id="shipping" defaultChecked={!takeAway} onChange={handleShipping} />
        <label htmlFor="shipping">Envío a domicilio</label>
        <input type="radio" name="deliveryOption" id="takeAway" defaultChecked={takeAway} onChange={handleShipping} />
        <label htmlFor="takeAway">Retira en local</label>
        {!takeAway ? (
          <>
            <p className={styles.addressDisplay}>Direccion actual: {currentAddress}</p>
            <button onClick={handleChangeAddress} className={styles.submitButton}>
              Cambiar dirección
            </button>
          </>
        ) : (
          <p className={styles.addressDisplay}>Dirección del local: Cooper 2109</p>
        )}
        <div className={styles.paymentMethodSection}>
          <label className={styles.paymentMethodLabel}>Forma de pago</label>
          <div className={styles.paymentOption}>
            <input type="checkbox" id="cash" value="Efectivo" className={styles.checkbox} onChange={handlePayment}/>
            Efectivo
          </div>
          <div className={styles.paymentOption}>
            <input type="checkbox" id="debitCard" value="Tarjeta Debito" className={styles.checkbox} onChange={handlePayment}/>
            Tarjeta Debito
          </div>
          <div className={styles.paymentOption}>
            <input type="checkbox" id="creditCard" value="Tarjeta Credito" className={styles.checkbox} onChange={handlePayment}/>
            Tarjeta Credito
          </div>
        </div>
        <button 
          type="submit"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Hacer pedido
        </button>
      </div>
      <div className={styles.cartForm}>
        {newAddress ? (
          <form onSubmit={handleSaveData} className={styles.personalInfoForm}>
            <label>Datos Personales</label>
            <div>
              <input type="text" id="name" placeholder="Nombre y Apellido" />
              <input type="text" id="phone" placeholder="Telefono" />
              <input type="email" id="email" placeholder="Correo electronico" />
            </div>
            <label>Direccion</label>
            <div>
              <input type="text" id="street" placeholder="Direccion" />
              <input type="text" id="apartmentNumber" placeholder="Apto/Casa" className={styles.aptNumber} />
              <input type="text" id="corner" placeholder="Esquina" className={styles.corner} />
            </div>
            <div>
              <input type="text-area" id="annotation" className={styles.annotation} />
            </div>
            <button type="submit" className={styles.submitButton}>Guardar</button>
          </form>
        ) : (
          <div 
          onClick={handleChangeAddress}
          className={styles.dropdownCover}
          >
            <p>Cambiar la dirección</p>
            <div className={styles.dropdownArrow}>
            <img src="/images/chevron-down.svg" alt="dropdown arrow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
