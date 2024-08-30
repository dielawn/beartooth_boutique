import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCart } from './Cart'
import { Product } from './Product'
import { Order } from './Order'
import { Invoice } from '../CreateInvoice'
import { QuoteInvoice } from '../QuoteInv';
const apiUrl = import.meta.env.VITE_STRIKE_URL;
const apiKey = import.meta.env.VITE_STRIKE_API_KEY;

console.log(apiKey, apiUrl)

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalBTC, setTotalBTC] = useState(0);
  const [currency, setCurrency] = useState('USD');

  const [orderId, setOrderId] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [quoteId, setQuoteId] = useState('');
  
  const [description, setDescription] = useState('');

  const [lnInvoice, setLnInvoice] = useState('');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`, 
};

  const orderData = {
    amount: currency === 'USD' ? totalUSD : totalBTC,
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
          totalUSD={totalUSD}
          setTotal={setTotal}  
          orderData={orderData}
          setCurrency={setCurrency}
          setTotalUSD={setTotalUSD}
          totalBTC={totalBTC}
          setTotalBTC={setTotalBTC}
          headers={headers}
        />
         <Invoice 
        apiUrl={apiUrl}
        headers={headers}
        setInvoiceId={setInvoiceId}
        currency={currency} 
        setCurrency={setCurrency} 
        totalUSD={totalUSD}

        totalBTC={totalBTC}
        setTotalBTC={setTotalBTC}
        description={description}
      />
      <QuoteInvoice 
        invoiceId={invoiceId}
        quoteId={quoteId}
        setQuoteId={setQuoteId}
        lnInvoice={lnInvoice}
        setLnInvoice={setLnInvoice}
      />
      </div>
      <div className='productDiv'>
       <Product addToCart={addToCart}/>
      </div>
     
    </div>
  )
}

export default App
