import React from 'react';

const Modal = ({ children, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='relative bg-white p-6 rounded shadow-md'>
                <button
                    className='absolute top-2 right-2 text-gray-700'
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
