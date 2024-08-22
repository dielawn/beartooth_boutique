import { useState } from 'react'
import './App.css'
import { ShoppingCart } from './Cart'
import { Product } from './Product'
import { Order } from './Order'

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState('USD')
  const [orderId, setOrderId] = useState('order123')
  
  const orderData = {
    amount: total, // $100.00 in cents
    currency: currency,
    externalUniqId: orderId,
    redirectUrl: 'https://beartoothboutique.com/thank-you',
    label: `Beartoot boutique invoice #: ${orderId}`
  };
  
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
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
        } else {
            return prevCart.filter((cartItem) => cartItem.id !== item.id);
        }
    });
};

  return (
    <div>
      <div className='navDiv'>
        <ShoppingCart 
          cart={cart} 
          setCart={setCart} 
          removeFromCart={removeFromCart}
          total={total}
          setTotal={setTotal}  
          orderData={orderData}
          setCurrency={setCurrency}
        />
      </div>
      <div className='productDiv'>
       <Product addToCart={addToCart}/>
      </div>
    </div>
  )
}

export default App
