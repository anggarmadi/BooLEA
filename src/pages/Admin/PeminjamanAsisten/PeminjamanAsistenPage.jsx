import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../../../components/SidebarAdmin';
import Navbar from '../../../components/Navbar';
import TabelPeminjamanAsisten from './TabelPeminjamanAsisten';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';
import SearchInput from '../../../components/SearchInput';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';

function AdminPeminjamanAsistenPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJasa, setSelectedJasa] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const response = await api.get('/api/jasa/pinjam-all', {
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
    };

    const openModal = (jasa, action) => {
        setSelectedJasa(jasa);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (modalAction === 'accept') {
            await handleSetuju();
        } else if (modalAction === 'reject') {
            await handleTolak();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJasa(null);
    };

    const handleSetuju = async () => {
        if (selectedJasa) {
            try {
                await api.patch(`/api/jasa/${selectedJasa.jasaId}/accept`, {
                    headers: {
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    },
                });
                fetchData(currentPage, searchQuery);
                closeModal();
            } catch (error) {
                setError(
                    error.response?.data?.message || 'Failed to fetch data',
                );
            }
        }
    };

    const handleTolak = async () => {
        if (selectedJasa) {
            try {
                await api.patch(`/api/jasa/${selectedJasa.jasaId}/reject`, {
                    headers: {
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    },
                });
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
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
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
                            <TabelPeminjamanAsisten
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
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                message={`Apakah Anda yakin ingin ${
                    modalAction === 'accept' ? 'menyetujui' : 'menolak'
                } peminjaman oleh "${selectedJasa?.User?.name}?"`}
                header={'Setujui Peminjaman'}
            />
        </div>
    );
}

export default AdminPeminjamanAsistenPage;
