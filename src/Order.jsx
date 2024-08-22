import React, { useEffect, useState } from 'react';
import { createZapriteOrder } from './zaprite';
import { CurrencySelect } from "./CurrencySelect";

export const Order = ({ orderData, setCurrency }) => {
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    console.log(orderData)
  }, [orderData])

  const handleCreateOrder = async () => {
    try {
      const response = await createZapriteOrder(orderData);
      setCheckoutUrl(response.checkoutUrl);
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div>
        <CurrencySelect currency={orderData.currency} setCurrency={setCurrency}/>
      <button onClick={handleCreateOrder}>Order</button>
      {checkoutUrl && (
        <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
          Proceed to Checkout
        </a>
      )}
    </div>
  );
};

