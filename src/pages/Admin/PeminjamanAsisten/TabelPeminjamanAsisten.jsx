import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';

const TabelPeminjamanAsisten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
    openModal,
}) => {
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/detail-peminjaman-asisten/${id}`);
    };

    return (
        <div className='container mx-auto p-4 bg-white shadow-md rounded-lg'>
            <div className='overflow-x-auto'>
                <div className='min-w-full bg-white'>
                    <table className='min-w-full leading-normal'>
                        <thead>
                            <tr>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    No
                                </th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Peminjam
                                </th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Peminjaman
                                </th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Deskripsi
                                </th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Deskripsi
                                </th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((jasa, index) => (
                                <tr key={index} className='hover:bg-gray-100'>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {index +
                                            1 +
                                            (currentPage - 1) * itemsPerPage}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {jasa.User.name}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {jasa.name}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {jasa.deskripsi}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {jasa.status}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {jasa.status === 'requested' ? (
                                            <>
                                                <div className='flex space-x-2'>
                                                    <button
                                                        className='bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600 transition duration-200'
                                                        onClick={() =>
                                                            openModal(
                                                                jasa,
                                                                'accept',
                                                            )
                                                        }
                                                    >
                                                        Acc
                                                    </button>
                                                    <button
                                                        className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200'
                                                        onClick={() =>
                                                            openModal(
                                                                jasa,
                                                                'reject',
                                                            )
                                                        }
                                                    >
                                                        Decline
                                                    </button>
                                                    <button className='bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600 transition duration-200'>
                                                        Detail
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button className='bg-orange-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600 transition duration-200'>
                                                Detail
                                            </button>
                                        )}
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
        </div>
    );
};

export default TabelPeminjamanAsisten;
