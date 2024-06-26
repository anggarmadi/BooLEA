import axios from 'axios';
import RefreshToken from './RefreshToken.jsx';
import secureLocalStorage from 'react-secure-storage';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
});

api.interceptors.response.use(
    (response) => response, // kembalikan response jika tidak ada error
    async (error) => {
        const originalRequest = error.config;

        // cek apakah response adalah 401 (unauthorized) dan originalRequest beluma di retry
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenSuccess = await RefreshToken();

                if (!refreshTokenSuccess) {
                    throw new Error('Unable to refresh token');
                }

                originalRequest.headers['Authorization'] =
                    `Bearer ${secureLocalStorage.getItem('accessToken')}`;

                return api(originalRequest);
            } catch (error) {
                // tangani error refresh token
                console.log('Error refresh token :', error);
                throw error;
            }
        }

        // kembalikan error jika bukan 401 atau originalRequest sudah di retry
        throw error;
    },
);

export default api;
