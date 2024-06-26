import React from 'react';
import Navbar from '../../../components/Navbar';
import SidebarDosen from '../../../components/SidebarDosen';
import DosenPermintaanJasaKonten from './PermintaanJasaKonten';

function DosenPermintaanJasaPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Dashboard Dosen
                        </h1>
                    </div>
                    <DosenPermintaanJasaKonten />
                </div>
            </div>
        </div>
    );
}

export default DosenPermintaanJasaPage;
