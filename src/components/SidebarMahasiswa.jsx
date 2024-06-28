import React, { useState, useEffect } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from '@material-tailwind/react';
import {
    UserCircleIcon,
    ArchiveBoxIcon,
    PowerIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    ClipboardDocumentListIcon,
    BriefcaseIcon,
    HomeIcon,
} from '@heroicons/react/24/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export function SidebarMahasiswa() {
    const [isBukuOpen, setIsBukuOpen] = useState(false);
    const [isInventarisOpen, setIsInventarisOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
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
            setImage(imageUrl);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = () => {
        setImage('../images/profile.webp'); // Set a default profile image path here
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isActive = (path) => location.pathname === path;

    const handleBukuToggle = () => {
        setIsBukuOpen(!isBukuOpen);
    };

    const handleInventarisToggle = () => {
        setIsInventarisOpen(!isInventarisOpen);
    };

    const menuItems = [
        {
            to: '/mahasiswa/dashboard',
            icon: <HomeIcon className='h-5 w-5 text-blue-500' />,
            label: 'Dashboard',
        },
        {
            icon: <ArchiveBoxIcon className='h-5 w-5 text-blue-500' />,
            label: 'Buku',
            isOpen:
                isBukuOpen ||
                location.pathname.startsWith('/mahasiswa/katalog-buku') ||
                location.pathname.startsWith(
                    '/mahasiswa/histori-peminjaman-buku',
                ),
            toggle: handleBukuToggle,
            subItems: [
                {
                    to: '/mahasiswa/katalog-buku',
                    icon: (
                        <DocumentTextIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'Katalog Buku',
                },
                {
                    to: '/mahasiswa/katalog-buku/cart',
                    icon: (
                        <ShoppingCartIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'Keranjang Buku',
                },
                {
                    to: '/mahasiswa/histori-peminjaman-buku',
                    icon: (
                        <ClipboardDocumentListIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'histori Peminjaman Buku',
                },
            ],
        },
        {
            icon: <ArchiveBoxIcon className='h-5 w-5 text-blue-500' />,
            label: 'Inventaris',
            isOpen:
                isInventarisOpen ||
                location.pathname.startsWith('/mahasiswa/katalog-inventaris') ||
                location.pathname.startsWith(
                    '/mahasiswa/histori-peminjaman-inventaris',
                ),
            toggle: handleInventarisToggle,
            subItems: [
                {
                    to: '/mahasiswa/katalog-inventaris',
                    icon: (
                        <DocumentTextIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'Katalog Inventaris',
                },
                {
                    to: '/mahasiswa/katalog-inventaris/cart',
                    icon: (
                        <ShoppingCartIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'Keranjang Inventaris',
                },
                {
                    to: '/mahasiswa/histori-peminjaman-inventaris',
                    icon: (
                        <ClipboardDocumentListIcon className='h-5 w-5 text-blue-500' />
                    ),
                    label: 'Histori Peminjaman Inventaris',
                },
            ],
        },
        {
            to: '/mahasiswa-profile',
            icon: <UserCircleIcon className='h-5 w-5 text-blue-500' />,
            label: 'Profile',
        },
    ];

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
                    <Link to={'/mahasiswa-profile'}>
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
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.to ? (
                                <Link to={item.to}>
                                    <ListItem
                                        className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive(item.to) ? 'bg-blue-200' : ''}`}
                                    >
                                        <ListItemPrefix>
                                            {item.icon}
                                        </ListItemPrefix>
                                        {isSidebarOpen && (
                                            <Typography className='text-sm font-normal'>
                                                {item.label}
                                            </Typography>
                                        )}
                                    </ListItem>
                                </Link>
                            ) : (
                                <ListItem
                                    className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${item.isOpen ? 'bg-gray-100' : ''}`}
                                    onClick={item.toggle}
                                >
                                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                                    {isSidebarOpen && (
                                        <>
                                            <Typography className='text-sm font-normal'>
                                                {item.label}
                                            </Typography>
                                            <ChevronDownIcon
                                                className={`h-4 w-4 ml-auto transition-transform ${item.isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </>
                                    )}
                                </ListItem>
                            )}
                            {item.isOpen && item.subItems && isSidebarOpen && (
                                <div className='pl-6 space-y-1'>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <Link to={subItem.to} key={subIndex}>
                                            <ListItem
                                                className={`w-full flex items-center ${isSidebarOpen ? 'pr-4' : 'w-12'} hover:bg-blue-100 transition-colors duration-300 ${isActive(subItem.to) ? 'bg-blue-200' : ''}`}
                                            >
                                                <ListItemPrefix>
                                                    {subItem.icon}
                                                </ListItemPrefix>
                                                {isSidebarOpen && (
                                                    <Typography className='text-sm font-normal'>
                                                        {subItem.label}
                                                    </Typography>
                                                )}
                                            </ListItem>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                    <ListItem
                        className='w-full flex items-center hover:bg-blue-100 transition-colors duration-300'
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
                <ChevronRightIcon className='w-6 h-6' />
            </button>
        </div>
    );
}

export default SidebarMahasiswa;
