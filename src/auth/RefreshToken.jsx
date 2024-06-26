import axios from '../auth/AxiosInstance.jsx';
import { jwtDecode } from 'jwt-decode';
import secureLocalStorage from 'react-secure-storage';

const RefreshToken = async () => {
    const auth = secureLocalStorage.getItem('accessToken');
    const refresh = secureLocalStorage.getItem('refreshToken');

    if (!auth || !refresh) {
        console.log('No auth or refresh token found');
        return false;
    }

    const exp = new Date(jwtDecode(auth).exp * 1000);
    console.log('Waktu kedaluwarsa token:', exp);

    console.log('Before refresh condition');
    if (exp <= new Date()) {
        console.log('Access token expired, refreshing...');
        try {
            const response = await axios.get('api/user/refresh', {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('refreshToken')}`,
                },
            });

            if (!response.data) {
                console.log('No data in refresh token response');
                return false;
            }

            secureLocalStorage.setItem(
                'accessToken',
                response.data.accessToken,
            );
            secureLocalStorage.setItem(
                'refreshToken',
                response.data.refreshToken,
            );
            secureLocalStorage.setItem('user', response.data.data);

            console.log('Token refreshed successfully');
            return true;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return false;
        }
    }
    console.log('Access token has not expired yet');
    return true;
};

export default RefreshToken;
