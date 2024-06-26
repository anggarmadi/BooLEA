import React from 'react';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import KatalogBukuKonten from '../Konten/KatalogBukuKonten';
import SidebarDosen from '../../../components/SidebarDosen';
import DetailBukuKonten from '../Konten/DetailBukuKonten';
import Button from '../../../components/Button';

function DetailBukuPage() {
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
                            Peminjaman Buku
                        </h1>
                    </div>
                    <DetailBukuKonten />
                </div>
            </div>
        </div>
    );
}

export default DetailBukuPage;
