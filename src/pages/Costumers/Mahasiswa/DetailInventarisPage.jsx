import React from 'react';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import SidebarMahasiswa from '../../../components/SidebarMahasiswa';
import Button from '../../../components/Button';
import DetailInventarisKonten from '../Konten/DetailInventarisKonten';

function MahasiswaDetailInventarisPage() {
    const navigate = useNavigate();
    const handleKembaliClick = () => {
        navigate(-1);
    };
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarMahasiswa />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-end mb-4'>
                        <Button
                            onClick={handleKembaliClick}
                            className='bg-gray-500 hover:bg-gray-700  text-white p-2 rounded'
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Peminjaman Inventaris
                        </h1>
                    </div>
                    <DetailInventarisKonten />
                </div>
            </div>
        </div>
    );
}

export default MahasiswaDetailInventarisPage;
