export const CurrencySelect = ({ currency, setCurrency }) => {
    const currencies = ['USD', 'BTC', 'LBTC'];
    
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div>
            <select 
                value={currency} 
                onChange={handleCurrencyChange}
                id="currency-select"
                name="currency"
            >
                {currencies.map((curr) => (
                    <option key={curr} value={curr}>
                        {curr}
                    </option>
                ))}
            </select>
        </div>
    );
};