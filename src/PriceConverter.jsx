import { useState, useEffect } from 'react';
import { convertCurrency } from './utils';

export const PriceConverter = ({ total, totalUSD, setTotalUSD, totalBTC, setTotalBTC, currency }) => {

  useEffect(() => {
    const performConversion = async () => {
      try {
        console.log(total)
          const btcResult = await convertCurrency(total, 'USD', 'BTC');
          console.log(btcResult)
          const btcTotalFormatted = btcResult.toFixed(8);
          setTotalBTC(btcTotalFormatted);
       
          const usdResult = await convertCurrency(totalBTC, 'BTC', 'USD');
          const usdTotalFormatted = usdResult.toFixed(2);
          setTotalUSD(usdTotalFormatted);
       
        
      } catch (error) {
        console.error('Conversion failed:', error);
        setTotalBTC(null);
        setTotalUSD(null)
      }
    };

    performConversion();
  }, [total]);

  if (totalBTC === null || totalUSD === null) {
    return <p>Converting...</p>;
  }

  return (
    <>
      {currency === 'USD' && `$${totalUSD}`} 
      {currency === 'BTC' || 'LBTC' && `${totalBTC} btc`}
    </>
  );
};
