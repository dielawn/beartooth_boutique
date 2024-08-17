import { useEffect, useState } from "react";
import { earrings } from "./product_list";

export const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    
    // Add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItems = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItems) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);                    
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    }

    const removeFromCart = (item) => {
        setCart((prevCart) => {
            const existingItems = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItems.quantity > 1) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem,quatity: cartItem.quantity - 1 } : cartItem);
            } else {
                return prevCart.filter((cartItem) => cartItem.id !== item.id);
            }
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    };

    useEffect(() => {
        calculateTotal()
    }, [cart]);

    return (
        <div>
          <h1>Shopping Cart</h1>
          <div>
            <h2>Items for Sale</h2>
            <ul>
              {earrings.map((item) => (
                <li key={item.id}>
                <img 
                    className="productImg"
                    src={item.image1} 
                    alt="Description of the image"        
                />
                  {item.name} - ${item.price.toFixed(2)}
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </li>
              ))}
            </ul>
          </div>
    
          <div>
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
    
          <div>
            <h2>Total: ${calculateTotal()}</h2>
          </div>
        </div>
      );
    };