import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_STRIKE_URL;
const apiKey = import.meta.env.VITE_STRIKE_API_KEY;

export const SearchInvoices = ({ headers }) => {
    const [invoiceId, setInvoiceId] = useState('');
    const [foundInvoice, setFoundInvoice] = useState({});

    const searchInvoices = async () => {
        try {
            const response = await axios.get(`${apiUrl}/invoices/${invoiceId}`, { 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`, 
                },    
            })
            const responseData = response.data
            console.log('Invoice:', responseData)
            return responseData
                
        } catch (error) {
            console.error('Error ', error.response?.data || error.message)
        }
    }

    return (
        <div>
            <p>Search Invoice by id</p>
            <label>Invoice Id
                <input 
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                />
            </label>
            <button type="button" onClick={searchInvoices}>Search</button>
            {foundInvoice && <p>{foundInvoice.invoiceId}</p>}
        </div>
    )
}