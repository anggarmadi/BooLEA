import React, { useState, useEffect } from 'react';
import SidebarAsisten from '../../../../components/SidebarAsisten';
import Navbar from '../../../../components/Navbar';
import { Spinner } from '@material-tailwind/react';
import api from '../../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import SearchInput from '../../../../components/SearchInput';
import JasaKonten from './JasaKonten';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import SidebarDosen from '../../../../components/SidebarDosen';

function JasaPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const response = await api.get('/api/jasa/pinjam', {
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

    const openModal = (jasa) => {
        setSelectedData(jasa);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    const handleCancel = async () => {
        if (selectedData) {
            try {
                await api.patch(`/api/jasa/${selectedData.jasaId}/cancel`, {
                    headers: {
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    },
                });
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
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h2 className='text-2xl font-bold mb-4'>
                            Riwayat Peminjaman Jasa
                        </h2>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full bg-white'>
                                <div className='flex items-center justify-between py-2'>
                                    <div className='w-2/5 mr-4'>
                                        <SearchInput
                                            placeholder='Cari jasa'
                                            className='border rounded px-3 py-2'
                                            onSearch={handleSearch}
                                            value={searchQuery}
                                        />
                                    </div>
                                    <a
                                        href='/dosen/jasa/pinjam'
                                        className='bg-blue-100 text-blue-700 px-4 py-2 rounded'
                                    >
                                        Tambah
                                    </a>
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
                                    <JasaKonten
                                        data={data}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                        openModal={openModal}
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
                onConfirm={handleCancel}
                message={`Apakah Anda yakin ingin membatalkan peminjaman "${selectedData?.name}?"`}
                header={'Batalkan Peminjaman Jasa'}
            />
        </div>
    );
}

export default JasaPage;
