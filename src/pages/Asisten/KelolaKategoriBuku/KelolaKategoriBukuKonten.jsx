import React, { useState } from 'react';
import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';

const KelolaKategoriBukuKonten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openDeleteModal,
    openModal,
    itemsPerPage,
    totalItems,
}) => {
    return (
        <div className='flex flex-col bg-white p-6 rounded shadow-md'>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            No
                        </th>
                        <th className='px-5 py-3 border-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Kategori
                        </th>
                        <th className='px-5 py-3 border-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((kategori, index) => (
                        <tr key={index}>
                            <td className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * 10}
                            </td>
                            <td className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                {kategori.name}
                            </td>
                            <td className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                <div className='flex space-x-2'>
                                    <Button
                                        className='bg-orange-500 text-white'
                                        onClick={() => openModal(kategori)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='bg-red-500 text-white'
                                        onClick={() =>
                                            openDeleteModal(kategori)
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

export default KelolaKategoriBukuKonten;
