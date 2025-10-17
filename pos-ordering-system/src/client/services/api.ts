import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust the base URL as needed
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchOrders = async () => {
    const response = await apiClient.get('/orders');
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await apiClient.get('/products');
    return response.data;
};

export const fetchStations = async () => {
    const response = await apiClient.get('/stations');
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
};