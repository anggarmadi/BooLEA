import React, { useState, useEffect } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from '@material-tailwind/react';
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    InboxIcon,
    PowerIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/solid';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function SidebarAdmin() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        secureLocalStorage.clear();
        navigate('/login');
    };

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
            setName(data.name);
            setRole(data.role);
            const apiUrl = import.meta.env.VITE_API_URL;
            const imageUrl = `${apiUrl}/${data.profileImage.replace(/\\/g, '/')}`;
            console.log('Image URL:', imageUrl); // Log the image URL for debugging
            setImage(imageUrl);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = () => {
        setImage('../../images/profile.webp'); // Set a default profile image path here
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div
            className={`relative flex transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'}`}
        >
            <Card
                className={`w-full ${isSidebarOpen ? 'p-0' : 'p-0'} shadow-xl shadow-blue-gray-900/5 transition-all duration-500 ease-in-out`}
            >
                <div
                    className={`mb-2 ${isSidebarOpen ? 'p-2' : 'p-1'} flex flex-col items-center`}
                >
                    <Link to=''>
                        <img
                            src={image}
                            alt='Profile'
                            onError={handleImageError}
                            className={`h-16 w-16 rounded-full mb-1 border-2 border-blue-500 transition-transform ${isSidebarOpen ? 'transform hover:scale-110' : 'transform scale-75'}`}
                            style={{ objectFit: 'cover' }}
                        />
                    </Link>
                    {isSidebarOpen && (
                        <>
                            <Typography
                                variant='h6'
                                color='blue-gray'
                                className='text-center text-sm font-normal'
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant='small'
                                color='blue-gray'
                                className='text-center text-xs'
                            >
                                {role}
                            </Typography>
                        </>
                    )}
                </div>
                <List className='space-y-1'>
                    <Link to='/dashboard'>
                        <ListItem
                            className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/dashboard') ? 'bg-blue-200' : ''}`}
                        >
                            <ListItemPrefix>
                                <PresentationChartBarIcon className='h-5 w-5 text-blue-500' />
                            </ListItemPrefix>
                            {isSidebarOpen && (
                                <Typography className='text-sm font-normal'>
                                    Dashboard
                                </Typography>
                            )}
                        </ListItem>
                    </Link>
                    <Link to='/data-asisten'>
                        <ListItem
                            className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/admindataasisten') ? 'bg-blue-200' : ''}`}
                        >
                            <ListItemPrefix>
                                <ShoppingBagIcon className='h-5 w-5 text-blue-500' />
                            </ListItemPrefix>
                            {isSidebarOpen && (
                                <Typography className='text-sm font-normal'>
                                    Data Asisten
                                </Typography>
                            )}
                        </ListItem>
                    </Link>
                    <Link to='/data-mahasiswa'>
                        <ListItem
                            className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/admindatamahasiswa') ? 'bg-blue-200' : ''}`}
                        >
                            <ListItemPrefix>
                                <InboxIcon className='h-5 w-5 text-blue-500' />
                            </ListItemPrefix>
                            {isSidebarOpen && (
                                <Typography className='text-sm font-normal'>
                                    Data Mahasiswa
                                </Typography>
                            )}
                        </ListItem>
                    </Link>
                    <Link to='/data-dosen'>
                        <ListItem
                            className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/admindatamahasiswa') ? 'bg-blue-200' : ''}`}
                        >
                            <ListItemPrefix>
                                <InboxIcon className='h-5 w-5 text-blue-500' />
                            </ListItemPrefix>
                            {isSidebarOpen && (
                                <Typography className='text-sm font-normal'>
                                    Data Dosen
                                </Typography>
                            )}
                        </ListItem>
                    </Link>
                    <Link to='/adminpeminjamanasisten'>
                        <ListItem
                            className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/adminpeminjamanasisten') ? 'bg-blue-200' : ''}`}
                        >
                            <ListItemPrefix>
                                <UserCircleIcon className='h-5 w-5 text-blue-500' />
                            </ListItemPrefix>
                            {isSidebarOpen && (
                                <Typography className='text-sm font-normal'>
                                    Peminjaman Jasa
                                </Typography>
                            )}
                        </ListItem>
                    </Link>
                    <ListItem
                        className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive('/profile') ? 'bg-blue-200' : ''}`}
                        onClick={handleLogout}
                    >
                        <ListItemPrefix>
                            <PowerIcon className='h-5 w-5 text-red-500' />
                        </ListItemPrefix>
                        {isSidebarOpen && (
                            <Typography className='text-sm font-normal'>
                                Log Out
                            </Typography>
                        )}
                    </ListItem>
                </List>
            </Card>
            <button
                onClick={toggleSidebar}
                className={`absolute top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center focus:outline-none transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'right-[-24px]' : 'right-[-24px] rotate-180'}`}
            >
                {isSidebarOpen ? (
                    <ChevronRightIcon className='w-6 h-6' />
                ) : (
                    <ChevronRightIcon className='w-6 h-6' />
                )}
            </button>
        </div>
    );
}

export default SidebarAdmin;
