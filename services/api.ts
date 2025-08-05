import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * Creates a custom Axios instance with a default configuration.
 * Best practice is to use environment variables for the base URL.
 * NEXT_PUBLIC_API_URL is an example of a client-side accessible environment variable.
 */
const api = axios.create({
    // Set the base URL for all API requests
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

    // You can set other default configurations here
    timeout: 5000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * We'll add a request interceptor here to automatically include the
 * authentication token from a cookie in every outgoing request.
 */
api.interceptors.request.use(
    (config) => {
        // Get the token from the cookie
        const token = Cookies.get('my-auth-token');

        // If a token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default api;