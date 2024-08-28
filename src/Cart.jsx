import { useEffect, useState } from "react";
import { Order } from "./Order";
import { PriceConverter } from "./PriceConverter";

export const ShoppingCart = ({ cart, removeFromCart, total, setTotal, orderData, setCurrency, totalBTC, setTotalBTC, totalUSD, setTotalUSD }) => {   
 
    const calcTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    };

    useEffect(() => {
        const cartTotal = calcTotal()
        setTotalUSD(cartTotal)
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
            {total > 0  && <h2>Total: {<PriceConverter totalUSD={totalUSD} setTotalUSD={setTotalUSD} totalBTC={totalBTC} setTotalBTC={setTotalBTC}  total={total} />} sats</h2> }
            {total > 0  && <Order orderData={orderData} setCurrency={setCurrency}/>}
            
          </div>
        </div>
      );
    };