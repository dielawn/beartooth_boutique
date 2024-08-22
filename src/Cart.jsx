import { useEffect, useState } from "react";
import { Order } from "./Order";
import { PriceConverter } from "./PriceConverter";

export const ShoppingCart = ({ cart, removeFromCart, total, setTotal, orderData, setCurrency }) => {   
 
    const calcTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    };

    useEffect(() => {
        setTotal(calcTotal())
    }, [cart]);

    return (
        <div>    
          <div>
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
              <div>
                {cart.map((item) => (
                  <div key={item.id}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                ))}
              </div>
            ) : (
              <div>Your cart is empty.</div>
            )}
          </div>
    
          <div>
            <h2>Total: ${total}</h2>
            {total > 0  && orderData.currency === 'BTC' && <h2>Total: {<PriceConverter amount={total} fromCurrency='usd' toCurrency='btc'/>} sats</h2> }
            {total > 0  && <Order orderData={orderData} setCurrency={setCurrency}/>}
            
          </div>
        </div>
      );
    };