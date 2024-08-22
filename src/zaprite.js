import axios from 'axios';
const zapriteUrl = import.meta.env.VITE_ZAPRITE_API_URL;
const apiKey = import.meta.env.VITE_ZAPRITE_API_KEY;

const ensureApiKey = () => {
    if (!apiKey) {
        throw new Error('Zaprite API key is not set in the environment variables')
    }
}

const createZapriteOrder = async (orderData) => {
    ensureApiKey();
    try {
        const response = await axios.post(`${zapriteUrl}/api/create-order`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating Zaprite order:', error.response?.data || error.message);
        throw error;
    }
};


const getZapriteOrder = async (orderId) => {
    ensureApiKey();
    try {
        const response = await axios.get(
            `${zapriteUrl}/api/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );

        return response.data;
    } catch (error) {
    console.error('Error creating Zaprite order:', error.response?.data || error.message);
    throw error;
    }
};

export {
    createZapriteOrder,
    getZapriteOrder
}