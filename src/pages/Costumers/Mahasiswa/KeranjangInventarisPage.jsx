import React from 'react';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import SidebarDosen from '../../../components/SidebarDosen';
import Button from '../../../components/Button';
import KeranjangInventarisKonten from '../Konten/KeranjangInventarisKonten';
import SidebarMahasiswa from '../../../components/SidebarMahasiswa';

function MahasiswaKeranjangInventarisPage() {
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
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black'>Cart</h1>
                        <Button
                            onClick={handleKembaliClick}
                            className='bg-gray-500 hover:bg-gray-700 text-white p-2 rounded'
                        >
                            Kembali
                        </Button>
                    </div>
                    <KeranjangInventarisKonten />
                </div>
            </div>
        </div>
    );
}

export default MahasiswaKeranjangInventarisPage;
