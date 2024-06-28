import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function KatalogBukuKonten({ onAddToCart }) {
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

    const handleDetail = (bukuId) => {
        navigate(`/dosen/detail-buku/${bukuId}`);
    };

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
            const response = await api.get('/api/buku', {
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

    const handleAddToCart = (book) => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('bookCartItems')) || [];

        // Check if the book is already in the cart
        const existingCartItem = storedCartItems.find(
            (item) => item.bukuId === book.bukuId,
        );

        if (existingCartItem) {
            // If the book already exists, calculate new quantity
            const newQuantity = existingCartItem.quantity + 1;

            // Check if new quantity exceeds jumlah_tersedia
            if (newQuantity <= book.jumlah_tersedia) {
                const updatedCartItems = storedCartItems.map((item) =>
                    item.bukuId === book.bukuId
                        ? { ...item, quantity: newQuantity }
                        : item,
                );
                localStorage.setItem(
                    'bookCartItems',
                    JSON.stringify(updatedCartItems),
                );
            }
        } else {
            // If the book doesn't exist, add it with quantity 1
            const newCartItems = [...storedCartItems, { ...book, quantity: 1 }];
            localStorage.setItem('bookCartItems', JSON.stringify(newCartItems));
        }

        // Optionally, you can also trigger a callback or update state to reflect addition
        if (onAddToCart) onAddToCart(book);
    };

    const getNavigationPath = () => {
        if (userRole === 'kalab') return '/dashboard';
        else if (userRole === 'asisten') return '/asisten/dashboard';
        else if (userRole === 'mahasiswa')
            return '/mahasiswa/katalog-buku/cart';
        else if (userRole === 'dosen') return '/dosen/katalog-buku/cart';
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
                        {data.map((book, index) => (
                            <div
                                key={index}
                                className='bg-white shadow-md rounded-lg p-4 flex'
                            >
                                {book.image && (
                                    <img
                                        src={`${BACKEND_URL}/${book.image}`}
                                        alt={book.name}
                                        className='w-36 h-48 mr-4 rounded'
                                        style={{ objectFit: 'cover' }}
                                    />
                                )}
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                        {book.name}
                                    </h3>
                                    <p className='text-gray-600 mb-1'>
                                        {book.pengarang}
                                    </p>
                                    <p className='text-gray-600 mb-1'>
                                        {book.tahun_terbit}
                                    </p>
                                    <p className='text-gray-600 mb-3'>
                                        {book.Kategori.name}
                                    </p>
                                    <div className='flex'>
                                        <Button
                                            className='bg-blue-500 text-white hover:bg-blue-600 mr-2'
                                            onClick={() =>
                                                handleDetail(book.bukuId)
                                            }
                                        >
                                            Selengkapnya
                                        </Button>
                                        <Button
                                            className='bg-green-500 text-white hover:bg-green-600'
                                            onClick={() =>
                                                handleAddToCart(book)
                                            }
                                        >
                                            <Link to={getNavigationPath()}>
                                                Masukkan ke Keranjang
                                            </Link>
                                        </Button>
                                    </div>
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

export default KatalogBukuKonten;
