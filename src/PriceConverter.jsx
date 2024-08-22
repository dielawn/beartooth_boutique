import { useState, useEffect } from 'react';
import { convertCurrency } from './utils';

export const PriceConverter = ({ amount, fromCurrency, toCurrency }) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const performConversion = async () => {
      try {
        const result = await convertCurrency(amount, fromCurrency, toCurrency);
        setConvertedAmount(result);
      } catch (error) {
        console.error('Conversion failed:', error);
        setConvertedAmount(null);
      }
    };

    performConversion();
  }, [amount, fromCurrency, toCurrency]);

  if (convertedAmount === null) {
    return <p>Converting...</p>;
  }

  return (
    <>
      {convertedAmount} 
    </>
  );
};
