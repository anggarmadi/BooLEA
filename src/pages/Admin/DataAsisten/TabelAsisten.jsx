import React from 'react';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import Pagination from '../../../components/Pagination';

const TabelAsisten = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    openModal,
    itemsPerPage,
    totalItems,
}) => {
    return (
        <>
            <table className='min-w-full leading-normal'>
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            No
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            No. Asisten
                        </th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Nama Asisten
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
                    {data.map((asisten, index) => (
                        <tr key={asisten.userId}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {index + 1 + (currentPage - 1) * 10}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {asisten.nim}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {asisten.name}
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <a
                                    href={`mailto:${asisten.email}`}
                                    className='text-blue-500 hover:underline'
                                >
                                    {asisten.email}
                                </a>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <button
                                    onClick={() => openModal(asisten)}
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
            {/* <DeleteConfirmationModal
                isOpen={false}
                onClose={() => {}}
                onConfirm={confirmDelete}
            /> */}
        </>
    );
};

export default TabelAsisten;
