import React, { useState } from 'react';
import SidebarAdmin from '../../../components/SidebarAdmin';
import Navbar from '../../../components/Navbar';

function EditDataAsistenPage() {
    const [nama, setNama] = useState('');
    const [nomor, setNomor] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nama, nomor, email });
    };

    const handleBack = () => {
        // Logic
        console.log('Back button clicked');
    };
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-end mb-4'>
                        <button
                            onClick={handleBack}
                            className='px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring'
                        >
                            Kembali
                        </button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Tambah Data Asisten
                        </h1>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label
                                    htmlFor='nama'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Nama Lengkap Asisten
                                </label>
                                <input
                                    type='text'
                                    id='nama'
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='nomor'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Nomor Asisten
                                </label>
                                <input
                                    type='text'
                                    id='nomor'
                                    value={nomor}
                                    onChange={(e) => setNomor(e.target.value)}
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                                />
                            </div>
                            <div className='flex space-x-4 justify-center'>
                                <button
                                    type='submit'
                                    className='bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 focus:outline-none focus:ring'
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditDataAsistenPage;
