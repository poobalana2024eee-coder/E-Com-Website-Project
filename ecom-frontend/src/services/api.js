import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productAPI = {
    // Get all products
    getAllProducts: async () => {
        const response = await api.get('/getproduct');
        return response.data;
    },

    // Create a new product
    createProduct: async (productData) => {
        const response = await api.post('/postProduct', productData);
        return response.data;
    },

    // Update a product
    updateProduct: async (id, productData) => {
        const response = await api.put(`/updateProduct/${id}`, productData);
        return response.data;
    },

    // Delete a product
    deleteProduct: async (id) => {
        const response = await api.delete(`/deleteProduct/${id}`);
        return response.data;
    },
};

export const userAPI = {
    // Get all Users
    getAllUsers: async () => {
        const response = await api.get('/getUser');
        return response.data;
    },

    // Create a new User
    createUser: async (UserData) => {
        const response = await api.post('/postUser', UserData);
        return response.data;
    },

    // Update a User
    updateUser: async (id, UserData) => {
        const response = await api.put(`/updateUser/${id}`, UserData);
        return response.data;
    },

    // Delete a User
    deleteUser: async (id) => {
        const response = await api.delete(`/deleteUser/${id}`);
        return response.data;
    },
};

export default api;
