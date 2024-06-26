import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import SidebarDosen from '../../../components/SidebarDosen';
import { Spinner } from '@material-tailwind/react';
import SearchInput from '../../../components/SearchInput';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import HistoryPeminjamanBukuKonten from '../Konten/HistoryPeminjamanBukuKonten';

function MahasiswaHistoryPeminjamanBukuPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const response = await api.get('/api/peminjaman/buku-user', {
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
            setError(error.response?.data?.errors || 'Failed to fetch data');
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

    const openModal = (peminjaman, action) => {
        setSelectedPeminjaman(peminjaman);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (modalAction === 'cancel') {
            await handleCancel();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPeminjaman(null);
    };

    const handleCancel = async () => {
        if (selectedPeminjaman) {
            try {
                await api.patch(
                    `/api/peminjaman/${selectedPeminjaman.peminjamanId}/cancel`,
                    {
                        headers: {
                            Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                        },
                    },
                );
                fetchData(currentPage, searchQuery);
                closeModal();
            } catch (error) {
                setError(
                    error.response?.data?.message || 'Failed to fetch data',
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
                            Data Peminjaman Inventaris
                        </h2>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full bg-white'>
                                <div className='flex items-center justify-between py-2'>
                                    <div className='w-2/5 mr-4'>
                                        <SearchInput
                                            placeholder='Cari Peminjaman'
                                            className='border rounded px-3 py-2'
                                            onSearch={handleSearch}
                                            value={searchQuery}
                                        />
                                    </div>
                                </div>
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
                                <HistoryPeminjamanBukuKonten
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
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                message={`Apakah anda yakin ingin membatalkan peminjaman ini`}
                header={'Batalkan Peminjaman'}
            />
        </div>
    );
}

export default MahasiswaHistoryPeminjamanBukuPage;
