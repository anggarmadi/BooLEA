import React, { useState, useEffect } from 'react';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

const Navbar = () => {
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });
            const { data } = response.data;
            const apiUrl = import.meta.env.VITE_API_URL;
            const imageUrl = `${apiUrl}/${data.profileImage.replace(/\\/g, '/')}`;
            console.log('Image URL:', imageUrl);
            setImage(imageUrl);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = () => {
        setImage('images/profile.webp');
    };

    return (
        <nav className='bg-gradient-to-r from-indigo-500 to-blue-500 w-full shadow-lg'>
            <div className='mx-auto px-2 sm:px-6 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                    <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                        <div className='flex-shrink-0'>
                            <img
                                className='h-8 w-8 animate-spin-slow'
                                src='../../images/logo_lea.png'
                                alt='Library Logo'
                            />
                        </div>
                        <div className='hidden sm:block sm:ml-6'>
                            <div className='flex space-x-4'>
                                <span className='text-white text-lg font-semibold animate-pulse'>
                                    Library Information System
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                        <div className='ml-3 relative'>
                            <div>
                                <button
                                    type='button'
                                    className='bg-indigo-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-transform transform hover:scale-105'
                                    id='user-menu-button'
                                    aria-expanded='false'
                                    aria-haspopup='true'
                                >
                                    <span className='sr-only'>
                                        Open user menu
                                    </span>
                                    <img
                                        className='h-8 w-8 rounded-full'
                                        src={image}
                                        onError={handleImageError}
                                        alt='Profile'
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
