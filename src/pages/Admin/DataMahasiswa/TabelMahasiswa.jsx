import React, { useState } from 'react';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';

const TabelMahasiswa = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openModal,
    itemsPerPage,
    totalItems,
}) => {
    // const [selectedItem, setSelectedItem] = useState(null);

    // const handleOpenModal = (item) => {
    //     setSelectedItem(item);
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    // const handleConfirmDelete = () => {
    //     // logic hapus
    //     console.log('Menghapus item:', selectedItem);
    //     // logic
    //     setIsModalOpen(false);
    // };

    const confirmDelete = () => {
        console.log('Deleting asisten:', selectedAsisten);
        // logic
        closeModal();
    };

    return (
        <>
            <table className='min-w-full leading-normal'>
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            No
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            NIM
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Nama Mahasiswa
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Email
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((mahasiswa, index) => (
                        <tr key={mahasiswa.userId}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * 10}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {mahasiswa.nim}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {mahasiswa.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <a
                                    href={`mailto:${mahasiswa.email}`}
                                    className='text-blue-500 hover:underline'
                                >
                                    {mahasiswa.email}
                                </a>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <button
                                    onClick={() => openModal(mahasiswa)}
                                    className='bg-red-100 text-red-700 px-4 py-1 rounded'
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />
        </>
    );
};

export default TabelMahasiswa;
