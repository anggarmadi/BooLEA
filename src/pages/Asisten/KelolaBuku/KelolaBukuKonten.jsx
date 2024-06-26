import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';

const KelolaBukuKonten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openModal,
    itemsPerPage,
    totalItems,
}) => {
    const navigate = useNavigate();

    const handleEdit = (bukuId) => {
        navigate(`/kelola-buku/${bukuId}/edit`);
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
                            ID Buku
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Kategori Buku
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Judul Buku
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Jumlah Buku
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
                    {data.map((buku, index) => (
                        <tr key={index}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * itemsPerPage}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {buku.bukuId}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {buku.Kategori?.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {buku.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {buku.jumlah}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {buku.jumlah_tersedia}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <div className='flex space-x-2'>
                                    <Button
                                        className='bg-green-500 text-white'
                                        onClick={() => handleEdit(buku.bukuId)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='bg-red-500 text-white'
                                        onClick={() => openModal(buku)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
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
        </div>
    );
};

export default KelolaBukuKonten;
