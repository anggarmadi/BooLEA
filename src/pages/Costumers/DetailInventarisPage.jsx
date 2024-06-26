import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import Button from '../../components/Button';

const inventarisDetail = {
    nama: 'Meja',
    jumlahTersedia: 5,
    deskripsi:
        'Deskripsi mengenai barang inventaris ini. Informasi lebih lanjut tentang barang inventaris, termasuk informasi tambahan seperti spesifikasi atau informasi historis.',
    // Assuming you have an image URL for the barang
    gambar: 'https://example.com/meja.jpg',
};

function DetailInventarisPage() {
    const navigate = useNavigate();
    const handleKembaliClick = () => {
        navigate(-1);
    };
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Detail Barang
                        </h1>
                        <Button
                            onClick={handleKembaliClick}
                            className='bg-gray-500 hover:bg-gray-700  text-white p-2 rounded'
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='bg-white p-6 shadow rounded-lg mb-6 relative'>
                        <div className='flex items-center mb-4'>
                            <img
                                src={inventarisDetail.gambar}
                                alt={inventarisDetail.nama}
                                className='w-24 h-24 object-cover rounded-lg mr-4'
                            />
                            <div>
                                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                                    {inventarisDetail.nama}
                                </h2>
                                <p className='text-gray-600 mb-1'>
                                    <strong>Jumlah Tersedia :</strong>{' '}
                                    {inventarisDetail.jumlahTersedia}
                                </p>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-1'>
                                <strong>Deskripsi :</strong>
                            </p>
                            <p className='text-gray-600'>
                                {inventarisDetail.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailInventarisPage;
