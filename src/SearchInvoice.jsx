import { useState } from "react";
import axios from "axios";

export const SearchInvoices = () => {
    const [invoiceId, setInvoiceId] = useState('');
    const [foundInvoice, setFoundInvoice] = useState({});

    const searchInvoices = async () => {
        try {
            const response = await axios.get(`/invoice/${invoiceId}`);
            const responseData = response.data;
            setFoundInvoice(responseData);

        } catch (error) {
        console.error('Error searching invoices:', error);
    }
    }

    return (
        <div>
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