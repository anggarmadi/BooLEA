import React, { useState, useEffect } from 'react';
import SidebarAsisten from '../../../components/SidebarAsisten';
import Navbar from '../../../components/Navbar';
import KelolaInventarisKonten from './KelolaInventarisKonten';
import { Spinner } from '@material-tailwind/react';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import SearchInput from '../../../components/SearchInput';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';

function KelolaInventarisPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInventaris, setselectedInventaris] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
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
            console.log(response.data);
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

    const handleOpenModal = (inventaris) => {
        setselectedInventaris(inventaris);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setselectedInventaris(null);
    };

    const handleDelete = async () => {
        if (selectedInventaris) {
            try {
                await api.delete(
                    `/api/inventaris/${selectedInventaris.inventarisId}/delete`,
                    {
                        headers: {
                            Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                        },
                    },
                );
                fetchData(currentPage, searchQuery); // Refresh data
                closeModal();
            } catch (error) {
                setError(
                    error.response?.data?.message || 'Failed to delete data',
                );
            }
        }
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAsisten />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h2 className='text-2xl font-bold mb-4'>
                            Data Inventaris
                        </h2>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full bg-white'>
                                <div className='flex items-center justify-between py-2'>
                                    <div className='w-2/5 mr-4'>
                                        <SearchInput
                                            placeholder='Cari inventaris'
                                            className='border rounded px-3 py-2'
                                            onSearch={handleSearch}
                                            value={searchQuery}
                                        />
                                    </div>
                                    {/* <a
                                        href='/kelola-inventaris/tambah'
                                        className='bg-blue-100 text-blue-700 px-4 py-2 rounded'
                                    >
                                        Tambah
                                    </a> */}
                                    <Link
                                        href='/kelola-inventaris/tambah'
                                        className='bg-blue-100 text-blue-700 px-4 py-2 rounded'
                                    >
                                        Tambah
                                    </Link>
                                </div>
                                {loading ? (
                                    <div className='flex justify-center py-10'>
                                        <Spinner />
                                    </div>
                                ) : error ? (
                                    <div className='text-center py-10 text-red-500'>
                                        {error}
                                    </div>
                                ) : (
                                    <KelolaInventarisKonten
                                        data={data}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                        handleOpenModal={handleOpenModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
                message={`Apakah Anda yakin ingin menghapus item "${selectedInventaris?.name}?"`}
                header={'Hapus Inventaris'}
            />
        </div>
    );
}

export default KelolaInventarisPage;
