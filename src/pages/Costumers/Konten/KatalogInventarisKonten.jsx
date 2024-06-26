import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { Spinner } from '@material-tailwind/react';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import SearchInput from '../../../components/SearchInput';

function KatalogInventarisKonten({ onAddToCart }) {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const accessToken = secureLocalStorage.getItem('accessToken');
        const user = secureLocalStorage.getItem('user');

        if (accessToken && user) {
            setUserRole(user.role);
        }

        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const response = await api.get('/api/inventaris', {
                params: {
                    search_query: query,
                    page: page - 1,
                    limit: itemsPerPage,
                },
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });

            setData(response.data.data || []);
            setTotalPages(response.data.totalPage);
            setTotalItems(response.data.totalRows);
            setCurrentPage(page);
            setSearchQuery(query);
            setError('');
            console.log(response.data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleAddToCart = (inventaris) => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the inventaris is already in the cart
        const existingCartItem = storedCartItems.find(
            (item) => item.inventarisId === inventaris.inventarisId,
        );

        if (existingCartItem) {
            // If the inventaris already exists, calculate new quantity
            const newQuantity = existingCartItem.quantity + 1;

            // Check if new quantity exceeds jumlah_tersedia
            if (newQuantity <= inventaris.jumlah_tersedia) {
                const updatedCartItems = storedCartItems.map((item) =>
                    item.inventarisId === inventaris.inventarisId
                        ? { ...item, quantity: newQuantity }
                        : item,
                );
                localStorage.setItem(
                    'cartItems',
                    JSON.stringify(updatedCartItems),
                );
            }
        } else {
            // If the inventaris doesn't exist, add it with quantity 1
            const newCartItems = [
                ...storedCartItems,
                { ...inventaris, quantity: 1 },
            ];
            localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        }

        // Optionally, you can also trigger a callback or update state to reflect addition
        if (onAddToCart) onAddToCart(inventaris);
    };

    const getNavigationPath = () => {
        if (userRole === 'kalab') return '/dashboard';
        else if (userRole === 'asisten') return '/asisten/dashboard';
        else if (userRole === 'mahasiswa')
            return '/mahasiswa/katalog-inventaris/cart';
        else if (userRole === 'dosen') return '/dosen/katalog-inventaris/cart';
        return '/';
    };

    return (
        <div>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                <div className='flex flex-wrap mb-4'>
                    <SearchInput
                        placeholder='Cari inventaris'
                        className='border rounded px-3 py-2'
                        onSearch={handleSearch}
                        value={searchQuery}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-6'>
                {loading ? (
                    <div className='flex justify-center py-10'>
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className='text-center py-10 text-red-500'>
                        {error}
                    </div>
                ) : (
                    <>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className='bg-white shadow-md rounded-lg p-4'
                            >
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                    {item.name}
                                </h3>
                                <p className='text-gray-600 mb-3'>
                                    {item.deskripsi}
                                </p>
                                <p className='text-gray-600 mb-3'>
                                    Tersedia: {item.jumlah_tersedia}
                                </p>
                                <div className='flex'>
                                    <Button
                                        className='bg-blue-500 text-white hover:bg-blue-600 mr-2'
                                        onClick={() => {
                                            console.log('Lihat detail');
                                        }}
                                    >
                                        Selengkapnya
                                    </Button>
                                    <Button
                                        className='bg-green-500 text-white hover:bg-green-600'
                                        onClick={() => {
                                            handleAddToCart(item);
                                        }}
                                    >
                                        <Link to={getNavigationPath()}>
                                            Masukkan ke Keranjang
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />
        </div>
    );
}

export default KatalogInventarisKonten;
