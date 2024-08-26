import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCart } from './Cart'
import { Product } from './Product'
import { Order } from './Order'
import { Invoice } from '../CreateInvoice'

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalBTC, setTotalBTC] = useState(0);
  const [currency, setCurrency] = useState('USD')
  const [orderId, setOrderId] = useState('')

  const [invoice, setInvoice] = useState({});
  
  const [description, setDescription] = useState('');

  const btcTotal = Number(total).toFixed(8)

  const orderData = {
    amount: total,
    currency: currency,
    externalUniqId: orderId,
    redirectUrl: 'https://beartoothboutique.com/thank-you',
    label: `Beartoot boutique invoice #: ${orderId}`
  };

  const handleDesription = () => {
    let allNames = []
    const cartItems = cart.map((item) => allNames.push(item.name))
    const order = ` Order Id: ${orderId}:      
      ${allNames.join(', ')}
      Currency: ${currency} ${currency === 'USD' ? `$${total}` : `${btcTotal} btc`}`
    console.log('order', order)
    setDescription(order)
  };

  useEffect(() => {
    const id = uuidv4();
    setOrderId(id)
  }, [])

  useEffect(() => {
    handleDesription()
  }, [cart, total, currency])
  
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
          totalUSD={totalUSD}
          setTotalUSD={setTotalUSD}
          totalBTC={totalBTC}
          setTotalBTC={setTotalBTC}
        />
      </div>
      <div className='productDiv'>
       <Product addToCart={addToCart}/>
      </div>
      <Invoice 
        invoice={invoice}
        setInvoice={setInvoice}
        currency={currency} 
        setCurrency={setCurrency} 
        total={total}
        description={description}
      />
    </div>
  )
}

export default App
