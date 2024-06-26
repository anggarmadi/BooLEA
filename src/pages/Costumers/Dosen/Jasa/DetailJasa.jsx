import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';
import SidebarDosen from '../../../../components/SidebarDosen';
import Button from '../../../../components/Button';

const jasaDetail = {
    judul: 'Jasa Desain Grafis',
    deskripsi:
        'Layanan desain grafis yang mencakup pembuatan logo, poster, dan materi promosi lainnya. Kami menyediakan desain kreatif sesuai dengan kebutuhan klien.',
    status: 'Requested',
};

function DetailJasa() {
    const navigate = useNavigate();
    const handleKembaliClick = () => {
        navigate('/dosen/jasa/riwayat');
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Detail Jasa
                        </h1>
                        <Button
                            onClick={handleKembaliClick}
                            className='bg-gray-500 hover:bg-gray-700 text-white p-2 rounded'
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='bg-white p-6 shadow rounded-lg mb-6 relative'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                            {jasaDetail.judul}
                        </h2>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-1'>
                                <strong>Status :</strong>{' '}
                                <span className='text-green-600 font-semibold'>
                                    {jasaDetail.status}
                                </span>
                            </p>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-1'>
                                <strong>Deskripsi :</strong>
                            </p>
                            <p className='text-gray-600'>
                                {jasaDetail.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailJasa;
