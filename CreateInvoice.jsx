import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const apiUrl = import.meta.env.VITE_STRIKE_URL;
const apiKey = import.meta.env.VITE_STRIKE_API_KEY;

export const Invoice = ({ setInvoiceId, currency, setCurrency, totalUSD, description, totalBTC }) => {
    const [invoice, setInvoice] = useState(null);

    const currencyOptions = ['BTC', 'USD']
    
    useEffect(() => {
        if (invoice !== null) {
            setInvoiceId(invoice.invoiceId)
        }       
    }, [invoice]);

    const createInvoice = async () => {
        if (!description || !currency || totalUSD === 0 || totalBTC === 0) {
            throw new Error('Missing required parameters');
        }
        const correlationId = uuidv4();
        const formattedCurrency = currency.toUpperCase();
        
        const data = { 
            correlationId,
            description,
            amount: {
                currency: formattedCurrency,
                amount: currency === 'USD' ? totalUSD : totalBTC
            }
         }
        try {
           const response = await axios.post(`${apiUrl}/invoices`, data, { 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`, 
                },  
            })
            const responseData = response.data
            console.log('Invoice created:', responseData)
            setInvoice(responseData)
    
        } catch (error) {
            console.error('Error creating new invoice:', error.response?.data || error.message);
            throw error; 
        }
    };

    return (
        <div>
            
            {totalUSD && <p>${totalUSD} {totalBTC} btc</p>}
            <label>Currency:
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    {currencyOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
           
            <button type='button' onClick={createInvoice}>Create Invoice</button>
            {invoice && <p>Invoice Id: {invoice.invoiceId}</p>}
        </div>
    )
};




