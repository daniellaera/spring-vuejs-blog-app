import axios from 'axios';

// Set up axios to use the proxy setup above
const apiClient = axios.create({
    baseURL: '/api', // You can use '/api' here because Vite is handling the proxy
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;