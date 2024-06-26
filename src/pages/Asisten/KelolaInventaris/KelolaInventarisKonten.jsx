import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import SearchInput from '../../../components/SearchInput';
import Pagination from '../../../components/Pagination';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import EditDataInventarisForm from './EditDataInventarisForm';
import Modal from '../../../components/Modal';

const KelolaInventarisKonten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openTambahModal,
    itemsPerPage,
    totalItems,
    handleOpenModal,
}) => {
    const navigate = useNavigate();

    const handleEdit = (inventarisId) => {
        navigate(`/kelola-inventaris/${inventarisId}/edit`);
    };

    return (
        <div className='flex flex-col bg-white p-6 rounded shadow-md'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            No
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Nama Inventaris
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Jumlah Inventaris
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Jumlah Tersedia
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((inventaris, index) => (
                        <tr key={inventaris.inventarisId}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * itemsPerPage}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {inventaris.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {inventaris.jumlah}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {inventaris.jumlah_tersedia}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <div className='flex space-x-2'>
                                    <Button
                                        className='bg-green-500 text-white'
                                        onClick={() =>
                                            handleEdit(inventaris.inventarisId)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='bg-red-500 text-white'
                                        onClick={() =>
                                            handleOpenModal(inventaris)
                                        }
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {isEditModalVisible && (
                <Modal isVisible={isEditModalVisible} onClose={closeEditModal}>
                    <EditDataInventarisForm
                        onClose={closeEditModal}
                        existingData={selectedItem}
                    />
                </Modal>
            )} */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />
            {/* <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            /> */}
        </div>
    );
};

export default KelolaInventarisKonten;
