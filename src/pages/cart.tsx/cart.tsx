import React, { useEffect, useState } from 'react';

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

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
  {cartItems.map((item, index) => (
    <li key={index}>
      <img src={item.product.image} alt={item.product.name} />
      <div>
        <h3>{item.product.name}</h3>
        <p>Price: ${item.product.price}</p>
        {item.product.discountPrice && <p>Discount Price: ${item.product.discountPrice}</p>}
        <p>Quantity: {item.quantity}</p>
      </div>
    </li>
  ))}
</ul>
      )}
    </div>
  );
};

export default Cart;