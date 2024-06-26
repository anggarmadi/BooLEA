import React from 'react';

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    header,
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'>
            <div className='bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100'>
                <div className='mb-4'>
                    <div className='text-red-600 text-6xl'>
                        <i className='fas fa-times-circle'></i>
                    </div>
                </div>
                <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                    {header}
                </h2>
                <p className='text-gray-600 mb-6'>{message}</p>
                <div className='flex justify-center space-x-4'>
                    <button
                        onClick={onConfirm}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300'
                    >
                        Oke
                    </button>
                    <button
                        onClick={onClose}
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300'
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
