import React, { useState, useEffect } from 'react';
import SidebarAsisten from '../../../components/SidebarAsisten';
import Navbar from '../../../components/Navbar';
import KelolaKategoriBukuKonten from './KelolaKategoriBukuKonten';
import SearchInput from '../../../components/SearchInput';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Button, Spinner } from '@material-tailwind/react';
import ModalError from '../../../components/ModalError';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import Modal from '../../../components/Modal';
import TambahKategoriBukuForm from './TambahKategoriBukuForm';

function KelolaKategoriBukuPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKategori, setSelectedKategori] = useState(null);
    const [errorModalMessage, setErrorModalMessage] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const response = await api.get('/api/kategori', {
                params: {
                    page: page - 1,
                    limit: itemsPerPage,
                    search_query: query,
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

    const handleOpenModal = (kategori) => {
        setSelectedKategori(kategori);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedKategori(null);
    };

    const openDeleteModal = (kategori) => {
        setSelectedKategori(kategori);
        setIsDeleteModalOpen(true);
        setErrorModalMessage('');
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedKategori(null);
    };

    const handleDelete = async () => {
        if (selectedKategori) {
            try {
                await api.delete(
                    `/api/kategori/${selectedKategori.kategoriId}/delete`,
                    {
                        headers: {
                            Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                        },
                    },
                );
                fetchData(currentPage, searchQuery);
                setIsDeleteModalOpen(false);
            } catch (error) {
                setIsDeleteModalOpen(false); // Close delete confirmation modal on error
                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data.errors &&
                    error.response.data.errors.length > 0 &&
                    error.response.data.message ===
                        'Kategori tidak dapat dihapus karena masih ada buku terkait'
                ) {
                    setErrorModalMessage(error.response.data.message);
                } else {
                    setErrorModalMessage(
                        error.response?.data?.message ||
                            'Failed to delete kategori',
                    );
                }
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
                            Kelola Kategori
                        </h2>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full bg-white'>
                                <div className='flex items-center justify-between py-2'>
                                    <div className='w-2/5 mr-4'>
                                        <SearchInput
                                            placeholder='Cari kategori'
                                            className='border rounded px-3 py-2'
                                            onSearch={handleSearch}
                                            value={searchQuery}
                                        />
                                    </div>
                                    <Button
                                        className='bg-blue-100 text-blue-700 px-4 py-2 rounded'
                                        onClick={() => handleOpenModal(null)}
                                    >
                                        Tambah
                                    </Button>
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
                                    <KelolaKategoriBukuKonten
                                        data={data}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                        openDeleteModal={openDeleteModal}
                                        openModal={handleOpenModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={isModalOpen} onClose={closeModal}>
                <TambahKategoriBukuForm
                    onClose={closeModal}
                    fetchData={() => fetchData(currentPage, searchQuery)}
                    selectedKategori={selectedKategori}
                />
            </Modal>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                message={`Apakah Anda yakin ingin menghapus item "${selectedKategori?.name}?"`}
            />
            {errorModalMessage && (
                <ModalError
                    message={errorModalMessage}
                    onClose={() => setErrorModalMessage('')}
                />
            )}
        </div>
    );
}

export default KelolaKategoriBukuPage;
