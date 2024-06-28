import React, { useState } from 'react';
import Pagination from '../../../../components/Pagination';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';

const JasaKonten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    openModal,
    totalItems,
}) => {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        console.log(`Textlength: ${text.length}`);
        return text.length > maxLength
            ? text.slice(0, maxLength) + '...'
            : text;
    };

    const handleDetail = (jasaId) => {
        navigate(`/dosen/jasa/riwayat/${jasaId}`);
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
                            Judul
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Deskripsi
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Status
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((jasa, index) => (
                        <tr key={index}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * itemsPerPage}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {jasa.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {truncateText(jasa.deskripsi, 100)}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {jasa.status}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <div className='flex space-x-2'>
                                    <Button
                                        className='bg-green-500 text-white'
                                        onClick={() =>
                                            handleDetail(jasa.jasaId)
                                        }
                                    >
                                        Detail
                                    </Button>
                                    {jasa.status === 'requested' && (
                                        <Button
                                            className='bg-red-500 text-white'
                                            onClick={() => openModal(jasa)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
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

export default JasaKonten;
