import { useState, useEffect } from 'react';
import { convertCurrency } from './utils';
import axios from 'axios';

export const PriceConverter = ({ total, totalUSD, setTotalUSD, totalBTC, setTotalBTC, currency }) => {
  const [rates, setRates] = useState([]);


  const getExchangeRates = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exchange-rates`);
      const responseData = response.data
      setRates(responseData)
    } catch (error) {
        console.error('Failed to get exchange rates:', error);
     
      }
  };

  useEffect(() => {
    getExchangeRates();
  }, [])

  const rateCalculator = (amount, sourceCurrency, targetCurrency) => {
    const rate = rates.filter(element => element.sourceCurrency === sourceCurrency && element.targetCurrency === targetCurrency)
    let  convertedAmount;
    if (rate.length > 0) {
      convertedAmount = Number(amount) * Number(rate[0].amount);
    } else {
      console.error('Rates not available')
    }
    return convertedAmount
  };

  useEffect(() => {
    rateCalculator(totalUSD, 'USD', 'BTC')
  }, [rates])
  

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
