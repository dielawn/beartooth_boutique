import axios from 'axios';

const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

let cachedRates = {};
let lastFetchTime = 0;

const fetchExchangeRates = async () => {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/exchange_rates');
    cachedRates = response.data.rates;
    lastFetchTime = now;
    return cachedRates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    if (Object.keys(cachedRates).length) {
      console.warn('Using outdated exchange rates');
      return cachedRates;
    }
    throw error;
  }
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const rates = await fetchExchangeRates();
  
  const fromRate = rates[fromCurrency.toLowerCase()].value;
  const toRate = rates[toCurrency.toLowerCase()].value;

  const convertedAmount = (amount / fromRate) * toRate;
  if (toCurrency === 'usd') {
    return Number(convertedAmount.toFixed(2)); // Round to 2 decimal places
  } 
  return Number(convertedAmount.toFixed(8)); // Round to 8 decimal places
};

export { convertCurrency };