import axios from 'axios';
import { useState } from 'react';

export const Invoice = ({ invoice, setInvoice, currency, setCurrency, total, description }) => {

    const currencyOptions = ['BTC', 'USD']
    const btcTotal = Number(total).toFixed(8)

    const createInvoice = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-invoice', {
                description,
                currency,
                amount: total
            });
    
            console.log('Invoice created:', response.data);
            setInvoice(invoice)
        } catch (error) {
            console.error('Error creating invoice:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            
            {total && <p>{currency == 'USD' ? `$${total}` : `${btcTotal} btc`}</p>}
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




