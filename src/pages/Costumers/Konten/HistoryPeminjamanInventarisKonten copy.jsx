import React from 'react';
import Pagination from '../../../components/Pagination';
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

const HistoryPeminjamanInventarisKonten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openModal,
    itemsPerPage,
    totalItems,
}) => {
    const renderActionButtons = (peminjaman) => {
        switch (peminjaman.status) {
            case 'booked':
                return (
                    <div className='flex space-x-2'>
                        <EyeIcon className='h-5 w-5 text-blue-500 cursor-pointer' />
                        <XMarkIcon
                            className='h-5 w-5 text-red-500 cursor-pointer'
                            onClick={() => openModal(peminjaman, 'cancel')}
                        />
                    </div>
                );
            case 'canceled':
            case 'rejected':
            case 'accepted':
            case 'done':
                return (
                    <div className='flex space-x-2'>
                        <EyeIcon className='h-5 w-5 text-blue-500 cursor-pointer' />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col bg-white p-6 rounded shadow-md'>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr className='w-full md:table-row'>
                            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                No
                            </th>
                            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                Tanggal Pinjam
                            </th>
                            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                Batas Pengembalian
                            </th>
                            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                Waktu Pengembalian
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
                        {data.map((peminjaman, index) => (
                            <tr
                                key={peminjaman.peminjamanId}
                                className='md:table-row'
                            >
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    {index +
                                        1 +
                                        (currentPage - 1) * itemsPerPage}
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    {new Date(
                                        peminjaman.tanggal_peminjaman,
                                    ).toLocaleDateString('id-ID')}
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    {new Date(
                                        peminjaman.tanggal_pengembalian,
                                    ).toLocaleDateString('id-ID')}
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    {peminjaman.tanggal_kembali_sebenarnya
                                        ? new Date(
                                              peminjaman.tanggal_kembali_sebenarnya,
                                          ).toLocaleDateString('id-ID')
                                        : '-'}
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <span
                                    // className={`px-2 py-1 ${peminjaman.status === 'Sudah' ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'} rounded-full`}
                                    >
                                        {peminjaman.status}
                                    </span>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    {renderActionButtons(peminjaman)}
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
        </div>
    );
};

export default HistoryPeminjamanInventarisKonten;
