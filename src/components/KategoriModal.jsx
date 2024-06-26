import React, { useState, useEffect } from 'react';

function KategoriModal({ isOpen, onClose, onConfirm, kategori }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (kategori) {
            setName(kategori.name);
        }
    }, [kategori]);

    const handleConfirm = () => {
        onConfirm(kategori.kategoriId, name);
        setName('');
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Edit Kategori</h3>
                <input
                    type='text'
                    className='border rounded w-full py-2 px-3 mb-4'
                    placeholder='Nama Kategori'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className='flex justify-end'>
                    <button
                        className='bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2'
                        onClick={onClose}
                    >
                        Batal
                    </button>
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded'
                        onClick={handleConfirm}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default KategoriModal;
